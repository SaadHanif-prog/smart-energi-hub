const { body, param, validationResult } = require("express-validator");

// Validation middleware for creating a contact
const validateCreateContact = [
  body("reference")
    .optional()
    .isString()
    .withMessage("Reference must be a string"),

  body("title")
    .optional()
    .isIn(["Mr", "Ms", "Miss", "Mrs"])
    .withMessage("Title must be one of Mr, Ms, Miss, Mrs"),

  body("firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .isString()
    .withMessage("Firstname must be a string"),

  body("surname")
    .notEmpty()
    .withMessage("Surname is required")
    .isString()
    .withMessage("Surname must be a string"),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isString()
    .withMessage("Contact must be a string"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
];

// Validation middleware for updating a contact
const validateUpdateContact = [
  param("id").isMongoId().withMessage("Invalid contact ID"),

  body("reference")
    .optional()
    .isString()
    .withMessage("Reference must be a string"),

  body("title")
    .optional()
    .isIn(["Mr", "Ms", "Miss", "Mrs"])
    .withMessage("Title must be one of Mr, Ms, Miss, Mrs"),

  body("firstname")
    .optional()
    .isString()
    .withMessage("Firstname must be a string"),

  body("surname").optional().isString().withMessage("Surname must be a string"),

  body("contact").optional().isString().withMessage("Contact must be a string"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
];

module.exports = {
  validateCreateContact,
  validateUpdateContact,
};
