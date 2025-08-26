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
  data: Job[];
};

export type ErrorResponse = { message: string };

export type JobWithRelations = Omit<Job, "lead"> & {
  lead?: Lead & {
    property?: Property;
    contact?: Contact;
  };
};
