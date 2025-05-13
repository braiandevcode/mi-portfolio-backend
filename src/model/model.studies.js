import DB_CONNECTION from "../config/db.config.js";

export const getStudiesModel = async () => {
    const conn = await DB_CONNECTION.getConnection();

    try {
        const [rows] = await conn.query('SELECT COUNT(*) AS contador FROM studies');
        const contador = rows[0].contador;

        if (contador <= 0) {
            conn.release();
            return null; 
        }

        await conn.beginTransaction();

        const [results] = await conn.query('SELECT id_study, title, institution, period, text_info FROM studies');

        await conn.commit();
        conn.release();

        return results; 
    } catch (error) {
        await conn.rollback().catch(() => {});
        conn.release();
        throw error; 
    }
};