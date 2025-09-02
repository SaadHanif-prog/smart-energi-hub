// subcontractor.types.ts

export type SubContractor = {
  _id: string;
  name: string;
  registrationNumber: string;
  addressLine1: string;
  postcode: string;
  town?: string;
  country?: string;
  administrativeArea?: string;
  addressLine2?: string;
  addressLine3?: string;
  buildingName?: string;
  buildingNumber?: string;
  county?: string;
  deliveryPointSuffix?: string;
  departmentName?: string;
  dependantLocality?: string;
  dependantThoroughfare?: string;
  district?: string;
  doubleDependantLocality?: string;
  eastings?: number;
  isRural?: boolean;
  latitude?: number;
  longitude?: number;
  northings?: number;
  organisationName?: string;
  poBox?: string;
  postcodeInwards?: string;
  postcodeOutwards?: string;
  postcodeType?: string;
  premise?: string;
  suOrganisationIndicator?: string;
  subBuilding?: string;
  thoroughfare?: string;
  traditionalCounty?: string;
  udprn?: string;
  umprn?: string;
  ward?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateSubContractor = Omit<
  SubContractor,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateSubContractor = Partial<
  Omit<SubContractor, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
};

export type DeleteSubContractor = {
  _id: string;
};

export type SubContractorsApiResponse = {
  success: boolean;
  message: string;
  data: SubContractor[];
};

export type ErrorResponse = {
  message: string;
};


// Modal Types

export type AddSubContractorFieldType = {
  name: keyof CreateSubContractor;
  placeholder?: string;
  required?: string | false;
  type: "text" | "number" | "checkbox";
  label?: string;
};

export type UpdateSubContractorFieldType = {
  name: keyof UpdateSubContractor; 
  placeholder?: string;
  required?: string | false;
  type: "text" | "number" | "checkbox";
  label?: string; 
};

export type AddSubContractorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubContractor, resetFields: () => void) => void;
  isLoading: boolean;
};

export type UpdateSubContractorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateSubContractor) => void;
  isLoading: boolean;
  initialData?: UpdateSubContractor;
};

