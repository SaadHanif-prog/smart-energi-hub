// types/leads.types.ts
import type { Property } from "./properties.types";
import type { Contact } from "./contacts.types";

export type Lead = {
  _id: string;
  reference?: string;
  industry: string;
  source: string;
  property?: string; 
  contact?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateLead = Omit<Lead, "_id" | "createdAt" | "updatedAt">;

export type UpdateLead = Partial<Omit<Lead, "_id" | "createdAt" | "updatedAt">> & {
  _id: string;
};

export type DeleteLead = { _id: string };

export type ErrorResponse = { message: string };

export type LeadWithRelations = Omit<Lead, "property" | "contact"> & {
  property?: Property;
  contact?: Contact;
};

export type LeadsApiResponse = {
  success: boolean;
  message: string;
  data: LeadWithRelations[];
};

export type FlattenedLead = {
  _id: string;
  reference: string;
  industry: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  // property fields
  property: string;
  addressLine1?: string;
  town?: string;
  country?: string;
  // contact fields
  contact: string;
  firstname?: string;
  surname?: string;
  email?: string;
  contactPhone?: string;
};
