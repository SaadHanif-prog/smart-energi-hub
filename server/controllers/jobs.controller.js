const asyncHandler = require("../utils/async-handler");
const JobModel = require("../models/jobs.model");

// Create Job
const createJob = asyncHandler(async (req, res) => {
  const { lead, jobType, jobSubType } = req.body;

  const newJob = await JobModel.create({
    lead,
    jobType,
    jobSubType,
  });

  return res.status(201).json({
    success: true,
    message: "Job created successfully.",
    data: newJob,
  });
});

// Get All Jobs (populate lead)
const getAllJobs = asyncHandler(async (_, res) => {
  const jobs = await JobModel.find().populate({
    path: "lead",
    populate: [{ path: "property" }, { path: "contact" }],
  });

  return res.status(200).json({
    success: true,
    message: "Jobs fetched successfully.",
    data: jobs,
  });
});

// Update Job
const updateJob = asyncHandler(async (req, res) => {
  const jobID = req.params.id;

  if (!jobID) {
    const error = new Error("Please provide job id.");
    error.status = 404;
    throw error;
  }

  const { lead, jobType, jobSubType } = req.body;

  const updatedJob = await JobModel.findByIdAndUpdate(
    jobID,
    { lead, jobType, jobSubType },
    { new: true, runValidators: true }
  ).populate("lead");

  if (!updatedJob) {
    const error = new Error("Job not found.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Job updated successfully.",
    data: updatedJob,
  });
});

// Delete Job
const deleteJob = asyncHandler(async (req, res) => {
  const jobID = req.params.id;

  if (!jobID) {
    const error = new Error("Please provide job id.");
    error.status = 404;
    throw error;
  }

  const deletedJob = await JobModel.findByIdAndDelete(jobID);
  if (!deletedJob) {
    const error = new Error("Job with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Job deleted successfully.",
    data: deletedJob,
  });
});

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};
