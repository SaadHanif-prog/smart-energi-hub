import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

// Types
import type { UseQueryResult } from "@tanstack/react-query";
import type {Property, CreateProperty, UpdateProperty, ErrorResponse, CreatePropertyDesignPattern, PropertyDesignPattern} from "../types/properties.types";

// APIs
import { getProperties, createProperty, updateProperty, deleteProperty, createPropertyDesignPattern, getPropertyDesigns} from "../api/properties.api";

// Fetch all properties
export const useProperties = (): UseQueryResult<Property[], AxiosError<ErrorResponse>> => {
  return useQuery<Property[], AxiosError<ErrorResponse>>({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
};

// Add new property
export const useAddProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProperty: CreateProperty) => createProperty(newProperty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (property: UpdateProperty) => updateProperty(property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteProperty(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};


// Add New Property Design
export const useAddPropertyDesignPattern = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPropertyDesign: CreatePropertyDesignPattern) => createPropertyDesignPattern(newPropertyDesign),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyDesign"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};


// Fetch all property design pattern
export const usePropertiesDesignPattern = (): UseQueryResult<PropertyDesignPattern[], AxiosError<ErrorResponse>> => {
  return useQuery<PropertyDesignPattern[], AxiosError<ErrorResponse>>({
    queryKey: ["propertyDesign"],
    queryFn: getPropertyDesigns,
  });
};
