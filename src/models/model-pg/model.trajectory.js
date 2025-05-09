import DB_CONNECTION from "../../config/db.config-pg.js";

export const getInfoTrajectoryeModel = async () => {
  try {
    // Consulta para contar registros en la tabla `trajectory`
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM trajectory');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null; // 👈 Enviar null si no hay registros
    }

    // Obtener datos de `trajectory`
    const { rows: results } = await DB_CONNECTION.query('SELECT id_trajectory, info_trajectory FROM trajectory');

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Manejo del error para el controlador
  }
};