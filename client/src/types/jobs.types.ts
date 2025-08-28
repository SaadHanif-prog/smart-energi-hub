// Types
import type { Lead } from "./leads.types";
import type { Property } from "./properties.types"
import type { Contact } from "./contacts.types"

export type Job = {
  _id: string;
  lead?: string;
  jobType: string;
  jobSubType: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJob = Omit<Job, "_id" | "createdAt" | "updatedAt">;

export type UpdateJob = Partial<Omit<Job, "_id" | "createdAt" | "updatedAt">> & {
  _id: string;
};

export type DeleteJob = {
  _id: string;
};

export type JobsApiResponse = {
  success: boolean;
  message: string;
  data: JobWithRelations[];
};

export type ErrorResponse = { message: string };

export type JobWithRelations = Omit<Job, "lead"> & {
    lead?: Lead & {
    property?: Property;
    contact?: Contact;
  };
};

export type FlattenedJob = {
  _id: string;
  jobType: string;
  jobSubType: string;
  createdAt: string;
  updatedAt: string;

  // Lead fields
  lead: string;
  leadReference?: string;
  leadIndustry?: string;
  leadSource?: string;

  // Property fields
  property: string;
  addressLine1?: string;
  postcode?: string;
  town?: string;
  country?: string;
  administrativeArea?: string;
  buildingName?: string;
  buildingNumber?: string;
  county?: string;

  // Contact fields
  contact: string;
  contactReference?: string;
  title?: string;
  firstname?: string;
  surname?: string;
  email?: string;
  contactPhone?: string;
};

