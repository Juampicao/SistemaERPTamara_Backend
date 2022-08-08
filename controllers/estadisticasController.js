import Gasto from "../models/Gasto.js";
import Venta from "../models/Venta.js";
import Caja from "../models/Caja.js";
import Producto from "../models/Producto.js";
// import { sumarNumerosArray } from "../helpers/funciones.js";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

let HastaFechaPersonalizada = new Date();
let DesdeFechaPersonalizada;

DesdeFechaPersonalizada = new Date();
DesdeFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() - 1);

console.log(` DesdeFechaPersonalizada es: ${DesdeFechaPersonalizada}`);
console.log(` HastaFechaPersonalizadaes: ${HastaFechaPersonalizada}`);

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

  let montoTotalGastos = 0;
  if (obtenerMontoTotalGastos.length) {
    montoTotalGastos = obtenerMontoTotalGastos[0].valor;
  } else {
    montoTotalGastos = 0;
  }

  const obtenerMontoTotalVentas = await Venta.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Total de Ventas",
        valorTotal: { $sum: "$valorTotal" },
        gananciaBruta: { $sum: "$gananciaBruta" },
      },
    },
  ]);

  const nuevoArrVentas =
    obtenerMontoTotalVentas[Object.keys(obtenerMontoTotalVentas)[0]];

  let montoTotalVentas = 0;
  let UtilidadVenta = 0;

  if (obtenerMontoTotalVentas.length > 0) {
    montoTotalVentas = nuevoArrVentas.valorTotal;
    UtilidadVenta = nuevoArrVentas.gananciaBruta;
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

  let montoTotalVentasEfectivo = 0;
  if (obtenerMontoTotalVentasEfectivo.length) {
    montoTotalVentasEfectivo = obtenerMontoTotalVentasEfectivo[0].valor;
  }

  const obtenerMontoTotalCaja = await Caja.aggregate([
    { $match: { creador: req.usuario._id } },
    {
      $group: {
        _id: "Valor Inicial de Caja",
        inicioCaja: { $sum: "$inicioCaja" },
      },
    },
  ]);

  let valorInicialCaja = 0;
  if (obtenerMontoTotalCaja.length) {
    valorInicialCaja = obtenerMontoTotalCaja[0].inicioCaja;
  } else {
    valorInicialCaja = 0;
  }
  console.log(valorInicialCaja);

  const montoCajaActual =
    valorInicialCaja + montoTotalVentasEfectivo - montoTotalGastos;

  res.json({
    valorInicialCaja,
    montoTotalGastos,
    montoCajaActual,
    montoTotalVentas,
    UtilidadVenta,
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

const obtenerEstadisticasHoy = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  // Nueva Obtener Utilidad Hoy.

  const obtenerUtilidadVentasHoy = await Venta.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { fecha: { $gt: yesterday, $lt: today } },
        ],
      },
    },
    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$valorTotal" },
        gananciaBruta: { $sum: "$gananciaBruta" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  [{}];
  console.log(obtenerUtilidadVentasHoy);
  const nuevoArr =
    obtenerUtilidadVentasHoy[Object.keys(obtenerUtilidadVentasHoy)[0]];

  let UtilidadVentasHoy = 0;
  let montoTotalVentasHoy = 0;

  if (obtenerUtilidadVentasHoy.length > 0) {
    UtilidadVentasHoy = nuevoArr.gananciaBruta;
    montoTotalVentasHoy = nuevoArr.totalVentas;
  }

  // Ventas Efectivo Hoy
  const obtenerMontoTotalVentasEfectivoHoy = await Venta.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { metodoPago: "Efectivo" },
          { fecha: { $gt: yesterday, $lt: today } },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$valorTotal" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoTotalVentasEfectivoHoy = 0;
  if (obtenerMontoTotalVentasEfectivoHoy.length) {
    montoTotalVentasEfectivoHoy =
      obtenerMontoTotalVentasEfectivoHoy[0].totalVentas;
  } else {
    montoTotalVentasEfectivoHoy = 0;
  }

  // Gastos Hoy
  const obtenerGastosTotalVentas = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { fecha: { $gt: yesterday, $lt: today } },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$valor" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoTotalGastosHoy = 0;
  if (obtenerGastosTotalVentas.length) {
    montoTotalGastosHoy = obtenerGastosTotalVentas[0].totalVentas;
  } else {
    montoTotalGastosHoy = 0;
  }

  // Caja inicio Hoy
  const obtenerInicioCajaHoy = await Caja.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { fecha: { $gt: yesterday, $lt: today } },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$inicioCaja" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoInicioCajasHoy = 1;
  if (obtenerInicioCajaHoy.length) {
    montoInicioCajasHoy = obtenerInicioCajaHoy[0].totalVentas;
  } else {
    montoInicioCajasHoy = 1;
  }

  const montoCajaActualHoy =
    montoInicioCajasHoy + montoTotalVentasEfectivoHoy - montoTotalGastosHoy;

  res.json({
    montoTotalVentasHoy,
    montoTotalGastosHoy,
    montoInicioCajasHoy,
    montoTotalVentasEfectivoHoy,
    montoCajaActualHoy,
    UtilidadVentasHoy,
  });
};

