const express = require("express");
const router = express.Router();

// Controllers
const {createLead,  getAllLeads,  updateLead, deleteLead,} = require("../controllers/leads.controller");

// Validators
const {validateCreateLead, validateUpdateLead} = require("../validators/leads-validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllLeads);
router.post("/create", validateCreateLead, handleValidationErrors, createLead);
router.patch("/update/:id", validateUpdateLead, handleValidationErrors, updateLead);
router.delete("/delete/:id", deleteLead);

module.exports = router;
