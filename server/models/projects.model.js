const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      default : null
    },
    reference: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
