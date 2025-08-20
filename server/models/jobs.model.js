const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    jobType: {
      type: String,
      required: true,
    },
    jobSubType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LeadModel = mongoose.model("Job", jobSchema);
module.exports = LeadModel;
