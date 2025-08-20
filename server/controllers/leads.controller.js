const asyncHandler = require("../utils/async-handler");
const LeadModel = require("../models/lead.model");

// Create Lead
const createLead = asyncHandler(async (req, res) => {
  const { reference, industry, source, property, contact } = req.body;

  const newLead = await LeadModel.create({
    reference,
    industry,
    source,
    property,
    contact,
  });

  return res.status(201).json({
    success: true,
    message: "Lead created successfully.",
    data: newLead,
  });
});

// Get All Leads
const getAllLeads = asyncHandler(async (_, res) => {
  const leads = await LeadModel.find().populate("property").populate("contact");

  return res.status(200).json({
    success: true,
    message: "Leads fetched successfully.",
    data: leads,
  });
});

// Update Lead
const updateLead = asyncHandler(async (req, res) => {
  const leadID = req.params.id;

  if (!leadID) {
    const error = new Error("Please provide lead id.");
    error.status = 404;
    throw error;
  }

  const { reference, industry, source, property, contact } = req.body;

  const updatedLead = await LeadModel.findByIdAndUpdate(
    leadID,
    { reference, industry, source, property, contact },
    { new: true, runValidators: true }
  )
    .populate("property")
    .populate("contact");

  if (!updatedLead) {
    const error = new Error("Lead not found.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Lead updated successfully.",
    data: updatedLead,
  });
});

// Delete Lead
const deleteLead = asyncHandler(async (req, res) => {
  const leadID = req.params.id;

  if (!leadID) {
    const error = new Error("Please provide lead id.");
    error.status = 404;
    throw error;
  }

  const deletedLead = await LeadModel.findByIdAndDelete(leadID);
  if (!deletedLead) {
    const error = new Error("Lead with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Lead deleted successfully.",
    data: deletedLead,
  });
});

module.exports = {
  createLead,
  getAllLeads,
  updateLead,
  deleteLead,
};
