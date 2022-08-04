import express from "express";

import {
  obtenerVentas,
  nuevaVenta,
  obtenerVenta,
  editarVenta,
  eliminarVenta,
  obtenerEstadisticasVenta,
} from "../controllers/ventasController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route(`/`)
  .get(checkAuth, obtenerVentas, obtenerEstadisticasVenta)
  .post(checkAuth, nuevaVenta);

router
  .route("/:id")
  .get(checkAuth, obtenerVenta)
  .put(checkAuth, editarVenta)
  .delete(checkAuth, eliminarVenta);

export default router;
