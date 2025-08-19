const asyncHandler = require("../utils/async-handler");
const ContactModel = require("../models/contacts.model");

const createContact = asyncHandler(async (req, res) => {
  const { reference, title, firstname, surname, contact, email } = req.body;

  const newContact = await ContactModel.create({
    reference,
    title,
    firstname,
    surname,
    contact,
    email,
  });

  return res.status(201).json({
    success: true,
    message: "Contact created successfully.",
    data: newContact,
  });
});

const getAllContacts = asyncHandler(async (_, res) => {
  const contacts = await ContactModel.find();

  return res.status(200).json({
    success: true,
    message: "Contacts fetched successfully.",
    data: contacts,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const contactID = req.params.id;

  if (!contactID) {
    const error = new Error("Please provide contact id.");
    error.status = 404;
    throw error;
  }

  const { reference, title, firstname, surname, contact, email } = req.body;

  const updatedContact = await ContactModel.findByIdAndUpdate(
    contactID,
    { reference, title, firstname, surname, contact, email },
    { new: true, runValidators: true }
  );

  if (!updatedContact) {
    const error = new Error("Contact not found.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Contact updated successfully.",
    data: updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contactID = req.params.id;

  if (!contactID) {
    const error = new Error("Please provide contact id.");
    error.status = 404;
    throw error;
  }

  const deletedContact = await ContactModel.findByIdAndDelete(contactID);
  if (!deletedContact) {
    const error = new Error("Contact with this id doesn't exist.");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Contact deleted successfully.",
    data: deletedContact,
  });
});

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
