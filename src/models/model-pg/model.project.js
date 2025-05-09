import DB_CONNECTION from "../../config/db.config-pg.js";

export const getProjectModel = async () => {
  try {
    // Consulta para contar registros en la tabla `project`
    const { rows: contadorRows } = await DB_CONNECTION.query('SELECT COUNT(*) AS contador FROM project');
    const contador = contadorRows[0].contador;

    if (contador <= 0) {
      return null; // 👈 Enviar null si no hay registros
    }

    // Consulta para obtener los proyectos
    const { rows: results } = await DB_CONNECTION.query(`
      SELECT id_project, file_name, title, info_project, technologies, github_url, demo_url 
      FROM project
    `);

    return results; // 👈 Devuelve los datos al controlador

  } catch (error) {
    throw error; // 👈 Manejo del error para el controlador
  }
};