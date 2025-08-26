const express = require("express");
const router = express.Router();

// Controllers
const {createJob,getAllJobs,updateJob,deleteJob} = require("../controllers/jobs.controller");

// Validators
const {validateCreateJob, validateUpdateJob} = require("../validators/jobs.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllJobs);
router.post("/create", validateCreateJob, handleValidationErrors, createJob);
router.patch( "/update/:id", validateUpdateJob, handleValidationErrors, updateJob);
router.delete("/delete/:id", deleteJob);

module.exports = router;
