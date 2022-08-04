import express from "express";

import {
  nuevaCaja,
  editarCaja,
  obtenerCaja,
} from "../controllers/cajaController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(checkAuth, nuevaCaja);

router.route("/:id").put(checkAuth, editarCaja).get(checkAuth, obtenerCaja);
// router
//   .route("/editarcaja")
//   .put(checkAuth, editarCaja)
//   .get(checkAuth, obtenerCaja);

export default router;
