const express = require("express");
const router = express.Router();

// Multer
const multerPdf = require("../middlewares/multer-pdf");

// Controllers
const {
  createMaterialProfile,
  getAllMaterialProfiles,
  updateMaterialProfile,
  deleteMaterialProfile,
} = require("../controllers/material-profile.controller");

// Validators
const {
  validateCreateMaterialProfile,
  validateUpdateMaterialProfile,
} = require("../validators/material-profile.validator");

// Validation error handler
const { handleValidationErrors } = require("../utils/error-handlers");

router.get("/", getAllMaterialProfiles);
router.post(
  "/create",
  validateCreateMaterialProfile,
  multerPdf.single("file"),
  handleValidationErrors,
  createMaterialProfile
);
router.patch(
  "/update/:id",
  validateUpdateMaterialProfile,
  multerPdf.single("file"),
  handleValidationErrors,
  updateMaterialProfile
);
router.delete("/delete/:id", deleteMaterialProfile);

module.exports = router;
