import Caja from "../models/Caja.js";

const nuevaCaja = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const caja = new Caja(req.body);
  // gasto.creador = req.usuario._id;
  try {
    const cajaAlmacenada = await caja.save();
    res.json(cajaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const editarCaja = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const caja = await Caja.findById(id);

  console.log(caja);
  if (!caja) {
    const error = new Error("Caja no encontrada.");
    return res.status(404).json({ msg: error.message });
  }

  caja.nombre = req.body.nombre || caja.nombre;
  caja.inicioCaja = req.body.inicioCaja || caja.inicioCaja;

  try {
    const cajaAlmacenado = await caja.save();
    res.json(cajaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// Gasto individual. Escribir ID.
const obtenerCaja = async (req, res) => {
  const { id } = req.params;
  const caja = await Caja.findById(id);
  // const caja = await Caja.find((caja._id = "62cf04d320fdec269473e073"));

  if (!caja) {
    const error = new Error("Caja no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  res.json(caja);
};

export { nuevaCaja, editarCaja, obtenerCaja };
