import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Types 
import type { UseQueryResult } from "@tanstack/react-query"; 
import type { Project, CreateProject, UpdateProject, ErrorResponse } from "../types/projects.types";
// Api's
import { getProjects, createProject, updateProject, deleteProject } from "../api/projects.api";

// Fetch all projects
export const useProjects = (): UseQueryResult<Project[], AxiosError<ErrorResponse>> => {
  return useQuery<Project[], AxiosError<ErrorResponse>>({
    queryKey: ["projects"], 
    queryFn: getProjects,
  });
};

// Add new project
export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProject: CreateProject) => createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: UpdateProject) => updateProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteProject(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
