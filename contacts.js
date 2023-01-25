const { v4: uuidv4 } = require("uuid");
const fsp = require("fs/promises");
const path = require("path");
const getParsedContacts = async () => {
  let contacts = await fsp.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const contactsPath = path.resolve("./db/contacts.json");
async function listContacts() {
  try {
    const data = await getParsedContacts();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getContactsById(id) {
  try {
    const data = await getParsedContacts();
    const contact = data.find((item) => item.id === id);
    if (!contact) {
      throw new Error(e);
    }
    return contact;
  } catch (e) {
    console.log(e);
  }
}

async function removeContact(id) {
  try {
    const data = await getParsedContacts();
    const contacts = data.filter((item) => item.id !== id);
    fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await getParsedContacts();
    let contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(contact);
    fsp.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
