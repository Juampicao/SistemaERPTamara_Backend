import Gasto from "../models/Gasto.js";
import Venta from "../models/Venta.js";
import Caja from "../models/Caja.js";
// import { sumarNumerosArray } from "../helpers/funciones.js";

const obtenerEstadisticasGenerales = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  const obtenerMontoTotalGastos = await Gasto.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Total de Gastos",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastos = obtenerMontoTotalGastos[0].valor;

  const obtenerMontoTotalVentas = await Venta.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Total de Ventas",
        valorTotal: { $sum: "$valorTotal" },
      },
    },
  ]);
  const montoTotalVentas = obtenerMontoTotalVentas[0].valorTotal;

  // Ventas Efectivo
  const obtenerMontoTotalVentasEfectivo = await Venta.aggregate([
    // { $match: { metodoPago: { $in: ["Efectivo"] } } },
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { metodoPago: "Efectivo" }],
      },
    },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  const montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;

  const obtenerMontoTotalCaja = await Caja.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Inicial de Caja",
        inicioCaja: { $sum: "$inicioCaja" },
      },
    },
  ]);

  // const valorInicialCaja = obtenerMontoTotalCaja[0].inicioCaja;

  let valorInicialCaja = 0;
  if (obtenerMontoTotalCaja.length) {
    valorInicialCaja = obtenerMontoTotalCaja[0].inicioCaja;
  } else {
    valorInicialCaja = 0;
  }

  const montoCajaActual =
    valorInicialCaja + montoTotalVentasEfectivo - montoTotalGastos;

  res.json({
    valorInicialCaja,
    montoTotalGastos,
    montoCajaActual,
    montoTotalVentas,
  });
};

const obtenerEstadisticasGastos = async (req, res) => {
  // Gastos Comida
  const obtenerMontoTotalComida = await Gasto.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { categoria: "Comida" }],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  // const montoTotalGastosComida = obtenerMontoTotalComida[0].valor;

  let montoTotalGastosComida = 0;
  if (obtenerMontoTotalComida.length) {
    montoTotalGastosComida = obtenerMontoTotalComida[0].valor;
  } else {
    montoTotalGastosComida = 0;
  }

  // Gastos Proveedor
  const obtenerMontoTotalGastosProveedores = await Gasto.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { categoria: "Proveedor" }],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  let montoTotalGastosProveedores = 0;
  if (obtenerMontoTotalGastosProveedores.length) {
    montoTotalGastosProveedores = obtenerMontoTotalGastosProveedores[0].valor;
  } else {
    montoTotalGastosProveedores = 0;
  }

  // Gastos Varios
  const obtenerMontoTotalGastosVarios = await Gasto.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { categoria: "Gastos" }],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  // const montoTotalGastosVarios = obtenerMontoTotalGastosVarios[0].valor;
  let montoTotalGastosVarios = 0;
  if (obtenerMontoTotalGastosVarios.length) {
    montoTotalGastosVarios = obtenerMontoTotalGastosVarios[0].valor;
  } else {
    montoTotalGastosVarios = 0;
  }

  // Gastos Inventario
  const obtenerMontoTotalGastosInventario = await Gasto.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { categoria: "Inventario" }],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  // const montoTotalGastosInventario = 0;
  // obtenerMontoTotalGastosInventario[0].valor;

  let montoTotalGastosInventario = 0;
  if (obtenerMontoTotalGastosInventario.length) {
    montoTotalGastosInventario = obtenerMontoTotalGastosInventario[0].valor;
  } else {
    montoTotalGastosInventario = 0;
  }

  res.json({
    montoTotalGastosProveedores,
    montoTotalGastosVarios,
    montoTotalGastosComida,
    montoTotalGastosInventario,
  });
};

