const asyncHandler = require("../utils/async-handler");
const PropertiesModel = require("../models/properties.model");

// Create Property
const createProperty = asyncHandler(async (req, res) => {
  const propertyData = req.body;

  const newProperty = await PropertiesModel.create(propertyData);

  return res.status(201).json({
    success: true,
    message: "Property created successfully.",
    data: newProperty,
  });
});

// Get All Properties
const getAllProperties = asyncHandler(async (_, res) => {
  const properties = await PropertiesModel.find();

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

  const updatedProperty = await PropertiesModel.findByIdAndUpdate(
    propertyID,
    propertyData,
    { new: true, runValidators: true }
  );

  if (!updatedProperty) {
    const error = new Error("Property not found.");
    error.status = 404;
    throw error;
  }

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

  const deletedProperty = await PropertiesModel.findByIdAndDelete(propertyID);
  if (!deletedProperty) {
    const error = new Error("Property with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Property deleted successfully.",
    data: deletedProperty,
  });
});

module.exports = {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
};
