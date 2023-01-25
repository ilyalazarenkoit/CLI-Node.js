const { Command } = require("commander");
const moduleContacts = require("./contacts");

async function run() {
  try {
    const program = new Command();
    program
      .option("-a, --action <type>", "choose action")
      .option("-i, --id <type>", "user id")
      .option("-n, --name <type>", "user name")
      .option("-e, --email <type>", "user email")
      .option("-p, --phone <type>", "user phone");

    program.parse(process.argv);

    const argv = program.opts();
    invokeAction(argv);
  } catch (e) {
    console.log(e);
  }
}
run();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      console.table(await moduleContacts.listContacts());
      return moduleContacts.listContacts();
    }
    case "get": {
      console.table(await moduleContacts.getContactsById(id));
      return moduleContacts.getContactsById(id);
    }
    case "add": {
      console.table(await moduleContacts.addContact(name, email, phone));
      return moduleContacts.addContact(name, email, phone);
    }
    case "remove": {
      console.table(await moduleContacts.removeContact(id));
      return moduleContacts.removeContact(id);
    }
    default:
      console.warn("Unknown action type!");
  }
}
