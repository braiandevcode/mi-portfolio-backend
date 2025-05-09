import { Router } from "express";
import { validateContact } from "../helpers/validation.contact.js";
import { addNewMessageContact } from '../controllers/ctrl.contact.js';

const routerContact = Router();

// Aquí Express ejecuta primero `validateContact`, y solo si pasa, ejecuta `addNewMessageContact`
routerContact.post("/contact", validateContact, addNewMessageContact);

export default routerContact;