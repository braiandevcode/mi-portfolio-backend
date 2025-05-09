import DB_CONNECTION from "../../config/db.config-pg.js";

export const getStudiesModel = async () => {
  try {
    // Consulta para contar registros en la tabla `studies`
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM studies');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null; // 👈 Enviar null si no hay registros
    }

    // Obtener datos de `studies`
    const { rows: results } = await DB_CONNECTION.query(`
      SELECT id_study, title, institution, period, text_info 
      FROM studies
    `);

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Manejo del error para el controlador
  }
};