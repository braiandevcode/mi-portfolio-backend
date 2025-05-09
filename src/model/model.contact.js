import DB_CONNECTION from "../config/db.config.js";

// NUEVO MENSAJE DE CONTACTO
export const addNewMessageContactModel = async ({nameContact, emailContact, subjectContact, message}) => {
    try {
        const queryContact = 'INSERT INTO contact(name_contact, email_contact, subject_contact, message) VALUES(?, ?, ?, ?)';

        const [results] = await DB_CONNECTION.query(
            queryContact, 
            [nameContact, emailContact, subjectContact,message]
        );
        return results;
    } catch (error) {
        throw error; // 👈 El modelo vuelve a lanzar el error al controlador
    }
};
