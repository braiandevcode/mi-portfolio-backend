import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config(); // Leemos variables de entorno

// CONEXIÓN A LA BASE DE DATOS POSTGRESQL
const DB_CONNECTION = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false } // Necesario para conexiones en Render
});

export default DB_CONNECTION;
