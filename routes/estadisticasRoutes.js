import express from "express";

import {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
} from "../controllers/estadisticasController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route(`/`).get(obtenerEstadisticasGenerales);
router.route("/gastos").get(obtenerEstadisticasGastos);
router.route("/ventas").get(obtenerEstadisticasVentas);

export default router;
