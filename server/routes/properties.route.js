const express = require("express");
const router = express.Router();

// Controllers
const {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/properties.controller");

// Validators
const {
  validateCreateProperty,
  validateUpdateProperty,
} = require("../validators/properties.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllProperties);
router.post(
  "/create",
  validateCreateProperty,
  handleValidationErrors,
  createProperty
);
router.patch(
  "/update/:id",
  validateUpdateProperty,
  handleValidationErrors,
  updateProperty
);
router.delete("/delete/:id", deleteProperty);

module.exports = router;
