import mongoose from "mongoose";
import { FechaHoyArgentina } from "../helpers/funciones.js";

const productoSchema = mongoose.Schema(
  {
    nombreProducto: {
      type: String,
      trim: true,
      required: true,
    },
    cantidad: {
      type: Number,
      trim: true,
      required: true,
    },
    precio: {
      type: Number,
      trim: true,
      required: true,
    },
    costo: {
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
      default: FechaHoyArgentina,
    },
    descripcion: {
      type: String,
      trim: true,
      required: false,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
