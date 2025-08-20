const express = require("express");
const router = express.Router();

// Controllers
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

// Validators
const {
  validateCreateProject,
  validateUpdateProject,
} = require("../validators/projects.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllProjects);
router.post(
  "/create",
  validateCreateProject,
  handleValidationErrors,
  createProject
);
router.patch(
  "/update/:id",
  validateUpdateProject,
  handleValidationErrors,
  updateProject
);
router.delete("/delete/:id", deleteProject);

module.exports = router;
