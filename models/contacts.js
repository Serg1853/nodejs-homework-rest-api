const fs = require("node:fs/promises");
const path = require("path");
const nanoid = require("nanoid");
const contactsPath = path.join(__dirname, "models", "contacts.js");

const listContacts = async () => {
  const data = await fs.readFiles(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id) || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splise(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
