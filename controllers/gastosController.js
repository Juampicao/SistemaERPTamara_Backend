import Gasto from "../models/Gasto.js";
import Usuario from "../models/Usuario.js";

// Traer todos los gastos. Postman /gastos.
const obtenerGastos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Solo los que creo el usuario
  const gastos = await Gasto.find().where("creador").equals(req.usuario);
  res.json(gastos);

  // Todos los gastos creados por cualquiera
  // const gasto = await Gasto.find();
  // res.json(gasto);
};

const nuevoGasto = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const gasto = new Gasto(req.body);
  // gasto.creador = req.usuario._id;
  try {
    const gastoAlmacenado = await gasto.save();
    console.log(gastoAlmacenado);
    res.json(gastoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// Gasto individual. Escribir ID.
const obtenerGasto = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const gasto = await Gasto.findById(id);
  res.json(gasto);

  // if (!gasto) {
  //   const error = new Error("No Encontrado");
  //   return res.status(404).json({ msg: error.message });
  // }

  // {
  //   const error = new Error("Acción No Válida");
  //   return res.status(401).json({ msg: error.message });
  // }
  // res.json(gasto);
};

// // Si cambio solo uno, lo demas sigue igual. Solo edita quien lo creo.
const editarGasto = async (req, res) => {
  const { id } = req.params;
  const gasto = await Gasto.findById(id);

  if (!gasto) {
    const error = new Error("Gasto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  gasto.nombre = req.body.nombre || gasto.nombre;
  gasto.valor = req.body.valor || gasto.valor;
  gasto.categoria = req.body.categoria || gasto.categoria;
  gasto.fecha = req.body.fecha || gasto.fecha;

  try {
    const gastoAlmacenado = await gasto.save();
    res.json(gastoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarGasto = async (req, res) => {
  const { id } = req.params;
  const gasto = await Gasto.findById(id);

  if (!gasto) {
    const error = new Error("Ningun Gasto se ha encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Accion no valida");
  //   return res.status(401).json({ msg: error.message });
  // }

  try {
    await gasto.deleteOne();
    res.json({ msg: "Gasto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

// const agregarColaborador = async (req, res) => {};

// const eliminarColaborador = async (req, res) => {};

export {
  obtenerGastos,
  nuevoGasto,
  obtenerGasto,
  editarGasto,
  eliminarGasto,
  //   eliminarProyecto,
  //   agregarColaborador,
};
