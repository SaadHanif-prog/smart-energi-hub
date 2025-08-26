export type Project = {
  _id: string;
  reference?: string;
  name: string;
  organisation?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProject = Omit<Project, "_id" | "createdAt" | "updatedAt">;

export type UpdateProject = Partial<
  Omit<Project, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
};

export type DeleteProject = {
  _id: string;
};

export type ProjectsApiResponse = {
  success: boolean;
  message: string;
  data: Project[];
};

export type ErrorResponse = { message: string };
