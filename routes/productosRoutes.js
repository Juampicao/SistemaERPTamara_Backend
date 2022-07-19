import express from "express";

import {
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto,
  editarCantidadProducto,
  nuevoProducto,
} from "../controllers/productosController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route(`/`).get(obtenerProductos).post(nuevoProducto);

router
  .route("/:id")
  .get(obtenerProducto)
  .put(editarProducto)
  .delete(eliminarProducto);

router.route("editarcantidad/:id").put(editarCantidadProducto);
export default router;
