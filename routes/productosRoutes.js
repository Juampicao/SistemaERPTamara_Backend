import express from "express";

import {
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto,
  nuevoProducto,
  obtenerEstadisticas,
} from "../controllers/productosController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route(`/`)
  .get(obtenerProductos, obtenerEstadisticas)
  .post(nuevoProducto);

router
  .route("/:id")
  .get(obtenerProducto)
  .put(editarProducto)
  .delete(eliminarProducto);

export default router;
