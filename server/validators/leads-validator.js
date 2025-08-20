const { body, param } = require("express-validator");

// Validation middleware for creating a lead
const validateCreateLead = [
  body("reference")
    .optional()
    .isString()
    .withMessage("Reference must be a string"),

  body("industry")
    .notEmpty()
    .withMessage("Industry is required")
    .isString()
    .withMessage("Industry must be a string"),

  body("source")
    .notEmpty()
    .withMessage("Source is required")
    .isString()
    .withMessage("Source must be a string"),

  body("property")
    .optional()
    .isMongoId()
    .withMessage("Property must be a valid Mongo ID"),

  body("contact")
    .optional()
    .isMongoId()
    .withMessage("Contact must be a valid Mongo ID"),
];

// Validation middleware for updating a lead
const validateUpdateLead = [
  param("id").isMongoId().withMessage("Invalid lead ID"),

  body("reference")
    .optional()
    .isString()
    .withMessage("Reference must be a string"),

  body("industry")
    .optional()
    .isString()
    .withMessage("Industry must be a string"),

  body("source").optional().isString().withMessage("Source must be a string"),

  body("property")
    .optional()
    .isMongoId()
    .withMessage("Property must be a valid Mongo ID"),

  body("contact")
    .optional()
    .isMongoId()
    .withMessage("Contact must be a valid Mongo ID"),
];

module.exports = {
  validateCreateLead,
  validateUpdateLead,
};
