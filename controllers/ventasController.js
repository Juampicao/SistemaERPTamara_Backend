import Venta from "../models/Venta.js";
import Usuario from "../models/Usuario.js";

// Traer todos los gastos. Postman /gastos.
const obtenerVentas = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Solo los que creo el usuario
  const ventas = await Venta.find().where("creador").equals(req.usuario);
  res.json(ventas);

  // Todos los gastos creados por cualquiera
  // const gasto = await Gasto.find();
  // res.json(gasto);
};

const nuevaVenta = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const venta = new Venta(req.body);
  // gasto.creador = req.usuario._id;
  try {
    const ventAlmacenada = await venta.save();
    console.log(ventAlmacenada);
    console.log("Venta creada con exito");
    res.json(ventAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

// Gasto individual. Escribir ID.
const obtenerVenta = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const venta = await Venta.findById(id);
  res.json(venta);

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

// Si cambio solo uno, lo demas sigue igual. Solo edita quien lo creo.
const editarVenta = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findById(id);

  if (!venta) {
    const error = new Error("Venta No Encontrada");
    return res.status(404).json({ msg: error.message });
  }

  venta.producto = req.body.producto || venta.producto;
  venta.cantidad = req.body.cantidad || venta.cantidad;
  venta.valorIndividual = req.body.valorIndividual || venta.valorIndividual;
  venta.valorTotal = req.body.valorTotal || venta.valorTotal;
  venta.metodoPago = req.body.metodoPago || venta.metodoPago;
  venta.categoria = req.body.categoria || venta.categoria;
  venta.fecha = req.body.fecha || venta.fecha;
  venta.notas = req.body.notas || venta.notas;

  try {
    const ventAlmacenada = await venta.save();
    res.json(ventAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarVenta = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findById(id);

  if (!venta) {
    const error = new Error("Ninguna Venta se ha encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Accion no valida");
  //   return res.status(401).json({ msg: error.message });
  // }

  try {
    await venta.deleteOne();
    res.json({ msg: "Venta Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export { obtenerVentas, nuevaVenta, obtenerVenta, editarVenta, eliminarVenta };
