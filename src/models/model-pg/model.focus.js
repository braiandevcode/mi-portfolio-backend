import DB_CONNECTION from "../../config/db.config-pg.js";

export const getInfoFocusModel = async () => {
  try {
    // Consulta para contar los registros
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM current_focus');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null;
    }

    // Ejecutar la consulta sin manejar transacciones manualmente
    const { rows: results } = await DB_CONNECTION.query('SELECT * FROM current_focus');

    console.log(results);

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Lanza el error para que el controlador lo maneje
  }
};