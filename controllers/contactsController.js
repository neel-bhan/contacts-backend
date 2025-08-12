const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc create new contact
//@route POST /api/contacts
//@access Public
const createNewContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({ name, email, phone });
  res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(200).json({ message: `Update a contact ${req.params.id}` });
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete a contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  createNewContacts,
  getContact,
  updateContact,
  deleteContact,
};
