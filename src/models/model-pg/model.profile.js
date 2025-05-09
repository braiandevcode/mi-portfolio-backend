import DB_CONNECTION from "../../config/db.config-pg.js";

export const getInfoProfileModel = async () => {
  try {
    // Consulta para contar registros
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM profile_info');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null;
    }

    // Obtener datos de `profile_info`
    const { rows: results } = await DB_CONNECTION.query('SELECT * FROM profile_info');
    console.log("Se leyó!!", results);

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Lanza el error para que el controlador lo maneje
  }
};