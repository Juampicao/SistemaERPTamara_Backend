import { FechaHoyArgentina, formatearFecha } from "../helpers/funciones.js";
import Gasto from "../models/Gasto.js";
import Producto from "../models/Producto.js";
import Usuario from "../models/Usuario.js";

const obtenerEstadisticasGastos = async (req, res) => {
  // const buscarPorFecha = await Gasto.find({ "$fecha": "2022-06-27T15:00:00.000Z" });
  // console.log(buscarPorFecha)
  // const prueba = await Gasto.find({ createdAt: { $gte: "2022-07-27T15:00:00.000Z"} } ); // Solo Mayor al 27/7.
  // console.log(prueba)
  // const buscarPorFecha = await Gasto.find({
  //   createdAt: {
  //     $gt: "2022-07-27T00:00:00.000Z",
  //     $lt: "2022-07-28T00:00:00.000Z",
  //   },
  // })
  //   .where("categoria")
  //   .equals("Comida"); // Entre el 27 y 28, Categoria = Comida.
  // console.log(buscarPorFecha);
  // let diaHoy = "2022-07-27T00:00:00.000Z";
  // const obtenerValoresUnicos = await Gasto.aggregate([
  //   { $match: {} },
  //   {
  //     $group: {
  //       _id: "Valor Total de Gastos",
  //       valor: { $sum: "$valor" },
  //     },
  //   },
  // ]);
  // console.log(obtenerValoresUnicos);
  // res.json({buscarPorFecha})
  // const prueba = await Gasto.find({ createdAt: { lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) } })
  // console.log(prueba)
};

const obtenerGastos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const gastos = await Gasto.find().where("creador").equals(req.usuario);

  // Invocar Funciones Extenrnas.
  obtenerEstadisticasGastos();

  const obtenerValoresUnicos = await Gasto.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  // Creando arrays por categoira.
  const arrayGastosComida = await Gasto.find()
    .where("categoria")
    .equals("Comida");

  const arrayGastosVarios = await Gasto.find()
    .where("categoria")
    .equals("Gastos");

  const arrayGastosProveedor = await Gasto.find()
    .where("categoria")
    .equals("Proveedor");

  const arrayGastosInventario = await Gasto.find()
    .where("categoria")
    .equals("Inventario");

  res.json({
    gastos,
  });
};

const nuevoGasto = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const gasto = new Gasto(req.body);

  if (gasto.productoIngresado) {
    const producto = await Producto.findById(gasto.productoIngresado);
    const actualizarCantidadProducto = await Producto.findByIdAndUpdate(
      {
        _id: gasto.productoIngresado,
      },
      {
        cantidad: producto.cantidad + gasto.cantidadProductoIngresado,
      }
    );
  }

  try {
    const gastoAlmacenado = await gasto.save();
    console.log(gastoAlmacenado);
    res.json(gastoAlmacenado);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Gasto individual. Escribir ID.
const obtenerGasto = async (req, res) => {
  const { id } = req.params;
  const gasto = await Gasto.findById(id).populate("productoIngresado");
  res.json(gasto);
  console.log(gasto);
  if (!gasto) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
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
  gasto.notas = req.body.notas || gasto.notas;

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
  console.log(gasto);

  if (gasto.productoIngresado) {
    const producto = await Producto.findById(gasto.productoIngresado);
    if (producto) {
      const productoActualizado = await Producto.findOneAndUpdate(
        {
          _id: gasto.productoIngresado,
        },
        { cantidad: producto.cantidad - gasto.cantidadProductoIngresado }
      );
    }
  }

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

export {
  obtenerGastos,
  nuevoGasto,
  obtenerGasto,
  editarGasto,
  eliminarGasto,
  obtenerEstadisticasGastos,
};
