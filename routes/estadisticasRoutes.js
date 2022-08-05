import express from "express";

import {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
  obtenerEstadisticasPorFecha,
  obtenerEstadisticasInventario,
} from "../controllers/estadisticasController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route(`/`).get(checkAuth, obtenerEstadisticasGenerales);
router.route("/hoy").get(checkAuth, obtenerEstadisticasPorFecha);

obtenerEstadisticasPorFecha;
router.route("/gastos").get(checkAuth, obtenerEstadisticasGastos);
router.route("/ventas").get(checkAuth, obtenerEstadisticasVentas);
router.route("/inventario").get(checkAuth, obtenerEstadisticasInventario);

export default router;
