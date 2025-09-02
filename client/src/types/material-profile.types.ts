import type { Column } from "../components/common/table";

export type MaterialProfile = {
  _id: string;
  improvementType?: string;
  type?: string;
  manufacturer?: string;
  model?: string;
  modelQualifier?: string;
  pcdfId?: string;
  subType?: string;
  combinationBoiler?: string;
  isdefault?: boolean;
  manufacturerInformation?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMaterialProfile = Omit<
  MaterialProfile,
  "_id" | "createdAt" | "updatedAt"
> & {
  manufacturerInformation?: File | null | undefined | string;
};

export type UpdateMaterialProfile = Partial<
  Omit<MaterialProfile, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
  manufacturerInformation?: File | null | undefined | string;
};


export type DeleteMaterialProfile = { _id: string };

export type MaterialProfilesApiResponse = {
  success: boolean;
  message: string;
  data: MaterialProfile[];
};

export type ErrorResponse = { message: string };


// Fields to display in the table 

  // Columns definition
export const columns: Column<MaterialProfile>[] = [
    { key: "improvementType", title: "Improvement Type" },
    { key: "type", title: "Type" },
    { key: "manufacturer", title: "Manufacturer" },
    { key: "model", title: "Model" },
    { key: "modelQualifier", title: "Model Qualifier" },
    { key: "pcdfId", title: "PCDF ID" },
    { key: "subType", title: "Sub Type" },
    { key: "combinationBoiler", title: "Combination Boiler" },
    { key: "isdefault", title: "Default" },
  ];
