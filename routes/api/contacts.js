const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    // const { error } = addSchema.validate(req.body);
    // if (error) throw HttpError(400, error.message);

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
