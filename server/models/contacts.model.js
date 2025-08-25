const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
    },
    title: {
      type: String,
      enum: ["Mr", "Ms", "Miss", "Mrs"],
    },
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ContactModel = mongoose.model("Contact", contactSchema);
module.exports = ContactModel;
