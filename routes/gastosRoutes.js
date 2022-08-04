import express from "express";

import {
  obtenerGastos,
  nuevoGasto,
  obtenerGasto,
  editarGasto,
  eliminarGasto,
  obtenerEstadisticasGastos,
} from "../controllers/gastosController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route(`/`).get(checkAuth, obtenerGastos).post(checkAuth, nuevoGasto);

router
  .route("/:id")
  .get(checkAuth, obtenerGasto)
  .put(checkAuth, editarGasto)
  .delete(checkAuth, eliminarGasto);

export default router;
