import DB_CONNECTION from "../../config/db.config-pg.js";


export const getSkillModel = async () => {
  try {
    // Consulta para contar registros en la tabla `skill`
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM skill');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null; // 👈 Enviar null si no hay registros
    }

    // Obtener datos de `skill`
    const { rows: results } = await DB_CONNECTION.query('SELECT * FROM skill');

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Manejo del error para el controlador
  }
};
