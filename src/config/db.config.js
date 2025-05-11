import { createPool } from "mysql2/promise";
// CONEXION A LA BASE DE DATOS MYSQL
const DB_CONNECTION = ()=>{
  return createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true, // esperará si todas las conexiones están ocupadas
    connectionLimit: 10, // máximo 10 conexiones simultáneas
    keepAliveInitialDelay: 10000, // Opcional: mantenerla activa
    queueLimit: 0, // sin límite de espera en cola
  })
}
export default DB_CONNECTION;
