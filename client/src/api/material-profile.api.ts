import apiClient from "../api/apiClient";
import type { MaterialProfile, CreateMaterialProfile, UpdateMaterialProfile } from "../types/material-profile.types";
import ENDPOINTS from "./endpoints";

// Helper to prepare FormData for multipart/form-data requests
const prepareFormData = (data: CreateMaterialProfile | UpdateMaterialProfile) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return; 

    // Handle files
    if ((value as any) instanceof File) {
      formData.append(key, value as File);
      return;
    }

    // Handle primitives
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
      return;
    }

    // Handle objects/arrays (serialize as JSON)
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Fallback for any other types
    formData.append(key, String(value));
  });

  return formData;
};


// Get all material profiles
export const getMaterialProfiles = async (): Promise<MaterialProfile[]> => {
  const { data } = await apiClient.get<{ data: MaterialProfile[] }>(
    ENDPOINTS["material-profiles"]
  );
  return data.data;
};

// Create material profile
export const createMaterialProfile = async (
  newProfile: CreateMaterialProfile
): Promise<MaterialProfile> => {
  const formData = prepareFormData(newProfile);
  const { data } = await apiClient.post<MaterialProfile>(
    `${ENDPOINTS["material-profiles"]}/create`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

// Update material profile
export const updateMaterialProfile = async (
  profile: UpdateMaterialProfile
): Promise<MaterialProfile> => {
  const formData = prepareFormData(profile);
  const { data } = await apiClient.patch<MaterialProfile>(
    `${ENDPOINTS["material-profiles"]}/update/${profile._id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

// Delete material profile
export const deleteMaterialProfile = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS["material-profiles"]}/delete/${_id}`);
};
