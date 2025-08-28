import apiClient from "../api/apiClient";
import type {
  Lead,
  CreateLead,
  UpdateLead,
  LeadsApiResponse,
  LeadWithRelations
} from "../types/leads.types";

import ENDPOINTS from "./endpoints";

// Get all leads
export const getLeads = async (): Promise<LeadWithRelations[]> => {
  const { data } = await apiClient.get<LeadsApiResponse>(ENDPOINTS.lead);
  return data.data;
};
// Create lead
export const createLead = async (newLead: CreateLead): Promise<Lead> => {
  const { data } = await apiClient.post<Lead>(`${ENDPOINTS.lead}/create`, newLead);
  return data;
};

// Update lead
export const updateLead = async (lead: UpdateLead): Promise<Lead> => {
  const { data } = await apiClient.patch<Lead>(`${ENDPOINTS.lead}/update/${lead._id}`, lead);
  return data;
};

// Delete lead
export const deleteLead = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.lead}/delete/${_id}`);
};
