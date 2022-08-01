import mongoose from "mongoose";
import { FechaHoyArgentina } from "../helpers/funciones.js";

const pruebaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    fecha: {
      type: Date,
      default: FechaHoyArgentina,
    },
    productoComprado: {
      type: String,
      trim: true,
      required: false,
    },
    unidadesVendidas: {
      type: Number,
      trim: true,
      // required: true,
    },
    cantidad: {
      type: Number,
      trim: true,
      required: false,
    },
    precio: {
      type: Number,
      trim: true,
      // required: true,
    },
    costo: {
      type: Number,
      trim: true,
      // required: true,
    },

    categoria: {
      type: String,
      trim: true,
      // required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Prueba = mongoose.model("Prueba", pruebaSchema);
export default Prueba;
