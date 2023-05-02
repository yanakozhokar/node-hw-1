const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  const contacts = fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

function getContactById(contactId) {
  const contacts = fs.readFile(contactsPath);
  return contacts.find((el) => el.id === contactId);
}

function removeContact(contactId) {
  const contacts = fs.readFile(contactsPath);
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return;
  }
  contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

function addContact(name, email, phone) {
  const contacts = fs.readFile(contactsPath);
  contacts.push({ name, email, phone });
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
