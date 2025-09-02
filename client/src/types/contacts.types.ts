import type { Column } from "../components/common/table";

export type Contact = {
  _id: string;
  reference?: string;
  title?: "Mr" | "Ms" | "Miss" | "Mrs";
  firstname: string;
  surname: string;
  contact: string;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContact = Omit<Contact, "_id" | "createdAt" | "updatedAt">;

export type UpdateContact = Partial<
  Omit<Contact, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
};

export type DeleteContact = {
  _id: string;
};

export type ContactsApiResponse = {
  success: boolean;
  message: string;
  data: Contact[];
};

export type ErrorResponse = { message: string };


// Fields to display in the table 

export const columns : Column<Contact>[] = [
  { key: "reference", title: "Reference" },
  { key: "title", title: "Title" },
  { key: "firstname", title: "First Name" },
  { key: "surname", title: "Last Name" },
  { key: "contact", title: "Phone" },
  { key: "email", title: "Email" },
];

