import apiClient from "../api/apiClient";
import type { SubContractor,CreateSubContractor, UpdateSubContractor, SubContractorsApiResponse} from "../types/sub-contractor.types";

import ENDPOINTS from "./endpoints";

// Get all subcontractors
export const getSubContractors = async (): Promise<SubContractor[]> => {
  const { data } = await apiClient.get<SubContractorsApiResponse>(ENDPOINTS["sub-contractor"]);
  return data.data;
};

// Create subcontractor
export const createSubContractor = async (
  newSubContractor: CreateSubContractor
): Promise<SubContractor> => {
  const { data } = await apiClient.post<SubContractor>(
    `${ENDPOINTS["sub-contractor"]}/create`,
    newSubContractor
  );
  return data;
};

// Update subcontractor
export const updateSubContractor = async (
  subcontractor: UpdateSubContractor
): Promise<SubContractor> => {
  const { data } = await apiClient.patch<SubContractor>(
    `${ENDPOINTS["sub-contractor"]}/update/${subcontractor._id}`,
    subcontractor
  );
  return data;
};

// Delete subcontractor
export const deleteSubContractor = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS["sub-contractor"]}/delete/${_id}`);
};
