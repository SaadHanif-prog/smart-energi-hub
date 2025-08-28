import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Types 
import type { UseQueryResult } from "@tanstack/react-query"; 
import type { CreateLead, UpdateLead, ErrorResponse, LeadWithRelations } from "../types/leads.types";
// Api's
import { getLeads, createLead, updateLead, deleteLead } from "../api/leads.api";

// Fetch all leads
export const useLeads = (): UseQueryResult<LeadWithRelations[], AxiosError<ErrorResponse>> => {
  return useQuery<LeadWithRelations[], AxiosError<ErrorResponse>>({
    queryKey: ["leads"],
    queryFn: getLeads,
  });
};

// Add new lead
export const useAddLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newLead: CreateLead) => createLead(newLead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update lead
export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lead: UpdateLead) => updateLead(lead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete lead
export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteLead(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
