import { z } from "zod";

// Lista parcial de dominios temporales
const temporaryEmailDomains = [
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "discard.email",
  "fakeinbox.com",
  "getnada.com",
  "emailondeck.com",
];

export const contactSchema = z.object({
  nameContact: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre no puede estar vacío")
    .max(50, "El nombre es demasiado largo")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras y espacios"),

  emailContact: z
    .string({ required_error: "El email es obligatorio" })
    .min(1, "El email no puede estar vacío")
    .email("Debe ser un email válido")
    .max(100, "El email es demasiado largo")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !temporaryEmailDomains.some(tempDomain => domain?.endsWith(tempDomain));
    }, {
      message: "No se permite el uso de correos temporales",
    }),

  subjectContact: z
    .string({ required_error: "El asunto es obligatorio" })
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(100, "El asunto es demasiado largo")
    .regex(/^[\w\s.,¡!¿?áéíóúÁÉÍÓÚñÑ-]+$/, "El asunto contiene caracteres no permitidos"),

  message: z
    .string({ required_error: "El mensaje es obligatorio" })
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
});


// Luego en tu controlador o middleware:
export function validateContact(req, res, next) {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = Object.entries(result.error.format()).reduce(
      (acc, [field, value]) => {
        if (field !== "_errors") {
          acc[field] = value._errors; // Es array con todos los mensajes posibles
        }
        return acc;
      },
      {}
    );

    console.log(formattedErrors);
    

    return res.status(400).json({
      success: false,
      message: "Error de validación en el formulario.",
      result: formattedErrors,
    });
  }

  req.validatedData = result.data;
  next();
}
