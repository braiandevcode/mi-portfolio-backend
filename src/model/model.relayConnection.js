import DB_CONNECTION from "../config/db.config.js";
const relayConnection = async () => {
  try {
    const [rows] = await DB_CONNECTION().query("SELECT 1");
    console.log("Ping exitoso");
  } catch (err) {
    console.error("Ping falló", err);
  }
};

export default relayConnection;