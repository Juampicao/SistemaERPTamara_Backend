import mongoose from "mongoose";
import { FechaHoyArgentina } from "../helpers/funciones.js";

const ventasSchema = mongoose.Schema(
  {
    producto: {
      type: String,
      trim: true,
      required: true,
    },
    cantidad: {
      type: Number,
      trim: true,
      required: true,
    },
    valorIndividual: {
      type: Number,
      trim: true,
      required: true,
    },
    valorTotal: {
      type: Number,
      trim: true,
      required: true,
    },
    metodoPago: {
      type: String,
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
      default: FechaHoyArgentina,
    },
    notas: {
      type: String,
      trim: true,
      required: false,
    },

    productoVendido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
  },
  {
    timestamps: true,
  }
);

const Venta = mongoose.model("Venta", ventasSchema);
export default Venta;
