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

router.route(`/`).get(obtenerGastos).post(checkAuth, nuevoGasto);

router
  .route("/:id")
  .get(obtenerGasto)
  .put(editarGasto)
  .delete(checkAuth, eliminarGasto);

// router.post(`/agregar-colaborador/:id`, checkAuth, agregarColaborador);
// router.post(`/eliminar-colaborador/:id`, checkAuth, eliminarColaborador);

export default router;
