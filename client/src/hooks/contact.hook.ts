import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Types 
import type { UseQueryResult } from "@tanstack/react-query"; 
import type { Contact, CreateContact, UpdateContact, ErrorResponse } from "../types/contacts.types";
// Api's
import { getContacts, createContact, updateContact,deleteContact} from "../api/contacts.api";

// Fetch all contacts
export const useContacts = (): UseQueryResult<Contact[], AxiosError<ErrorResponse>> => {
  return useQuery<Contact[], AxiosError<ErrorResponse>>({
    queryKey: ["contacts"], 
    queryFn: getContacts,
  });
};

// Add new contact
export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newContact: CreateContact) => createContact(newContact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Update contact
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: UpdateContact) => updateContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

// Delete contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => deleteContact(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
