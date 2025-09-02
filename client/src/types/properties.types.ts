export type Property = {
  _id: string;
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
  propertyImage?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type CreateProperty = Omit<Property, "_id" | "createdAt" | "updatedAt"> & {propertyImage?: File| null | string | undefined};

export type UpdateProperty = Partial<
  Omit<Property, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
  propertyImage?: File | null | undefined | string;
};

export type DeleteProperty = {
  _id: string;
};

export type PropertiesApiResponse = {
  success: boolean;
  message: string;
  data: Property[];
};

export type ErrorResponse = { message: string };


// Modal Types

export type AddPropertyFieldType = {
  name: keyof CreateProperty;
  placeholder?: string;
  required?: string | false;
  type: "text" | "number" | "checkbox";
  label?: string;
};

export type UpdatePropertyFieldType = {
  name: keyof UpdateProperty; 
  placeholder?: string;
  required?: string | false;
  type: "text" | "number" | "checkbox";
  label?: string; 
};

export type AddPropertyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProperty, resetFields: () => void) => void;
  isLoading: boolean;
};

export type UpdatePropertyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateProperty) => void;
  isLoading: boolean;
  initialData?: UpdateProperty;
};


// Property Design Pattern

export type LineData = {
  points: number[]; 
  color: string;
  width: number;
  tool: "pen" | "eraser";
};

export type PropertyDesignPattern = {
  _id: string;
  propertyId: string; 
  lines: LineData[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePropertyDesignPattern = {
  propertyId: string; 
  lines: LineData[];
};

export type PropertyDesignApiResponse = {
  success: boolean;
  message: string;
  data: PropertyDesignPattern[];
};

export type FloorPlanEditorProps = {
  imageUrl: string;
  propertyIdForDesign : string;
  setIsFloorPlanEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
}
