import express from "express";

import {
  obtenerPrueba,
  obtenerPruebas,
  eliminarPrueba,
  editarPrueba,
  nuevaPrueba,
} from "../controllers/pruebasController.js";

const router = express.Router();

router.route(`/`).get(obtenerPruebas).post(nuevaPrueba);

router
  .route("/:id")
  .get(obtenerPrueba)
  .put(editarPrueba)
  .delete(eliminarPrueba);

export default router;
