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
    },
    // fecha: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // id: {
    //   type: Number,
    //   default: 1,
    // }
  },
  {
    timestamps: true,
  }
);

const Caja = mongoose.model("Caja", cajaSchema);
export default Caja;