const obtenerEstadisticasVentas = async (req, res) => {
  // Monto Total Ventas
  const obtenerMontoTotalVentas = await Venta.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Total de Ventas",
        valorTotal: { $sum: "$valorTotal" },
      },
    },
  ]);
  // const montoTotalVentas = obtenerMontoTotalVentas[0].valorTotal;

  let montoTotalVentas = 0;
  if (obtenerMontoTotalVentas.length) {
    montoTotalVentas = obtenerMontoTotalVentas[0].valorTotal;
  } else {
    montoTotalVentas = 0;
  }

  // Ventas Efectivo
  const obtenerMontoTotalVentasEfectivo = await Venta.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { metodoPago: "Efectivo" }],
      },
    },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  // const montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;

  let montoTotalVentasEfectivo = 0;
  if (obtenerMontoTotalVentasEfectivo.length) {
    montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;
  } else {
    montoTotalVentasEfectivo = 0;
  }
  // Ventas Tarjeta
  const obtenerMontoTotalVentasTarjeta = await Venta.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }, { metodoPago: "Tarjeta" }],
      },
    },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  // const montoTotalVentasTarjeta = obtenerMontoTotalVentasTarjeta[0].valor;

  let montoTotalVentasTarjeta = 0;
  if (obtenerMontoTotalVentasTarjeta.length) {
    montoTotalVentasTarjeta = obtenerMontoTotalVentasTarjeta[0].valor;
  } else {
    montoTotalVentasTarjeta = 0;
  }

  res.json({
    montoTotalVentas,
    montoTotalVentasTarjeta,
    montoTotalVentasEfectivo,
  });
};

const obtenerEstadisticasPorFecha = async (req, res) => {
  // 1 Buscar por fecha
  // const buscarPorFechaActual = await Gasto.find({
  //   createdAt: {
  //     $gt: "2022-08-02T00:00:00.000Z",
  //     $lt: "2022-08-04T00:00:00.000Z",
  //   },
  // })
  //   .where("creador")
  //   .equals(req.usuario._id)
  //   .select("valor");
  // console.log(buscarPorFechaActual);
  // let resultadoInformacionFinal = [];
  // let resultadoFlat;
  // async function BuscarPorFechaReutilizable(
  //   guardarResultado,
  //   Modelo,
  //   fechaGt,
  //   fechaLt,
  //   usuario,
  //   propiedad
  // ) {
  //   const resultado = await Modelo.find({
  //     createdAt: {
  //       $gt: fechaGt,
  //       $lt: fechaLt,
  //     },
  //   })
  //     .where("creador")
  //     .equals(usuario)
  //     .select(propiedad);
  //   const guardarVariable = await guardarResultado.push(resultado);
  //   return resultado;
  // }
  // BuscarPorFechaReutilizable(
  //   resultadoInformacionFinal,
  //   Gasto,
  //   "2022-08-02T00:00:00.000Z",
  //   "2022-08-04T00:00:00.000Z",
  //   req.usuario._id,
  //   "valor"
  // );
  // const primerPasoCrearResultadoFlat = setTimeout(() => {
  //   resultadoFlat = resultadoInformacionFinal.flat(Infinity);
  //   console.log("1° Paso");
  //   console.log(resultadoFlat);
  // }, 1000);
  // // // 2 Crear Array con valores de las fechas.
  // let arrCurrentDate = [];
  // function crearArrayValores(oldArr, newArr) {
  //   for (let i = 0; i < oldArr.length; i++) {
  //     let result = oldArr[i].valor;
  //     newArr.push(result);
  //   }
  //   console.log(newArr);
  // }
  // const segundoPaso = setTimeout(() => {
  //   console.log("Paso 2°:");
  //   crearArrayValores(resultadoFlat, arrCurrentDate);
  // }, 1000);
  // // // Paso 3 sumar los valores del array.
  // let valoresCurrentDate = [];
  // function sumarNumerosArray(arr, guardarResultado) {
  //   let resultado;
  //   if (arr.length > 0) {
  //     const reducer = (accumulator, curr) => accumulator + curr;
  //     resultado = arr.reduce(reducer);
  //   } else {
  //     resultado = 0;
  //   }
  //   // console.log(resultado);
  //   guardarResultado.push(resultado);
  //   return resultado;
  // }
  // const tercerPaso = function () {
  //   sumarNumerosArray(arrCurrentDate, valoresCurrentDate);
  //   console.log(valoresCurrentDate[0]);
  // };
  // setTimeout(() => {
  //   tercerPaso();
  // }, 1000);
  // let montoTotalHoy = valoresCurrentDate[0];
  // console.log(montoTotalHoy);
  // setTimeout(() => {
  //   res.json({
  //     montoTotalHoy,
  //   });
  // }, 1500);
};

export {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
  obtenerEstadisticasPorFecha,
};
