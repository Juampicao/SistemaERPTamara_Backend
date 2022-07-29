import Venta from "../models/Venta.js";
import Usuario from "../models/Usuario.js";
import Producto from "../models/Producto.js";
import { crearArrayValores, sumarNumerosArray } from "../helpers/funciones.js";


const obtenerVentas = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Solo los que creo el usuario
  const arrayTotalVentas = await Venta.find()
    .where("creador")
    .equals(req.usuario);

  // 1) Creando arrays por categoira.
  const arrayVentasEfectivo = await Venta.find()
    .where("metodoPago")
    .equals("Efectivo");
  // console.log(arrayVentasEfectivo);

  // 2) Creo arrayValores
  let arrayVentasEfectivoValores = [];
  function crearArrayValores(oldArr, newArr) {
    for (let i = 0; i < oldArr.length; i++) {
      let result = oldArr[i].valorTotal;
      newArr.push(result);
    }
  }
  crearArrayValores(arrayVentasEfectivo, arrayVentasEfectivoValores);
  // console.log(arrayVentasEfectivoValores);

  // 3) sumo los valores
  let montoTotalVentasEfectivo = sumarNumerosArray(arrayVentasEfectivoValores);
  // console.log(montoTotalVentasEfectivo);

     const montoTotalVentasEfectivoNuevo = await Venta.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "Valor Total de Ventas",
        valorTotal: { $sum: "$valorTotal" },
      },
    },
     ]); 
  // console.log(montoTotalVentasEfectivoNuevo)

  //4 Respuesta Json
  res.json({
    arrayTotalVentas,
    arrayVentasEfectivo,
    montoTotalVentasEfectivo,
    montoTotalVentasEfectivoNuevo,
  });
};

const nuevaVenta = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const venta = new Venta(req.body);

  try {
    const ventAlmacenada = await venta.save();

    // console.log(ventAlmacenada);
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
  // .populate("productoVendido");
  res.json(venta);
  console.log(venta);
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

const obtenerEstadisticasVenta = async (req, res) => {

  const cantidadVendidaPorProducto = await Venta.aggregate([
    { $match: {} },
    { $group: { _id: "$producto", valorIndividual: { $sum: "$valorTotal" } } },
  ]);
  
  const ventasUnicas = await Venta.count();

  const cantidadesVendidas = await Venta.aggregate([
      {
        $group:
          { _id: "$producto", cantidad: { $sum: 1 } }
      },
  ]);
  

  console.log("ventas")
  // console.log(cantidadVendidaPorProducto, ventasUnicas, cantidadesVendidas)
  res.json({cantidadVendidaPorProducto, ventasUnicas, cantidadesVendidas})
}

export { obtenerVentas, nuevaVenta, obtenerVenta, editarVenta, eliminarVenta,obtenerEstadisticasVenta };
