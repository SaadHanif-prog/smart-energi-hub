// types
import type { Property } from "./properties.types";
import type { Contact } from "./contacts.types";
import type { Column } from "../components/common/table";

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


// Fields to show in the table 

export const columns: Column<FlattenedLead>[] = [
  { key: "reference", title: "Reference" },
  { key: "industry", title: "Industry" },
  { key: "source", title: "Source" },
  { key: "addressLine1", title: "Property Address" },
  { key: "town", title: "Town" },
  { key: "country", title: "Country" },
  { key: "firstname", title: "Contact First Name" },
  { key: "surname", title: "Contact Surname" },
  { key: "email", title: "Contact Email" },
  { key: "contactPhone", title: "Contact Phone" },
];
