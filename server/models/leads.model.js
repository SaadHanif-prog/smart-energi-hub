const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
    },
    industry: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  },
  { timestamps: true }
);

const LeadModel = mongoose.model("Lead", leadSchema);
module.exports = LeadModel;
