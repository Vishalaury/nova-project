const express = require("express");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getProjects)
  .post(createProject);

router.route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

router.post("/:id/members", addMember);

router.delete(
  "/:id/members/:userId",
  removeMember
);

module.exports = router;