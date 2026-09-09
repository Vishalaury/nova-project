const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    });

    const projectIds = projects.map(
      (project) => project._id
    );

    const tasks = await Task.find({
      project: { $in: projectIds }
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "done"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in_progress"
    ).length;

    const todoTasks = tasks.filter(
      (task) => task.status === "todo"
    ).length;

    const progress =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    res.json({
      success: true,
      data: {
        totalProjects: projects.length,
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        progress
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};