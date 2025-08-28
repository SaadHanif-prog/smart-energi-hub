import apiClient from "../api/apiClient";
import type {Job, CreateJob, UpdateJob, JobsApiResponse, JobWithRelations} from "../types/jobs.types";

import ENDPOINTS from "./endpoints";

// Get all jobs
export const getJobs = async (): Promise<JobWithRelations[]> => {
  const { data } = await apiClient.get<JobsApiResponse>(ENDPOINTS.job);
  return data.data;
};

// Create job
export const createJob = async (newJob: CreateJob): Promise<Job> => {
  const { data } = await apiClient.post<Job>(`${ENDPOINTS.job}/create`, newJob);
  return data;
};

// Update job
export const updateJob = async (job: UpdateJob): Promise<Job> => {
  const { data } = await apiClient.patch<Job>(
    `${ENDPOINTS.job}/update/${job._id}`,
    job
  );
  return data;
};

// Delete job
export const deleteJob = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.job}/delete/${_id}`);
};
