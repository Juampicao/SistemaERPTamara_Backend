import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import gastosRoutes from "./routes/gastosRoutes.js";
import cajaRoutes from "./routes/cajaRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import pruebasRoutes from "./routes/pruebasRoutes.js";
import estadisticasRoutes from "./routes/estadisticasRoutes.js";

import Gasto from "./models/Gasto.js";
import Prueba from "./models/Prueba.js";
import Venta from "./models/Venta.js";
import { obtenerEstadisticas } from "./controllers/productosController.js";
import {
  obtenerEstadisticasVenta,
  obtenerVentas,
} from "./controllers/ventasController.js";
import {
  obtenerEstadisticasGastos,
  obtenerGasto,
  obtenerGastos,
} from "./controllers/gastosController.js";
import Producto from "./models/Producto.js";
import Caja from "./models/Caja.js";

import { sumarNumerosArray, crearArrayValores } from "./helpers/funciones.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// const whitelist = [`http://localhost:3000`];

console.log(`La variable de entorno es ${process.env.FRONTEND_URL}`);

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Esta URL no esta permitida."));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use(`/usuarios`, usuarioRoutes);
app.use(`/gastos`, gastosRoutes);
app.use(`/ventas`, ventasRoutes);
app.use(`/productos`, productosRoutes);
app.use(`/pruebas`, pruebasRoutes);
app.use(`/estadisticas`, estadisticasRoutes);

app.use(`/caja`, cajaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor Corriendo en el puerto 4000");
});

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);

// const ventasUnicas = await Venta.find().count();
// console.log(ventasUnicas);

let fechaPersonalizada;
let AyerFechaPersonalizada;

fechaPersonalizada = new Date();
AyerFechaPersonalizada = new Date();
AyerFechaPersonalizada.setDate(fechaPersonalizada.getDate() - 1);

console.log(` fecha personalizada es: ${fechaPersonalizada}`);
console.log(` Ayerfecha personalizada es: ${AyerFechaPersonalizada}`);

const obtenerGastosPersonalizado = await Gasto.aggregate([
  {
    $match: {
      $and: [
        { fecha: { $gt: AyerFechaPersonalizada, $lt: fechaPersonalizada } },
      ],
    },
  },
  {
    $group: {
      _id: "$categoria",
      valor: { $sum: "$valor" },
    },
  },
]);

let montoTotalGastosProveedores;
let montoTotalGastosVarios;
let montoTotalGastosComida;
let montoTotalGastosInventario;

obtenerGastosPersonalizado.forEach((gasto) => {
  console.log(`${gasto._id} - ${gasto.valor}`);
});

console.log(obtenerGastosPersonalizado);
