const contactsOperations = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsOperations.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contactsOperations.addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.table(removedContact);
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

invokeAction(argv);
