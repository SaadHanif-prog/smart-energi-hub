const asyncHandler = require("../utils/async-handler");
const ProjectsModel = require("../models/projects.model");

// Create Project
const createProject = asyncHandler(async (req, res) => {
  const { name, organisation, reference } = req.body;

  const newProject = await ProjectsModel.create({
    name,
    organisation,
    reference,
  });

  return res.status(201).json({
    success: true,
    message: "Project created successfully.",
    data: newProject,
  });
});

// Get All Projects
const getAllProjects = asyncHandler(async (_, res) => {
  const projects = await ProjectsModel.find();

  return res.status(200).json({
    success: true,
    message: "Projects fetched successfully.",
    data: projects,
  });
});

// Update Project
const updateProject = asyncHandler(async (req, res) => {
  const projectID = req.params.id;

  if (!projectID) {
    const error = new Error("Please provide project id.");
    error.status = 404;
    throw error;
  }

  const { name, organisation, reference } = req.body;

  const updatedProject = await ProjectsModel.findByIdAndUpdate(
    projectID,
    { name, organisation, reference },
    { new: true, runValidators: true }
  );

  if (!updatedProject) {
    const error = new Error("Project not found.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Project updated successfully.",
    data: updatedProject,
  });
});

// Delete Project
const deleteProject = asyncHandler(async (req, res) => {
  const projectID = req.params.id;

  if (!projectID) {
    const error = new Error("Please provide project id.");
    error.status = 404;
    throw error;
  }

  const deletedProject = await ProjectsModel.findByIdAndDelete(projectID);
  if (!deletedProject) {
    const error = new Error("Project with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully.",
    data: deletedProject,
  });
});

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
