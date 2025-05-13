import DB_CONNECTION from "../config/db.config.js";
const relayConnection = async (req, res) => {
  try {
    await DB_CONNECTION.query('SELECT 1');
    res.status(200).send('pong');
  } catch (error) {
    res.status(500).send('Error');
  }
};

export default relayConnection;