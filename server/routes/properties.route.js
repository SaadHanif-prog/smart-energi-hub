const express = require("express");
const router = express.Router();

// Controllers
const {createProperty, getAllProperties, updateProperty, deleteProperty, createPropertyDesignPattern} = require("../controllers/properties.controller");

// Validators
const {validateCreateProperty, validateUpdateProperty} = require("../validators/properties.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

// Multer
const multerImg = require("../middlewares/multer-img")

router.get("/", getAllProperties);
router.post("/create", multerImg.single("file"), validateCreateProperty, handleValidationErrors, createProperty);
router.post("/create/property-design", createPropertyDesignPattern);
router.patch( "/update/:id", multerImg.single("file"), validateUpdateProperty, handleValidationErrors, updateProperty);
router.delete("/delete/:id", deleteProperty);

module.exports = router;
