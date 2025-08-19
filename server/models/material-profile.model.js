const mongoose = require("mongoose");
const materialProfileSchema = new mongoose.Schema(
  {
    improvementType: {
      type: String,
    },
    type: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    modelQualifier: {
      type: String,
    },
    pcdfId: {
      type: String,
    },
    subType: {
      type: String,
    },
    combinationBoiler: {
      type: String,
    },
    isdefault: {
      type: Boolean,
    },
    manufacturerInformation: {
      type: String,
    },
  },
  { timestamps: true }
);

const MaterialProfileModel = mongoose.model(
  "MaterialProfile",
  materialProfileSchema
);
module.exports = MaterialProfileModel;
