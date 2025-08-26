const express = require("express");
const router = express.Router();

// Controllers
const {createContact, getAllContacts, updateContact, deleteContact} = require("../controllers/contacts.controller");

// Validators
const {validateCreateContact, validateUpdateContact} = require("../validators/contacts.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllContacts);
router.post("/create", validateCreateContact, handleValidationErrors,createContact);
router.patch("/update/:id", validateUpdateContact, handleValidationErrors, updateContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;
