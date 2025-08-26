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

export type UpdateLead = Partial<
  Omit<Lead, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
};

export type DeleteLead = {
  _id: string;
};

export type LeadsApiResponse = {
  success: boolean;
  message: string;
  data: Lead[];
};

export type ErrorResponse = { message: string };
