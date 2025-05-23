import dotenv from "dotenv";
const mode = process.env.NODE_ENV || 'development'
const envFile = `.env.${mode}`;
dotenv.config({ path: `${envFile}`}); //USAMOS CONFIGURACION DE DOTENV PARA LEER VARIABLES DE ENTORNO
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { routeProfile } from "./routes/route.profile.js";
import { routeFocus } from "./routes/routeFocus.js";
import { routeProjects } from "./routes/route.project.js";
import { routeStudies } from "./routes/route.studies.js";
import { routeTrajectory } from "./routes/route.trajectory.js";
import routerContact from "./routes/route.contact.js";
import { routeSkills } from "./routes/route.skill.js";
import relayConnection from "./model/model.relayConnection.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Guardar Ejecucion de Express en app.
const app = express();

// *******SETTINGS*********//
// EJEMPLO DE CONFIGURACION
const PORT = process.env.PORT || 3000;
const MESSAGE = `${process.env.MESSAGE_CONNECTION_SERVER} ${PORT}`;
app.set("port", PORT);
app.set("message_server", MESSAGE);

// *******MIDDLEWARES*********//
// HELMET
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// PARA MANEJO DE CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.ORIGIN}`);
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// PARA MODO DESARROLLO VER LOS RESULTADOS D ELOS PROTOCOLO DE CONSULTA.
app.use(morgan("dev"));
app.use(express.json());
// urlencoded({ extended: false })) => usa la librería querystring, que no admite objetos complejos, solo planos.
app.use(urlencoded({ extended: true })) // permite que el cuerpo del formulario contenga objetos anidados, usando la librería qs
app.use(
  "/uploads",
  express.static(join(__dirname, "images", "uploads"))
);

app.get('/ping', async (req, res) => {
 await relayConnection(req, res);
});


//**USO DE RUTAS***//
app.use("/api/data", routeSkills);
app.use("/api/data", routeProfile);
app.use("/api/data", routeFocus);
app.use("/api/data", routeProjects);
app.use("/api/data", routeStudies);
app.use("/api/data", routeTrajectory);
app.use("/api/data", routerContact);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada.",
  });
});

app.listen(app.get("port"), console.log(app.get("message_server")));
