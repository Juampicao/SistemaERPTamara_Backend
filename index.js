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
      callback(new Error("Error de Cors"));
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
  console.log("Servidor Corriendo en puerto 4000");
});

// Seccion Pruebas
// enviarPrueba();

// async function enviarPrueba() {
// Agregar Prueba //
// const prueba = new Prueba({
//   nombre: "Alfredo",
//   productoComprado: "Hamburguesa",
//   cantidad: 5,
//   categoria: "Comidas",
//   // costo: 2,
//   precio: 50,
//   // unidadesVendidas: 10,
// });
// prueba
//   .save()
//   .then(() => console.log(`Usuario ${prueba.nombre} creado correctamente.`));
// Crear una venta
// const crearVenta = new Venta({
//   producto: "Fernet",
//   cantidad: 2,
//   valorIndividual: 1,
//   valorTotal: 2,
//   metodoPago: "Efectivo",
//   categoria: "bebidas",
//   notas: "Probando la venta",
// });
// crearVenta
//   .save()
//   .then(() =>
//     console.log(`Venta ${crearVenta.producto} creado correctamente.`)
//   );
// Buscar en  Prueba //
// const prueba = await Prueba.find({ nombre: "Gonzalo" }).limit(2); //1 Limitar la Q del array a mostrar.
// const prueba = await Prueba.where("precio").gt(40).lt(61).limit(2);  //2 Valores entre.
// const prueba = await Prueba.find(
//   { nombre: "Gonzalo" },
//   { cantidad: 1, precio: 1 }
// ); // 3 Devolver solo propiedades que quiero.
// const prueba = await Prueba.count({ nombre: "Alfredo" }); //4  Contar veces unicas.
// const prueba = await Prueba.distinct("nombre"); //5  Contar veces unicas de una propiedad.
// const prueba = await Prueba.aggregate([
//   { $match: {} },
//   { $group: { _id: "$nombre", cantidad: { $sum: "$cantidad" } } },
// ]); // 6 Sumar todas los valores de una propiedad, de cada usuario. Suma todas las cantidadaes, de cada nombre.
// const prueba = await Prueba.aggregate([
//   { $match: {} },
//   { $group: { _id: "$nombre", precio: { $sum: "$precio" } } },
// ]); // 6 Sumar todas los valores de una propiedad, de cada usuario. Suma todas las cantidadaes, de cada nombre.
// const prueba = await Prueba.aggregate([
//   { $match: {} },
//   {
//     $group: {
//       _id: "$productoComprado",
//       VentasTotales: { $sum: "$cantidad" },
//     },
//   },
// ]); // 7 sumar ventas por persona totales.
// const prueba = await Prueba.aggregate([
//   { $match: { categoria: { $in: ["Inventario", "Comidas"] } } },
//   {
//     $group: {
//       _id: "$categoria",
//       precio: { $sum: "$precio" },
//     },
//   },
//   { $sort: { precio: 1 } },
// ]); // 8 . ${Match} => Excluir o solo seleccionar algunas propiedades. ${Group}, iterar sobre estas categorias.
// const prueba = await Prueba.aggregate([
//   { $match: {} },
//   {
//     $group: {
//       _id: "$categoria",
//       precio: { $sum: "$precio" },
//     },
//   },
//   // { $sort: { precio: 1 } },
// ]); // 9 . ${Match} => Excluir o solo seleccionar algunas propiedades. ${Group}, iterar sobre estas categorias.
// console.log(prueba);
// }
//

// console.log("Obtener estadisticas")
// obtenerEstadisticas();
// console.log("Obtener ventas")
// obtenerEstadisticasVenta();
// obtenerEstadisticasGastos();
// obtenerVentas();
