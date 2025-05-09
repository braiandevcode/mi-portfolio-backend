import DB_CONNECTION from "../config/db.config.js";

export const getSkillModel = async () => {
    const conn = await DB_CONNECTION.getConnection();

    try {
        const [rows] = await conn.query('SELECT COUNT(*) AS contador FROM skill');
        const contador = rows[0].contador;

        if (contador <= 0) {
            conn.release();
            return null; // 👈 Enviar null
        }

        await conn.beginTransaction();

        const [results] = await conn.query('SELECT * FROM skill');

        await conn.commit();
        conn.release();

        return results; // 👈 El modelo solo devuelve los datos, no responde al cliente

    } catch (error) {
        await conn.rollback().catch(() => {});
        conn.release();
        throw error; // 👈 El modelo vuelve a lanzar el error al controlador
    }
};
