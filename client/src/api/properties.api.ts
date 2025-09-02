import apiClient from "../api/apiClient";
import type { Property, CreateProperty, UpdateProperty, PropertiesApiResponse, PropertyDesignPattern, CreatePropertyDesignPattern,
  PropertyDesignApiResponse } from "../types/properties.types";
import ENDPOINTS from "./endpoints";


// Helper to prepare FormData for multipart/form-data requests
const prepareFormData = (data: CreateProperty | UpdateProperty) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if ((value as any) instanceof File) {
      formData.append(key, value as File);
      return;
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
      return;
    }

    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  const { data } = await apiClient.get<PropertiesApiResponse>(ENDPOINTS.property);
  return data.data;
};

// Create property
export const createProperty = async (newProperty: CreateProperty): Promise<Property> => {
  const formData = prepareFormData(newProperty);
  const { data } = await apiClient.post<Property>(
    `${ENDPOINTS.property}/create`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

// Update property
export const updateProperty = async (property: UpdateProperty): Promise<Property> => {
  const formData = prepareFormData(property);
  const { data } = await apiClient.patch<Property>(
    `${ENDPOINTS.property}/update/${property._id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

// Delete property
export const deleteProperty = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.property}/delete/${_id}`);
};


// Create property design pattern
export const createPropertyDesignPattern = async (newPropertyDesign: CreatePropertyDesignPattern): Promise<PropertyDesignPattern> => {
  const { data } = await apiClient.post<PropertyDesignPattern>(
    `${ENDPOINTS.property}/create/property-design`, newPropertyDesign);
  return data;
};

// Get all property designs
export const getPropertyDesigns = async (): Promise<PropertyDesignPattern[]> => {
  const { data } = await apiClient.get<PropertyDesignApiResponse>(ENDPOINTS.property);
  return data.data;
};

