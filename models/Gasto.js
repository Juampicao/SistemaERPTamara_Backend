import mongoose from "mongoose";
import { DiaActual } from "../helpers/funciones.js";

const gastosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    valor: {
      type: Number,
      trim: true,
      required: true,
    },
    categoria: {
      type: String,
      trim: true,
      required: true,
    },
    fecha: {
      type: Date,
      default: DiaActual,
    },
    notas: {
      type: String,
      trim: true,
      required: false,
    },
    productoIngresado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
    // ,
    // creador: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Usuario",
    // },
    // tareas: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Tarea",
    //   },
    // ],
    // colaboradores: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Usuario",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Gasto = mongoose.model("Gasto", gastosSchema);
export default Gasto;
