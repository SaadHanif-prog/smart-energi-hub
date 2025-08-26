const express = require("express");
const router = express.Router();

// Controllers
const {createSubContractor, getAllSubContractors, updateSubContractor, deleteSubContractor} = require("../controllers/sub-contractor.controller");

// Validators
const {validateCreateSubContractor, validateUpdateSubContractor} = require("../validators/sub-contractor.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllSubContractors);
router.post("/create", validateCreateSubContractor, handleValidationErrors, createSubContractor);
router.patch("/update/:id", validateUpdateSubContractor, handleValidationErrors, updateSubContractor);
router.delete("/delete/:id", deleteSubContractor);

module.exports = router;
