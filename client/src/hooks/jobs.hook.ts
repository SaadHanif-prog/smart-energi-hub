import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Types 
import type { UseQueryResult } from "@tanstack/react-query"; 
import type { Job, CreateJob, UpdateJob, ErrorResponse } from "../types/jobs.types";
// Api's
import { getJobs, createJob, updateJob, deleteJob } from "../api/jobs.api";

// Fetch all jobs
export const useJobs = (): UseQueryResult<Job[], AxiosError<ErrorResponse>> => {
  return useQuery<Job[], AxiosError<ErrorResponse>>({
    queryKey: ["jobs"], 
    queryFn: getJobs,
  });
};

// Add new job
export const useAddJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newJob: CreateJob) => createJob(newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (job: UpdateJob) => updateJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteJob(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
