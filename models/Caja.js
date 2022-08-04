import mongoose from "mongoose";

const cajaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      // default: "Caja de Hoy",
    },
    inicioCaja: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    fecha: {
      type: Date,
      default: Date.now(),
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

const Caja = mongoose.model("Caja", cajaSchema);
export default Caja;
