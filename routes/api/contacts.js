const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
  // res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  await contacts.removeContact(id);
  res.status(204).json();
  // res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  // const { name, email, phone } = req.body;
  const result = await contacts.updateContact(id, req.body);

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
  // res.json({ message: "template message" });
});

module.exports = router;
