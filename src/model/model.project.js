import DB_CONNECTION from "../config/db.config.js";

export const getProjectModel = async () => {
    const conn = await DB_CONNECTION.getConnection();

    try {
        const [rows] = await conn.query('SELECT COUNT(*) AS contador FROM project');
        const contador = rows[0].contador;

        if (contador <= 0) {
            conn.release();
            return null; // 👈 Enviar null
        }

        await conn.beginTransaction();

        const [results] = await conn.query('SELECT id_project, file_name, title, info_project, technologies, github_url, demo_url FROM project')

        await conn.commit();
        conn.release();

        return results;

    } catch (error) {
        await conn.rollback().catch(() => {});
        conn.release();
        throw error; 
    }
};
