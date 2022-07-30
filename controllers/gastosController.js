import { FechaHoyArgentina, formatearFecha } from "../helpers/funciones.js";
import Gasto from "../models/Gasto.js";
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

  // Creando Arrays solo del valor.
  let arrayGastosComidaValores = [];
  let arrayGastosVariosValores = [];
  let arrayGastosProveedorValores = [];
  let arrayGastosInventarioValores = [];

  function crearArrayValores(oldArr, newArr) {
    for (let i = 0; i < oldArr.length; i++) {
      let result = oldArr[i].valor;
      newArr.push(result);
    }
  }
  crearArrayValores(arrayGastosComida, arrayGastosComidaValores);
  crearArrayValores(arrayGastosVarios, arrayGastosVariosValores);
  crearArrayValores(arrayGastosProveedor, arrayGastosProveedorValores);
  crearArrayValores(arrayGastosInventario, arrayGastosInventarioValores);

  // 3) Sumo los valores
  function sumarNumerosArray(arr) {
    let resultado;
    if (arr.length > 0) {
      const reducer = (accumulator, curr) => accumulator + curr;
      resultado = arr.reduce(reducer);
    } else {
      resultado = 0;
    }
    return resultado;
  }
  let montoTotalGastosComida = sumarNumerosArray(arrayGastosComidaValores);
  let montoTotalGastosVarios = sumarNumerosArray(arrayGastosVariosValores);
  let montoTotalGastosProveedores = sumarNumerosArray(
    arrayGastosProveedorValores
  );
  let montoTotalGastosInventario = sumarNumerosArray(
    arrayGastosInventarioValores
  );

  let montoTotalGastos =
    arrayGastosComidaValores +
    arrayGastosVariosValores +
    arrayGastosProveedorValores +
    arrayGastosInventarioValores;

  let sumaMontoTotalGastos =
    montoTotalGastosComida +
    montoTotalGastosVarios +
    montoTotalGastosProveedores +
    montoTotalGastosInventario;

  // console.log(pruebaSuma)

  res.json({
    gastos,
    arrayGastosComida,
    arrayGastosVarios,
    arrayGastosProveedor,
    arrayGastosInventario,
    montoTotalGastosComida,
    montoTotalGastosVarios,
    montoTotalGastosProveedores,
    montoTotalGastosInventario,
    montoTotalGastos,
    obtenerValoresUnicos,
    // obtenerValoresUnicosHoy,
    sumaMontoTotalGastos,
  });
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
  // .populate("productoVendido");
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
