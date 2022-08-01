import Gasto from "../models/Gasto.js";
import Venta from "../models/Venta.js";
import Caja from "../models/Caja.js";

const obtenerEstadisticasGenerales = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  const obtenerMontoTotalGastos = await Gasto.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "Valor Total de Gastos",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastos = obtenerMontoTotalGastos[0].valor;

  const obtenerMontoTotalVentas = await Venta.aggregate([
    { $match: {} },
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
    { $match: { metodoPago: { $in: ["Efectivo"] } } },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  const montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;

  const obtenerMontoTotalCaja = await Caja.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "Valor Inicial de Caja",
        inicioCaja: { $sum: "$inicioCaja" },
      },
    },
  ]);
  const valorInicialCaja = obtenerMontoTotalCaja[0].inicioCaja;

  const montoCajaActual =
    obtenerMontoTotalCaja[0].inicioCaja +
    montoTotalVentasEfectivo -
    obtenerMontoTotalGastos[0].valor;

  res.json({
    valorInicialCaja,
    montoTotalGastos,
    montoCajaActual,
    montoTotalVentas,
  });
};

const obtenerEstadisticasGastos = async (req, res) => {
  const obtenerMontoTotalComida = await Gasto.aggregate([
    { $match: { categoria: { $in: ["Comida"] } } },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastosComida = obtenerMontoTotalComida[0].valor;

  const obtenerMontoTotalGastosProveedores = await Gasto.aggregate([
    { $match: { categoria: { $in: ["Proveedor"] } } },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastosProveedores =
    obtenerMontoTotalGastosProveedores[0].valor;

  const obtenerMontoTotalGastosVarios = await Gasto.aggregate([
    { $match: { categoria: { $in: ["Gastos"] } } },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastosVarios = obtenerMontoTotalGastosVarios[0].valor;

  const obtenerMontoTotalGastosInventario = await Gasto.aggregate([
    { $match: { categoria: { $in: ["Inventario"] } } },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);
  const montoTotalGastosInventario = 0;
  // obtenerMontoTotalGastosInventario[0].valor;

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
    { $match: {} },
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
    { $match: { metodoPago: { $in: ["Efectivo"] } } },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  const montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;

  // Ventas Tarjeta
  const obtenerMontoTotalVentasTarjeta = await Venta.aggregate([
    { $match: { metodoPago: { $in: ["Tarjeta"] } } },
    {
      $group: {
        _id: "$metodoPago",
        valor: { $sum: "$valorTotal" },
      },
    },
  ]);
  const montoTotalVentasTarjeta = obtenerMontoTotalVentasTarjeta[0].valor;

  res.json({
    montoTotalVentas,
    montoTotalVentasTarjeta,
    montoTotalVentasEfectivo,
  });
};

export {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
};
