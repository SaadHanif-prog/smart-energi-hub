import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

// Types
import type { UseQueryResult } from "@tanstack/react-query";
import type {SubContractor, CreateSubContractor, UpdateSubContractor, ErrorResponse} from "../types/sub-contractor.types";

// APIs
import {getSubContractors, createSubContractor, updateSubContractor, deleteSubContractor} from "../api/sub-contractor.api";

// Fetch all subcontractors
export const useSubContractors = (): UseQueryResult<SubContractor[], AxiosError<ErrorResponse>> => {
  return useQuery<SubContractor[], AxiosError<ErrorResponse>>({
    queryKey: ["subcontractors"],
    queryFn: getSubContractors,
  });
};

// Add new subcontractor
export const useAddSubContractor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSubContractor: CreateSubContractor) =>
      createSubContractor(newSubContractor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcontractors"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update subcontractor
export const useUpdateSubContractor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subcontractor: UpdateSubContractor) =>
      updateSubContractor(subcontractor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcontractors"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete subcontractor
export const useDeleteSubContractor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteSubContractor(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcontractors"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
