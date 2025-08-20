const mongoose = require("mongoose");

const subContractorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    town: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    administrativeArea: {
      type: String,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    addressLine3: {
      type: String,
      trim: true,
    },
    buildingName: {
      type: String,
      trim: true,
    },
    buildingNumber: {
      type: String,
      trim: true,
    },
    county: {
      type: String,
      trim: true,
    },
    deliveryPointSuffix: {
      type: String,
      trim: true,
    },
    departmentName: {
      type: String,
      trim: true,
    },
    dependantLocality: {
      type: String,
      trim: true,
    },
    dependantThoroughfare: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    doubleDependantLocality: {
      type: String,
      trim: true,
    },
    eastings: {
      type: Number,
    },
    isRural: {
      type: Boolean,
      default: false,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    northings: {
      type: Number,
    },
    organisationName: {
      type: String,
      trim: true,
    },
    poBox: {
      type: String,
      trim: true,
    },
    postcodeInwards: {
      type: String,
      trim: true,
    },
    postcodeOutwards: {
      type: String,
      trim: true,
    },
    postcodeType: {
      type: String,
      trim: true,
    },
    premise: {
      type: String,
      trim: true,
    },
    suOrganisationIndicator: {
      type: String,
      trim: true,
    },
    subBuilding: {
      type: String,
      trim: true,
    },
    thoroughfare: {
      type: String,
      trim: true,
    },
    traditionalCounty: {
      type: String,
      trim: true,
    },
    udprn: {
      type: String,
      trim: true,
    },
    umprn: {
      type: String,
      trim: true,
    },
    ward: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const SubContractorModel = mongoose.model("Subcontractor", subContractorSchema);
module.exports = SubContractorModel;
