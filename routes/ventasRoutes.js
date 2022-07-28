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

router.route(`/`).get(obtenerVentas,obtenerEstadisticasVenta).post(nuevaVenta);
// router.route(`/`).get(obtenerVentas).post(nuevaVenta);

router.route("/:id").get(obtenerVenta).put(editarVenta).delete(eliminarVenta);

// router.get('/ventas/estadisticas', obtenerEstadisticasVenta);

export default router;
