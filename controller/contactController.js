const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
const { FORBIDDEN } = require("../constants");

// @ desc get api
// @ route GET /api/contacts
// @ access Private

const getContacts = asyncHandler(async (req, res) => {
  const contact = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

// @ desc getbyID api
// @ route GET /api/contacts
// @ access Private

const getContactsByID = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @ desc post api
// @ route POST /api/contacts
// @ access Private

const postContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("name and email are required");
  }
  const repeteEmail = await contactModel.findOne({ email });
  const repetePhone = await contactModel.findOne({ phone });

  if (repeteEmail) {
    res.status(400);
    throw new Error("email adress already exists");
  }
  if (repetePhone) {
    res.status(400);
    throw new Error("phone number already exists");
  }

  await contactModel.create({ name, email, phone, user_id: req.user.id });

  res.status(200).json({ message: "contact created successfully" });
});

// @ desc put api
// @ route PUT /api/contacts/:id
// @ access Private

const updateContacts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await contactModel.findById(id);
  if (!contact) {
    throw new Error(`Couldn't find contact for ${id}`);
  }

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("name and email are required");
  }
  if (contact.user_id !== req.user.id) {
    res
      .status(FORBIDDEN)
      .json({ message: "you are not allowed to do this operation" });
  }

  const updateContact = await contactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updateContact);
});

// @ desc delete api
// @ route DELETE /api/contacts/:id
// @ access Private

const deleteContacts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await contactModel.findById(id);

  if (!contact) {
    throw new Error(`Couldn't find contact for ${id}`);
  }

  if (contact.user_id !== req.user.id) {
    res.status(unauthorized).json({
      message: `you are not allowed to do this operation`,
    });
  }

  await contactModel.findByIdAndDelete(id);
  res.status(200).json({
    message: `delete successfullt as per the ${req.params.id}`,
  });
});

module.exports = {
  getContacts,
  postContacts,
  updateContacts,
  deleteContacts,
  getContactsByID,
};
