const fs = require("fs/promises");
const nanoid = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    (error) => console.log(error);
  }
  return;
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(contacts).find((el) => el.id === contactId);
    console.table(result);
  } catch (error) {
    (error) => console.log(error);
  }
  return;
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  const index = parsedContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return;
  }
  parsedContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsedContacts, null, 2));
  console.log("Contact is deleted");
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  parsedContacts.push({ id: nanoid(), name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(parsedContacts, null, 2));
  console.log("Contact created");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
