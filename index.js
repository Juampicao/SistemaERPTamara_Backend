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

// const startDate = new Date("2022-07-26T00:00:00.000Z");
// const endDate = new Date("2022-07-29T00:00:00.000Z");

// const today = new Date();
// const yesterday = new Date();

// yesterday.setDate(today.getDate() - 1);

// const buscarProductosVendidosHoy = await Venta.find({
//   productoVendido: {
//     $gt: "2022-07-26T00:00:00.000Z",
//     $lt: "2022-08-01T00:00:00.000Z",
//   },
// });
// console.log(buscarPorCreatedAt);

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);

// const obtenerUtilidadVentasHoy = await Venta.aggregate([
//   {
//     $match: { fecha: { $gt: yesterday, $lt: today } },
//   },

//   {
//     $group: {
//       _id: "",
//       totalVentas: { $sum: "$valorTotal" },
//       gananciaBruta: { $sum: "$gananciaBruta" },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//     },
//   },
// ]);

// console.log(obtenerUtilidadVentasHoy);
// const nuevoArr =
//   obtenerUtilidadVentasHoy[Object.keys(obtenerUtilidadVentasHoy)[0]];
// console.log(nuevoArr.totalVentas);
// console.log(nuevoArr.gananciaBruta);

const ventasUnicas = await Venta.find().count();
console.log(ventasUnicas);

// const obtenerUtilidadVentasHoy = await Venta.aggregate([
//   {
//     $match: {
//       $and: [{ fecha: { $gt: yesterday, $lt: today } }],
//     },
//   },
//   {
//     $group: {
//       _id: "",
//       totalVentas: { $sum: "$valorTotal" },
//       gananciaBruta: { $sum: "$gananciaBruta" },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//     },
//   },
// ]);
// [{}];
// console.log(obtenerUtilidadVentasHoy); // OUTPUT=> [ { totalVentas: 60, gananciaBruta: 30 } ]
// const nuevoArr =
//   obtenerUtilidadVentasHoy[Object.keys(obtenerUtilidadVentasHoy)[0]];
// // console.log(nuevoArr);

// let UtilidadVentasHoy = 0; // Output => 60
// let montoTotalVentasHoy = 0; // Output => 30

// if (obtenerUtilidadVentasHoy.length > 0) {
//   let UtilidadVentasHoy = nuevoArr.gananciaBruta; // Output => 60
//   let montoTotalVentasHoy = nuevoArr.totalVentas; // Output => 30
// }
