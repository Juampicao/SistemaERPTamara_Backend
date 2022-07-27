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

router.route("/:id").get(obtenerVenta).put(editarVenta).delete(eliminarVenta);

//   .delete(checkAuth, eliminarProyecto);

// router.post(`/agregar-colaborador/:id`, checkAuth, agregarColaborador);
// router.post(`/eliminar-colaborador/:id`, checkAuth, eliminarColaborador);

export default router;
