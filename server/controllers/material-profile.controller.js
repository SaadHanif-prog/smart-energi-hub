const asyncHandler = require("../utils/async-handler");
const MaterialProfileModel = require("../models/material-profile.model");

// Cloudinary Functions
const {
  uploadPDFToCloudinary,
  deletePDFFromCloudinary,
} = require("../utils/cloudinary-pdf");

// Create Material Profile
const createMaterialProfile = asyncHandler(async (req, res) => {
  const {
    improvementType,
    type,
    manufacturer,
    model,
    modelQualifier,
    pcdfId,
    subType,
    combinationBoiler,
    isdefault,
  } = req.body;

  let pdfFile = req.file;

  let uploadToCloudinary = null;

  if (pdfFile) {
    uploadToCloudinary = await uploadPDFToCloudinary(
      pdfFile.buffer,
      pdfFile.originalname
    );
  }

  const newMaterialProfile = await MaterialProfileModel.create({
    improvementType,
    type,
    manufacturer,
    model,
    modelQualifier,
    pcdfId,
    subType,
    combinationBoiler,
    isdefault,
    manufacturerInformation: uploadToCloudinary
      ? uploadToCloudinary.secure_url
      : null,
  });

  return res.status(201).json({
    success: true,
    message: "Material Profile created successfully.",
    data: newMaterialProfile,
  });
});

// Get All Material Profiles
const getAllMaterialProfiles = asyncHandler(async (_, res) => {
  const materialProfiles = await MaterialProfileModel.find();

  return res.status(200).json({
    success: true,
    message: "Material Profiles fetched successfully.",
    data: materialProfiles,
  });
});

// Update Material Profile
const updateMaterialProfile = asyncHandler(async (req, res) => {
  const profileID = req.params.id;

  if (!profileID) {
    const error = new Error("Please provide material profile id.");
    error.status = 404;
    throw error;
  }

  const {
    improvementType,
    type,
    manufacturer,
    model,
    modelQualifier,
    pcdfId,
    subType,
    combinationBoiler,
    isdefault,
  } = req.body;

  const pdfFile = req.file;
  let uploadToCloudinary = null;

  const existingProfile = await MaterialProfileModel.findById(profileID);
  if (!existingProfile) {
    const error = new Error("Material Profile not found.");
    error.status = 404;
    throw error;
  }

  if (pdfFile) {
    uploadToCloudinary = await uploadPDFToCloudinary(
      pdfFile.buffer,
      pdfFile.originalname
    );

    if (existingProfile.manufacturerInformation) {
      try {
        const filename = decodeURIComponent(
          existingProfile.manufacturerInformation
            .split("/upload/")[1]
            .split("/")
            .slice(1)
            .join("/")
        );

        const cloudinaryResult = await deletePDFFromCloudinary(filename);
        console.log("Old Cloudinary file deleted:", cloudinaryResult);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }
  }

  const updateData = {
    improvementType,
    type,
    manufacturer,
    model,
    modelQualifier,
    pcdfId,
    subType,
    combinationBoiler,
    isdefault,
  };

  if (uploadToCloudinary) {
    updateData.manufacturerInformation = uploadToCloudinary.secure_url;
  }

  const updatedProfile = await MaterialProfileModel.findByIdAndUpdate(
    profileID,
    updateData,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    message: "Material Profile updated successfully.",
    data: updatedProfile,
  });
});

// Delete Material Profile
const deleteMaterialProfile = asyncHandler(async (req, res) => {
  const profileID = req.params.id;

  if (!profileID) {
    const error = new Error("Please provide material profile id.");
    error.status = 404;
    throw error;
  }

  const deletedProfile = await MaterialProfileModel.findByIdAndDelete(
    profileID
  );
  if (!deletedProfile) {
    const error = new Error("Material Profile with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  if (deletedProfile.manufacturerInformation) {
    try {
      const filename = decodeURIComponent(
        deletedProfile.manufacturerInformation
          .split("/upload/")[1]
          .split("/")
          .slice(1)
          .join("/")
      );

      const cloudinaryResult = await deletePDFFromCloudinary(filename);
      console.log("Cloudinary deletion result:", cloudinaryResult);
    } catch (err) {
      console.error("Cloudinary deletion failed:", err);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Material Profile deleted successfully.",
    data: deletedProfile,
  });
});

module.exports = {
  createMaterialProfile,
  getAllMaterialProfiles,
  updateMaterialProfile,
  deleteMaterialProfile,
};
