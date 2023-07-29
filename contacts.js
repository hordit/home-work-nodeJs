const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const handlerError =
  (func) =>
  async (...args) => {
    try {
      return await func(...args);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = handlerError(async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
});

const getContactById = handlerError(async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
});

const removeContact = handlerError(async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
});

const addContact = handlerError(async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = [...contacts, newContact];
  await updateContacts(allContacts);
  return newContact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

console.log(contactsPath);
