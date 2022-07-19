import express from "express";

import {
  nuevaCaja,
  editarCaja,
  obtenerCaja,
} from "../controllers/cajaController.js";

// import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").post(nuevaCaja);

router.route("/:id").put(editarCaja).get(obtenerCaja);

export default router;
