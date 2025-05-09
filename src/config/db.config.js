import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config(); //USAMOS CONFIGURACION DE DOTENV PARA LEER VARIABLES DE ENTORNO 

// CONEXION A LA BASE DE DATOS MYSQL
const DB_CONNECTION = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,     // esperará si todas las conexiones están ocupadas
  connectionLimit: 10,          // máximo 10 conexiones simultáneas
  queueLimit: 0                 // sin límite de espera en cola
});

export default DB_CONNECTION;
