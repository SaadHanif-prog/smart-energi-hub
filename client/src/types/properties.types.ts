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

  createdAt: Date;
  updatedAt: Date;
};

export type CreateProperty = Omit<Property, "_id" | "createdAt" | "updatedAt">;

export type UpdateProperty = Partial<
  Omit<Property, "_id" | "createdAt" | "updatedAt">
> & {
  _id: string;
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
