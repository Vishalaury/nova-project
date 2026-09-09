const express = require("express");

const {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post(
  "/projects/:projectId/tasks",
  createTask
);

router.get(
  "/projects/:projectId/tasks",
  getProjectTasks
);

router.get(
  "/tasks/:id",
  getTask
);

router.put(
  "/tasks/:id",
  updateTask
);

router.delete(
  "/tasks/:id",
  deleteTask
);

module.exports = router;