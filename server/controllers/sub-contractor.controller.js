const asyncHandler = require("../utils/async-handler");
const SubContractorModel = require("../models/sub-contractor.model");

// Create SubContractor
const createSubContractor = asyncHandler(async (req, res) => {
  const subContractor = await SubContractorModel.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Sub-contractor created successfully.",
    data: subContractor,
  });
});

// Get All SubContractors
const getAllSubContractors = asyncHandler(async (_, res) => {
  const subContractors = await SubContractorModel.find();

  return res.status(200).json({
    success: true,
    message: "Sub-contractors fetched successfully.",
    data: subContractors,
  });
});

// Update SubContractor
const updateSubContractor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subContractor = await SubContractorModel.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subContractor) {
    return res.status(404).json({
      success: false,
      message: "Sub-contractor not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sub-contractor updated successfully.",
    data: subContractor,
  });
});

// Delete SubContractor
const deleteSubContractor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subContractor = await SubContractorModel.findByIdAndDelete(id);

  if (!subContractor) {
    return res.status(404).json({
      success: false,
      message: "Sub-contractor not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sub-contractor deleted successfully.",
  });
});

module.exports = {
  createSubContractor,
  getAllSubContractors,
  updateSubContractor,
  deleteSubContractor,
};
