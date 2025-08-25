import apiClient from "../api/apiClient";
import type {
  Contact,
  CreateContact,
  UpdateContact,
  ContactsApiResponse
} from "../types/contacts.types";

import ENDPOINTS from "./endpoints";

// Get all contacts
export const getContacts = async (): Promise<Contact[]> => {
  const {data} = await apiClient.get<ContactsApiResponse>(ENDPOINTS.contact);
  return data.data; 
};

// Create contact
export const createContact = async (newContact: CreateContact): Promise<Contact> => {
  const { data } = await apiClient.post<Contact>(`${ENDPOINTS.contact}/create`, newContact);
  return data;
};

// Update contact
export const updateContact = async (contact: UpdateContact): Promise<Contact> => {
  const { data } = await apiClient.patch<Contact>(`${ENDPOINTS.contact}/update/${contact._id}`, contact);
  return data;
};

// Delete contact
export const deleteContact = async (_id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.contact}/delete/${_id}`);
};
