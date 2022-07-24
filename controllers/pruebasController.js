import Prueba from "../models/Prueba.js";
import Usuario from "../models/Usuario.js";

// Traer todos los pruebas. Postman /pruebas.
const obtenerPruebas = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const pruebas = await Prueba.find().where("creador").equals(req.usuario);
  res.json(pruebas);
};

const nuevaPrueba = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const prueba = new Prueba(req.body);
  // prueba.creador = req.usuario._id;
  try {
    const pruebaAlmacenado = await prueba.save();
    console.log(pruebaAlmacenado);
    res.json(pruebaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// prueba individual. Escribir ID.
const obtenerPrueba = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const prueba = await Prueba.findById(id);
  res.json(prueba);

  if (!prueba) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // {
  //   const error = new Error("Acción No Válida");
  //   return res.status(401).json({ msg: error.message });
  // }
  // res.json(prueba);
};

const editarPrueba = async (req, res) => {
  const { id } = req.params;
  const prueba = await Prueba.findById(id);

  if (!prueba) {
    const error = new Error("prueba No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  prueba.cantidad = editarStock({
    cantidadOriginal: prueba.cantidad,
    accion: req.body.accionstock,
    unidadesVendida: req.body.cantidad,
  });

  prueba.nombreProducto = req.body.nombreProducto || prueba.nombreProducto;
  prueba.precio = req.body.precio || prueba.precio;
  prueba.costo = req.body.costo || prueba.costo;

  prueba.categoria = req.body.categoria || prueba.categoria;
  prueba.fecha = req.body.fecha || prueba.fecha;
  prueba.notas = req.body.notas || prueba.notas;

  try {
    const pruebaAlmacenado = await prueba.save();
    res.json(pruebaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const editarStock = ({ cantidadOriginal, accion, unidadesVendida }) => {
  console.log(cantidadOriginal, accion, unidadesVendida);
  let nuevaCantidad = 0;
  console.log(nuevaCantidad);

  switch (accion) {
    case (accion = "aumentar"):
      console.log("Aumentar");
      nuevaCantidad = cantidadOriginal + unidadesVendida;
      break;
    case (accion = "disminuir"):
      console.log("Disminuir");
      nuevaCantidad = cantidadOriginal - unidadesVendida;
      break;
    default:
      nuevaCantidad = unidadesVendida || cantidadOriginal;
      break;
  }
  return nuevaCantidad;
};

const eliminarPrueba = async (req, res) => {
  const { id } = req.params;
  const prueba = await Prueba.findById(id);

  if (!prueba) {
    const error = new Error("Ningun prueba se ha encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Accion no valida");
  //   return res.status(401).json({ msg: error.message });
  // }

  try {
    await prueba.deleteOne();
    res.json({ msg: "prueba Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerPruebas,
  obtenerPrueba,
  eliminarPrueba,
  editarPrueba,
  nuevaPrueba,
};
