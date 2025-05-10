import { Resend } from "resend";
import { addNewMessageContactModel } from "../model/model.contact.js";
import dotenv from 'dotenv';
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
export const addNewMessageContact = async (req, res) => {
  try {
    if (req.errors) {
      return res.status(400).json({
        success: false,
        message: "Error de validación en el formulario.",
        result: req.errors
      });
    }
    const {
      nameContact,
      emailContact,
      subjectContact,
      message
    } = req.validatedData;

    // 1. Enviar al administrador
    const adminEmailResult = await resend.emails.send({
      from: "Formulario Web <onboarding@resend.dev>",
      to: `${process.env.MY_EMAIL}`,
      reply_to: emailContact,
      // 👈 Por si quiero contactar con el usuario
      subject: `Nuevo mensaje de contacto: ${subjectContact}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nameContact}</p>
        <p><strong>Email:</strong> ${emailContact}</p>
        <p><strong>Asunto:</strong> ${subjectContact}</p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `
    });
    if (adminEmailResult.error) {
      return res.status(500).json({
        success: false,
        message: "No se pudo enviar el mensaje al administrador.",
        result: null
      });
    }

    // 2. Enviar al usuario
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
      `
    });

    // 3. Guardar en la base de datos
    const result = await addNewMessageContactModel({
      nameContact,
      emailContact,
      subjectContact,
      message
    });

    // 4. Evaluar resultados
    const dbSaved = result.affectedRows > 0;
    const emailConfirmationSent = !confirmEmailResult.error;
    if (dbSaved === false) {
      return res.status(204).send(); // No hay datos guardados
    }
    return res.status(201).json({
      success: dbSaved,
      message: dbSaved ? emailConfirmationSent ? "Mensaje enviado y registrado con éxito." : "Mensaje registrado, pero no se pudo enviar la confirmación al usuario." : "No se pudo guardar el mensaje.",
      result: {
        dbSaved,
        emailConfirmationSent
      }
    });
  } catch (error) {
    // Error temporal del servidor (ej. problemas de conexión, timeouts)
    if (error.code === 'ECONNREFUSED' || error.message.includes('timeout')) {
      return res.status(503).json({
        success: false,
        message: "El servicio está temporalmente inactivo. Intente nuevamente en unos momentos.",
        result: null
      });
    }

    // Error general de servidor
    return res.status(500).json({
      success: false,
      message: "No eres tú, soy yo. Intente más tarde.",
      result: null
    });
  }
};