const { body, param } = require("express-validator");

// Validation middleware for creating a project
const validateCreateProject = [
  body("name")
    .notEmpty()
    .withMessage("Project name is required")
    .isString()
    .withMessage("Project name must be a string"),

  body("organisation")
    .optional()
    .isString()
    .withMessage("Organisation must be a string"),

  body("reference")
    .notEmpty()
    .withMessage("Reference is required")
    .isString()
    .withMessage("Reference must be a string"),
];

// Validation middleware for updating a project
const validateUpdateProject = [
  param("id").isMongoId().withMessage("Invalid project ID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Project name must be a string"),

  body("organisation")
    .optional()
    .isString()
    .withMessage("Organisation must be a string"),

  body("reference")
    .optional()
    .isString()
    .withMessage("Reference must be a string"),
];

module.exports = {
  validateCreateProject,
  validateUpdateProject,
};
