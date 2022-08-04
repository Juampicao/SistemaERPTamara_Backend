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
  .get(checkAuth, obtenerProductos, obtenerEstadisticas)
  .post(checkAuth, nuevoProducto);

router
  .route("/:id")
  .get(checkAuth, obtenerProducto)
  .put(checkAuth, editarProducto)
  .delete(checkAuth, eliminarProducto);

export default router;
