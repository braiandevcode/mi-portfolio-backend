import { getSkillModel } from "../model/model.skill.js";

/*
✅ Códigos de Éxito (2xx)
200 OK → Todo bien, respuesta exitosa.

201 Created → Recurso creado correctamente (ej: POST).

204 No Content → Éxito, pero sin datos que devolver.

⚠️ Errores del Cliente (4xx)
400 Bad Request → Petición malformada (ej: faltan datos).

401 Unauthorized → No autenticado (no tenés token válido).

403 Forbidden → Autenticado pero sin permisos.

404 Not Found → Ruta o recurso no encontrado.

❌ Errores del Servidor (5xx)
500 Internal Server Error → Error inesperado en el servidor.

503 Service Unavailable → Servicio no disponible (ej: mantenimiento).
*/

export const getSkills = async (req, res) => {
  try {
    // LLAMAMOS AL MODELO
    const resultsSkillModel = await getSkillModel();

    // SI EL CONTADOR NO ES MAYOR A CERO NO HAY REGISTROS Y NO INICIAR TRANSACCION
    if (resultsSkillModel === null) {
      return res.status(200).json({
        success: false,
        message: 'No se encontraron registros.',
        result: null
      });
    }
    ;
    // SINO
    return res.status(200).json({
      success: true,
      message: 'Ok',
      result: resultsSkillModel
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'No eres tú, soy yo. Intente más tarde.',
      result: null
    });
  }
};