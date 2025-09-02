const asyncHandler = require("../utils/async-handler");
const {PropertyDesignPatternModel, PropertyModel} = require("../models/properties.model");
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require("../utils/cloudinary-img");


// Create Property 
const createProperty = asyncHandler(async (req, res) => {
  const propertyData = req.body;
  const imageFile = req.file;
  let uploadToCloudinary = null;

  if (imageFile) {
    uploadToCloudinary = await uploadImageToCloudinary(
      imageFile.buffer,
      imageFile.originalname
    );
  }

  const newProperty = await PropertyModel.create({
    ...propertyData,
    propertyImage: uploadToCloudinary ? uploadToCloudinary.secure_url : null,
    imagePublicId: uploadToCloudinary ? uploadToCloudinary.public_id : null,
  });

  return res.status(201).json({
    success: true,
    message: "Property created successfully.",
    data: newProperty,
  });
});


// Get All Properties 
const getAllProperties = asyncHandler(async (_, res) => {
  const properties = await PropertyModel.find();

  return res.status(200).json({
    success: true,
    message: "Properties fetched successfully.",
    data: properties,
  });
});


// Update Property 
const updateProperty = asyncHandler(async (req, res) => {
  const propertyID = req.params.id;

  if (!propertyID) {
    const error = new Error("Please provide property id.");
    error.status = 404;
    throw error;
  }

  const propertyData = req.body;
  const imageFile = req.file;
  let uploadToCloudinary = null;

  const existingProperty = await PropertyModel.findById(propertyID);
  if (!existingProperty) {
    const error = new Error("Property not found.");
    error.status = 404;
    throw error;
  }

  if (imageFile) {
    uploadToCloudinary = await uploadImageToCloudinary(
      imageFile.buffer,
      imageFile.originalname
    );

    // Delete old image from Cloudinary
    if (existingProperty.imagePublicId) {
      try {
        const cloudinaryResult = await deleteImageFromCloudinary(existingProperty.imagePublicId);
        console.log("Old Cloudinary image deleted:", cloudinaryResult);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }
  }

  const updateData = {
    ...propertyData,
  };

  if (uploadToCloudinary) {
    updateData.propertyImage = uploadToCloudinary.secure_url;
    updateData.imagePublicId = uploadToCloudinary.public_id;
  }

  const updatedProperty = await PropertyModel.findByIdAndUpdate(
    propertyID,
    updateData,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    message: "Property updated successfully.",
    data: updatedProperty,
  });
});


// Delete Property
const deleteProperty = asyncHandler(async (req, res) => {
  const propertyID = req.params.id;

  if (!propertyID) {
    const error = new Error("Please provide property id.");
    error.status = 404;
    throw error;
  }

  const deletedProperty = await PropertyModel.findByIdAndDelete(propertyID);
  if (!deletedProperty) {
    const error = new Error("Property with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  // Delete image from Cloudinary if exists
  if (deletedProperty.imagePublicId) {
    try {
      const cloudinaryResult = await deleteImageFromCloudinary(deletedProperty.imagePublicId);
      console.log("Cloudinary deletion result:", cloudinaryResult);
    } catch (err) {
      console.error("Cloudinary deletion failed:", err);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Property deleted successfully.",
    data: deletedProperty,
  });
});


// Property Design Pattern 

const createPropertyDesignPattern = asyncHandler(async (req, res) => {

  console.log("body in property design", req.body)
  const { propertyId, lines } = req.body;

  if (!propertyId) {
    return res.status(400).json({
      success: false,
      message: "propertyId is required",
    });
  }

  if (!lines || !Array.isArray(lines)) {
    return res.status(400).json({
      success: false,
      message: "lines array is required",
    });
  }

  const newDesignPattern = await PropertyDesignPatternModel.create({
    propertyId,
    lines,
  });

  return res.status(201).json({
    success: true,
    message: "Property design pattern saved successfully.",
    data: newDesignPattern,
  });
});



module.exports = {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  createPropertyDesignPattern
};




