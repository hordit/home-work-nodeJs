const { program } = require("commander");

const contactsModule = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsModule.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsModule.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsModule.addContact(name, email, phone);
      console.log("Contact was added", newContact);
      break;

    case "remove":
      await contactsModule.removeContact(id);
      console.log(`Contact with ID: ${id} was removed.`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);
invokeAction(argv);
