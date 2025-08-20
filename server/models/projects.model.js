const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectsModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectsModel;
