// Types
import type { Lead } from "./leads.types";
import type { Property } from "./properties.types"
import type { Contact } from "./contacts.types"
import type { Column } from "../components/common/table";

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


// Fields to display in the columns 

export const columns: Column<FlattenedJob>[] = [
  { key: "jobType", title: "Job Type" },
  { key: "jobSubType", title: "Job SubType" },
  { key: "leadReference", title: "Lead Reference" },
  { key: "leadIndustry", title: "Lead Industry" },
  { key: "leadSource", title: "Lead Source" },
  { key: "addressLine1", title: "Property Address" },
  { key: "postcode", title: "Postcode" },
  { key: "town", title: "Town" },
  { key: "country", title: "Country" },
  { key: "administrativeArea", title: "Administrative Area" },
  { key: "buildingName", title: "Building Name" },
  { key: "buildingNumber", title: "Building Number" },
  { key: "county", title: "County" },
  { key: "contactReference", title: "Contact Reference" },
  { key: "title", title: "Contact Title" },
  { key: "firstname", title: "Contact First Name" },
  { key: "surname", title: "Contact Surname" },
  { key: "email", title: "Contact Email" },
  { key: "contactPhone", title: "Contact Phone" },
];