const obtenerEstadisticasGeneralesPersonalizado = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  let HastaFechaPersonalizada = new Date(req.body.seleccionarFechaABuscar);
  DesdeFechaPersonalizada = new Date();
  DesdeFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() - 1);

  // Ventas Totales Personalizado
  const obtenerUtilidadVentasPersonalizada = await Venta.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$valorTotal" },
        gananciaBruta: { $sum: "$gananciaBruta" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  const nuevoArr =
    obtenerUtilidadVentasPersonalizada[
      Object.keys(obtenerUtilidadVentasPersonalizada)[0]
    ];

  let UtilidadVentasPersonalizado = 0;
  let montoTotalVentasPersonalizado = 0;

  if (obtenerUtilidadVentasPersonalizada.length > 0) {
    UtilidadVentasPersonalizado = nuevoArr.gananciaBruta;
    montoTotalVentasPersonalizado = nuevoArr.totalVentas;
  }

  // Ventas Efectivo Personalizado
  const obtenerMontoTotalVentasEfectivoPersonalizado = await Venta.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { metodoPago: "Efectivo" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentasEfectivo: { $sum: "$valorTotal" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoTotalVentasEfectivoPersonalizado = 0;
  if (obtenerMontoTotalVentasEfectivoPersonalizado.length) {
    montoTotalVentasEfectivoPersonalizado =
      obtenerMontoTotalVentasEfectivoPersonalizado[0].totalVentasEfectivo;
  } else {
    montoTotalVentasEfectivoPersonalizado = 0;
  }

  // Ventas Tarjeta Personalizado
  const obtenerMontoTotalVentasTarjetaPersonalizado = await Venta.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { metodoPago: "Tarjeta" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentasEfectivo: { $sum: "$valorTotal" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoTotalVentasTarjetaPersonalizado = 0;
  if (obtenerMontoTotalVentasTarjetaPersonalizado.length) {
    montoTotalVentasTarjetaPersonalizado =
      obtenerMontoTotalVentasTarjetaPersonalizado[0].totalVentasEfectivo;
  } else {
    montoTotalVentasTarjetaPersonalizado = 0;
  }

  // Gastos Personalizado
  const obtenerGastosTotalPersonalizado = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalGastos: { $sum: "$valor" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  let montoTotalGastosPersonalizado = 0;
  if (obtenerGastosTotalPersonalizado.length) {
    montoTotalGastosPersonalizado =
      obtenerGastosTotalPersonalizado[0].totalGastos;
  } else {
    montoTotalGastosPersonalizado = 0;
  }

  res.json({
    montoTotalVentasPersonalizado,
    UtilidadVentasPersonalizado,
    montoTotalVentasEfectivoPersonalizado,
    montoTotalVentasTarjetaPersonalizado,
    montoTotalGastosPersonalizado,
  });
};

const obtenerEstadisticasGastosPersonalizado = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  let HastaFechaPersonalizada = new Date(req.body.seleccionarFechaABuscar);
  HastaFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() + 1);
  DesdeFechaPersonalizada = new Date();
  DesdeFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() - 1);

  console.log(` DesdeFechaPersonalizada es: ${DesdeFechaPersonalizada}`);
  console.log(` HastaFechaPersonalizadaes: ${HastaFechaPersonalizada}`);

  // Gastos Proveedor Personalizado.
  const obtenerGastosProveedorPersonalizado = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { categoria: "Proveedor" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  let montoTotalGastosProveedoresPersonalizado = 0;
  if (obtenerGastosProveedorPersonalizado.length) {
    montoTotalGastosProveedoresPersonalizado =
      obtenerGastosProveedorPersonalizado[0].valor;
  } else {
    montoTotalGastosProveedoresPersonalizado = 0;
  }

  // Gastos Comida Personalizado.
  const obtenerGastosComidaPersonalizado = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { categoria: "Comida" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  let montoTotalGastosComidaPersonalizado = 0;
  if (obtenerGastosComidaPersonalizado.length) {
    montoTotalGastosComidaPersonalizado =
      obtenerGastosComidaPersonalizado[0].valor;
  } else {
    montoTotalGastosComidaPersonalizado = 0;
  }

  // Gastos Varios Personalizado.
  const obtenerGastosVariosPersonalizado = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { categoria: "Gastos" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  let montoTotalGastosVariosPersonalizado = 0;
  if (obtenerGastosVariosPersonalizado.length) {
    montoTotalGastosVariosPersonalizado =
      obtenerGastosVariosPersonalizado[0].valor;
  } else {
    montoTotalGastosVariosPersonalizado = 0;
  }

  // Gastos Inventario Personalizado.
  const obtenerGastosInventarioPersonalizado = await Gasto.aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { categoria: "Inventario" },
          {
            fecha: {
              $gt: DesdeFechaPersonalizada,
              $lt: HastaFechaPersonalizada,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$categoria",
        valor: { $sum: "$valor" },
      },
    },
  ]);

  let montoTotalGastosInventarioPersonalizado = 0;
  if (obtenerGastosInventarioPersonalizado.length) {
    montoTotalGastosInventarioPersonalizado =
      obtenerGastosInventarioPersonalizado[0].valor;
  } else {
    montoTotalGastosInventarioPersonalizado = 0;
  }

  console.log(
    `Desde GastosPersonalizado` + montoTotalGastosProveedoresPersonalizado,
    montoTotalGastosComidaPersonalizado,
    montoTotalGastosVariosPersonalizado,
    montoTotalGastosInventarioPersonalizado
  );

  res.json({
    montoTotalGastosProveedoresPersonalizado,
    montoTotalGastosComidaPersonalizado,
    montoTotalGastosVariosPersonalizado,
    montoTotalGastosInventarioPersonalizado,
  });
};

const obtenerEstadisticasInventario = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;

  // Ventas Hoy
  const obtenerCantidadProductosUnicos = await Producto.find().count();
  console.log(obtenerCantidadProductosUnicos);

  aggregate([
    {
      $match: {
        $and: [
          { creador: req.usuario._id },
          { fecha: { $gt: yesterday, $lt: today } },
        ],
      },
    },

    {
      $group: {
        _id: "",
        totalVentas: { $sum: "$valorTotal" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  let montoTotalProductosUnicos = 0;
  if (obtenerCantidadProductosUnicos.length) {
    montoTotalProductosUnicos = obtenerCantidadProductosUnicos[0].totalVentas;
  } else {
    montoTotalProductosUnicos = 0;
  }

  res.json({
    // montoTotalProductosUnicos,
    obtenerCantidadProductosUnicos,
  });
};

const obtenerEstadisticasMensualPersonalizado = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // const { id } = req.params;
  console.log("Desde el EstadisticasMensualPersonalizado");

  let HastaFechaPersonalizada = new Date(req.body.seleccionarFechaABuscar);
  DesdeFechaPersonalizada = new Date();
  DesdeFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() - 1);

  // console.log(` DesdeFechaPersonalizada es: ${DesdeFechaPersonalizada}`);
  // console.log(` HastaFechaPersonalizadaes: ${HastaFechaPersonalizada}`);

  // Ventas Mensual Personalizado
  const obtenerMontoTotalVentasEfectivoPorMes = await Venta.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }],
      },
    },
    {
      $group: {
        _id: {
          mes: { $month: "$fecha" },
        },
        totalVentasEfectivo: { $sum: "$valorTotal" },
      },
    },
  ]);
  console.log(obtenerMontoTotalVentasEfectivoPorMes);
  res.json({
    obtenerMontoTotalVentasEfectivoPorMes,
  });
};

export {
  obtenerEstadisticasGenerales,
  obtenerEstadisticasGastos,
  obtenerEstadisticasVentas,
  obtenerEstadisticasHoy,
  obtenerEstadisticasGeneralesPersonalizado,
  obtenerEstadisticasGastosPersonalizado,
  obtenerEstadisticasInventario,
  obtenerEstadisticasMensualPersonalizado,
};
