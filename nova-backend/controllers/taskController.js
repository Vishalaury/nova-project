const Task = require("../models/Task");
const Project = require("../models/Project");

// Create task
const createTask = async (req, res, next) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    const isMember = project.members.some(
      (member) =>
        member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project."
      });
    }

    const {
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate
    } = req.body;

    if (
      assignedTo &&
      !project.members.some(
        (member) =>
          member.toString() === assignedTo.toString()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Task can only be assigned to project members."
      });
    }

    const task = await Task.create({
      title,
      description,
      project: project._id,
      assignedTo: assignedTo || null,
      status,
      priority,
      dueDate,
      createdBy: req.user._id
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: populatedTask
    });
  } catch (error) {
    next(error);
  }
};

// Get project tasks
const getProjectTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found."
      });
    }

    const isMember = project.members.some(
      (member) =>
        member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project."
      });
    }

    const filter = {
      project: project._id
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.assignedTo) {
      filter.assignedTo = req.query.assignedTo;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    const project = await Project.findById(task.project._id);

    const isMember = project.members.some(
      (member) =>
        member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    const project = await Project.findById(task.project);

    const isMember = project.members.some(
      (member) =>
        member.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    const {
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate
    } = req.body;

    if (
      assignedTo &&
      !project.members.some(
        (member) =>
          member.toString() === assignedTo.toString()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Task can only be assigned to project members."
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.assignedTo = assignedTo ?? task.assignedTo;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    res.json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found."
      });
    }

    const project = await Project.findById(task.project);

    const isOwner =
      project.owner.toString() === req.user._id.toString();

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    if (!isOwner && !isCreator) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this task."
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask
};