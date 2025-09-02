const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
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
    propertyImage: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);


const PropertyModel = mongoose.model("Property", PropertySchema);


const PropertyDesignPatternSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    lines: [
      {
        points: {
          type: [Number],
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        tool: {
          type: String,
          enum: ["pen", "eraser"],
          required: true,
        },
        _id: false, 
      },
    ],
  },
  { timestamps: true } 
);


const PropertyDesignPatternModel = mongoose.model("PropertyDesignPattern", PropertyDesignPatternSchema);


module.exports = {PropertyModel, PropertyDesignPatternModel};
