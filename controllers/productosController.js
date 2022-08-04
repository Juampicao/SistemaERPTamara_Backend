import Producto from "../models/Producto.js";
import Usuario from "../models/Usuario.js";
import Venta from "../models/Venta.js";

const obtenerProductos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const productos = await Producto.find().where("creador").equals(req.usuario);
  res.json(productos);
};

const nuevoProducto = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  const producto = new Producto(req.body);
  producto.creador = req.usuario._id;
  try {
    const productoAlmacenado = await producto.save();
    console.log(productoAlmacenado);
    console.log(`El producto fue creado por: ${req.usuario.nombre}`);
    res.json(productoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const producto = await Producto.findById(id);
  res.json(producto);

  if (!producto) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // {
  //   const error = new Error("Acción No Válida");
  //   return res.status(401).json({ msg: error.message });
  // }
  // res.json(producto);
};

const editarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  console.log(producto);

  if (!producto) {
    const error = new Error("producto No Encontrado");
    console.log("Producto No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  producto.cantidad = req.body.cantidad || producto.cantidad;
  producto.nombreProducto = req.body.nombreProducto || producto.nombreProducto;
  producto.precio = req.body.precio || producto.precio;
  producto.costo = req.body.costo || producto.costo;

  producto.categoria = req.body.categoria || producto.categoria;
  producto.fecha = req.body.fecha || producto.fecha;
  producto.descripcion = req.body.descripcion || producto.descripcion;

  producto.creador = req.body.creador || producto.creador;

  try {
    const productoAlmacenado = await producto.save();
    res.json(productoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  if (!producto) {
    const error = new Error("Ningun producto se ha encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Accion no valida");
  //   return res.status(401).json({ msg: error.message });
  // }

  try {
    await producto.deleteOne();
    res.json({ msg: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerEstadisticas = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");

  const productosUnicos = await Producto.count();

  const productoMayorPrecio = await Producto.find()
    .sort({ precio: -1 })
    .limit(1);

  const productoMayorCantidad = await Producto.find()
    .sort({ cantidad: -1 })
    .limit(1);

  // res.json(productosUnicos);

  console.log(productosUnicos, productoMayorPrecio, productoMayorCantidad);
};

export {
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto,
  nuevoProducto,
  obtenerEstadisticas,
};

// const editarStock = ({ cantidadOriginal, accion, unidadesVendida }) => {
//   console.log(cantidadOriginal, accion, unidadesVendida);
//   let nuevaCantidad = 0;
//   console.log(nuevaCantidad);

//   switch (accion) {
//     case (accion = "aumentar"):
//       console.log("Aumentar");
//       nuevaCantidad = cantidadOriginal + unidadesVendida;
//       break;
//     case (accion = "disminuir"):
//       console.log("Disminuir");
//       nuevaCantidad = cantidadOriginal - unidadesVendida;
//       break;
//     default:
//       nuevaCantidad = unidadesVendida || cantidadOriginal;
//       break;
//   }
//   return nuevaCantidad;
// };
