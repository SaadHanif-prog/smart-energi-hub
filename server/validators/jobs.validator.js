const { body, param } = require("express-validator");

// Validation middleware for creating a job
const validateCreateJob = [
  body("lead")
    .optional()
    .isMongoId()
    .withMessage("Lead must be a valid Mongo ID"),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isString()
    .withMessage("Job type must be a string"),

  body("jobSubType")
    .notEmpty()
    .withMessage("Job subtype is required")
    .isString()
    .withMessage("Job subtype must be a string"),
];

// Validation middleware for updating a job
const validateUpdateJob = [
  param("id").isMongoId().withMessage("Invalid job ID"),

  body("lead")
    .optional()
    .isMongoId()
    .withMessage("Lead must be a valid Mongo ID"),

  body("jobType")
    .optional()
    .isString()
    .withMessage("Job type must be a string"),

  body("jobSubType")
    .optional()
    .isString()
    .withMessage("Job subtype must be a string"),
];

module.exports = {
  validateCreateJob,
  validateUpdateJob,
};
