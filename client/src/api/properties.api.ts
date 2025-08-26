import apiClient from "../api/apiClient";
import type {
  Property,
  CreateProperty,
  UpdateProperty,
  PropertiesApiResponse
} from "../types/properties.types";

import ENDPOINTS from "./endpoints";

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  const { data } = await apiClient.get<PropertiesApiResponse>(ENDPOINTS.property);
  return data.data;
};

// Create property
export const createProperty = async (newProperty: CreateProperty): Promise<Property> => {
  const { data } = await apiClient.post<Property>(`${ENDPOINTS.property}/create`, newProperty);
  return data;
};

// Update property
export const updateProperty = async (property: UpdateProperty): Promise<Property> => {
  const { data } = await apiClient.patch<Property>(`${ENDPOINTS.property}/update/${property._id}`, property);
  return data;
};

// Delete property
export const deleteProperty = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.property}/delete/${_id}`);
};
