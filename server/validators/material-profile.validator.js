const { body, param } = require("express-validator");

// Validation middleware for creating a Material Profile
const validateCreateMaterialProfile = [
  body("improvementType")
    .optional()
    .isString()
    .withMessage("Improvement Type must be a string"),

  body("type").optional().isString().withMessage("Type must be a string"),

  body("manufacturer")
    .optional()
    .isString()
    .withMessage("Manufacturer must be a string"),

  body("model").optional().isString().withMessage("Model must be a string"),

  body("modelQualifier")
    .optional()
    .isString()
    .withMessage("Model Qualifier must be a string"),

  body("pcdfId").optional().isString().withMessage("PCDF ID must be a string"),

  body("subType")
    .optional()
    .isString()
    .withMessage("Sub Type must be a string"),

  body("combinationBoiler")
    .optional()
    .isString()
    .withMessage("Combination Boiler must be a string"),

  body("isdefault")
    .optional()
    .isBoolean()
    .withMessage("isdefault must be a boolean"),
];

// Validation middleware for updating a Material Profile
const validateUpdateMaterialProfile = [
  param("id").isMongoId().withMessage("Invalid Material Profile ID"),

  body("improvementType")
    .optional()
    .isString()
    .withMessage("Improvement Type must be a string"),

  body("type").optional().isString().withMessage("Type must be a string"),

  body("manufacturer")
    .optional()
    .isString()
    .withMessage("Manufacturer must be a string"),

  body("model").optional().isString().withMessage("Model must be a string"),

  body("modelQualifier")
    .optional()
    .isString()
    .withMessage("Model Qualifier must be a string"),

  body("pcdfId").optional().isString().withMessage("PCDF ID must be a string"),

  body("subType")
    .optional()
    .isString()
    .withMessage("Sub Type must be a string"),

  body("combinationBoiler")
    .optional()
    .isString()
    .withMessage("Combination Boiler must be a string"),

  body("isdefault")
    .optional()
    .isBoolean()
    .withMessage("isdefault must be a boolean"),
];

module.exports = {
  validateCreateMaterialProfile,
  validateUpdateMaterialProfile,
};
