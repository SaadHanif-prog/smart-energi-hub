import apiClient from "../api/apiClient";
import type {
  Project,
  CreateProject,
  UpdateProject,
  ProjectsApiResponse
} from "../types/projects.types";

import ENDPOINTS from "./endpoints";

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const { data } = await apiClient.get<ProjectsApiResponse>(ENDPOINTS.project);
  return data.data;
};

// Create project
export const createProject = async (newProject: CreateProject): Promise<Project> => {
  const { data } = await apiClient.post<Project>(`${ENDPOINTS.project}/create`, newProject);
  return data;
};

// Update project
export const updateProject = async (project: UpdateProject): Promise<Project> => {
  const { data } = await apiClient.patch<Project>(`${ENDPOINTS.project}/update/${project._id}`, project);
  return data;
};

// Delete project
export const deleteProject = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.project}/delete/${_id}`);
};
