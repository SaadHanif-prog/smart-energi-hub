import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Types
import type { UseQueryResult } from "@tanstack/react-query";
import type {MaterialProfile, CreateMaterialProfile, UpdateMaterialProfile, ErrorResponse} from "../types/material-profile.types";
// APIs
import {getMaterialProfiles, createMaterialProfile, updateMaterialProfile, deleteMaterialProfile} from "../api/material-profile.api";

// Fetch all material profiles
export const useMaterialProfiles = (): UseQueryResult<
  MaterialProfile[],
  AxiosError<ErrorResponse>
> => {
  return useQuery<MaterialProfile[], AxiosError<ErrorResponse>>({
    queryKey: ["material-profiles"],
    queryFn: getMaterialProfiles,
  });
};

// Add new material profile
export const useAddMaterialProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProfile: CreateMaterialProfile) =>
      createMaterialProfile(newProfile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-profiles"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update material profile
export const useUpdateMaterialProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: UpdateMaterialProfile) =>
      updateMaterialProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-profiles"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete material profile
export const useDeleteMaterialProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteMaterialProfile(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-profiles"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
