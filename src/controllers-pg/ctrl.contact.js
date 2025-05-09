import { Resend } from "resend";
import dotenv from 'dotenv';
import { addNewMessageContactModel } from "../models/model-pg/model.contact.js";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const addNewMessageContact = async (req, res) => {
  try {
    if (req.errors) {
      return res.status(400).json({
        success: false,
        message: "Error de validación en el formulario.",
        result: req.errors,
      });
    }

    const { nameContact, emailContact, subjectContact, message } = req.validatedData;

    // 1. Enviar email al administrador
    const adminEmailResult = await resend.emails.send({
      from: "Formulario Web <onboarding@resend.dev>",
      to: `${process.env.MY_EMAIL}`,
      reply_to: emailContact,
      subject: `Nuevo mensaje de contacto: ${subjectContact}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nameContact}</p>
        <p><strong>Email:</strong> ${emailContact}</p>
        <p><strong>Asunto:</strong> ${subjectContact}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `,
    });

    if (adminEmailResult.error) {
      return res.status(500).json({
        success: false,
        message: "No se pudo enviar el mensaje al administrador.",
        result: null,
      });
    }

    // 2. Enviar confirmación al usuario
    const confirmEmailResult = await resend.emails.send({
      from: "Formulario Web <onboarding@resend.dev>",
      to: emailContact,
      subject: "Hemos recibido tu mensaje ✔️",
      html: `
        <h3>¡Gracias por contactarte, ${nameContact}!</h3>
        <p>He recibido tu mensaje con el asunto: <strong>${subjectContact}</strong>.</p>
        <p>Me pondré en contacto contigo pronto.</p>
        <br>
        <p>Atentamente,<br>${process.env.MY_NAME}</p>
        <br>
        <p>Visita nuestra página web: <a href=${process.env.ORIGIN}>Mi-portfolio-cv</a></p>
      `,
    });

    // 3. Guardar en la base de datos (adaptado para PostgreSQL)
    const result = await addNewMessageContactModel({
      nameContact,
      emailContact,
      subjectContact,
      message,
    });

    // 4. Evaluar resultados
    const dbSaved = result.rowCount > 0;
    const emailConfirmationSent = !confirmEmailResult.error;

    return res.status(201).json({
      success: dbSaved,
      message: dbSaved
        ? emailConfirmationSent
          ? "Mensaje enviado y registrado con éxito."
          : "Mensaje registrado, pero no se pudo enviar la confirmación al usuario."
        : "No se pudo guardar el mensaje.",
      result: {
        dbSaved,
        emailConfirmationSent,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null,
    });
  }
};
