import DB_CONNECTION from "../../config/db.config.js";

export const getInfoFocusModel = async () => {
    const conn = await DB_CONNECTION.getConnection();

    try {
        const [rows] = await conn.query('SELECT COUNT(*) AS contador FROM current_focus');
        const contador = rows[0].contador;

        if (contador <= 0) {
            conn.release();
            return null; 
        }

        await conn.beginTransaction();

        const [results] = await conn.query('SELECT * FROM current_focus');

        console.log(results)

        await conn.commit();
        conn.release();

        return results; // 👈 El modelo solo devuelve los datos, no responde al cliente

    } catch (error) {
        await conn.rollback().catch(() => {});
        conn.release();
        throw error; // 👈 El modelo vuelve a lanzar el error al controlador
    }
};