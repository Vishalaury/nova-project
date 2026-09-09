const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

// Create project
const createProject = async (req, res, next) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate
    } = req.body;

    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      owner: req.user._id,
      members: [req.user._id]
    });

    const populatedProject = await Project.findById(project._id)
      .populate("owner", "name email role")
      .populate("members", "name email role");

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: populatedProject
    });
  } catch (error) {
    next(error);
  }
};

// Get projects
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    })
      .populate("owner", "name email role")
      .populate("members", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// Get single project
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email role")
      .populate("members", "name email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    const isMember =
      project.members.some(
        (member) => member._id.toString() === req.user._id.toString()
      );

    const isOwner =
      project.owner._id.toString() === req.user._id.toString();

    if (!isMember && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project."
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Update project
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can update the project."
      });
    }

    const {
      name,
      description,
      startDate,
      endDate
    } = req.body;

    project.name = name ?? project.name;
    project.description = description ?? project.description;
    project.startDate = startDate ?? project.startDate;
    project.endDate = endDate ?? project.endDate;

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully.",
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can delete the project."
      });
    }

    await Task.deleteMany({
      project: project._id
    });

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project and its tasks deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

// Add member
const addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can add members."
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User is already a project member."
      });
    }

    project.members.push(userId);

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("owner", "name email role")
      .populate("members", "name email role");

    res.json({
      success: true,
      message: "Member added successfully.",
      data: updatedProject
    });
  } catch (error) {
    next(error);
  }
};

// Remove member
const removeMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can remove members."
      });
    }

    if (
      project.owner.toString() === req.params.userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Project owner cannot be removed."
      });
    }

    project.members = project.members.filter(
      (member) =>
        member.toString() !== req.params.userId
    );

    await project.save();

    res.json({
      success: true,
      message: "Member removed successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
};