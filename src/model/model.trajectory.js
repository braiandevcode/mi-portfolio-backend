import DB_CONNECTION from "../config/db.config.js";

export const getInfoTrajectoryeModel = async () => {
    const conn = await DB_CONNECTION.getConnection();

    try {
        const [rows] = await conn.query('SELECT COUNT(*) AS contador FROM trajectory');
        const contador = rows[0].contador;

        if (contador <= 0) {
            conn.release();
            return null; 
        }

        await conn.beginTransaction();

        const [results] = await conn.query('SELECT  id_trajectory, info_trajectory FROM trajectory');

        await conn.commit();
        conn.release();

        return results; 

    } catch (error) {
        await conn.rollback().catch(() => {});
        conn.release();
        throw error; 
    }
};