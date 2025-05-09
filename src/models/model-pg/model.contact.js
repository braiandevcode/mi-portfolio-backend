import DB_CONNECTION from "../../config/db.config-pg.js";

export const addNewMessageContactModel = async ({ nameContact, emailContact, subjectContact, message }) => {
  try {
    const queryContact = 'INSERT INTO contact(name_contact, email_contact, subject_contact, message) VALUES($1, $2, $3, $4) RETURNING *';

    const { rows } = await DB_CONNECTION.query(queryContact, [
      nameContact, emailContact, subjectContact, message
    ]);

    return rows[0]; // PostgreSQL devuelve los datos insertados
  } catch (error) {
    throw error; // 👈 El modelo vuelve a lanzar el error al controlador
  }
};