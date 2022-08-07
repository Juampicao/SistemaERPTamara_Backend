import express from "express";

import {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
  obtenerEstadisticasHoy,
  obtenerEstadisticasInventario,
  obtenerEstadisticasGeneralesPersonalizado,
  obtenerEstadisticasGastosPersonalizado,
} from "../controllers/estadisticasController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route(`/`).get(checkAuth, obtenerEstadisticasGenerales);
router.route("/hoy").get(checkAuth, obtenerEstadisticasHoy);

router
  .route("/fechapersonalizada")
  .post(checkAuth, obtenerEstadisticasGeneralesPersonalizado);

router
  .route("/fechapersonalizada/gastos")
  .post(checkAuth, obtenerEstadisticasGastosPersonalizado);

router.route("/gastos").get(checkAuth, obtenerEstadisticasGastos);
router.route("/ventas").get(checkAuth, obtenerEstadisticasVentas);
router.route("/inventario").get(checkAuth, obtenerEstadisticasInventario);

export default router;
