import Producto from "../models/Producto.js";
import Usuario from "../models/Usuario.js";

// Traer todos los productos. Postman /productos.
const obtenerProductos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const productos = await Producto.find().where("creador").equals(req.usuario);
  res.json(productos);
};

const nuevoProducto = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const producto = new Producto(req.body);
  // producto.creador = req.usuario._id;
  try {
    const productoAlmacenado = await producto.save();
    console.log(productoAlmacenado);
    res.json(productoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// producto individual. Escribir ID.
const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // {
  //   const error = new Error("Acción No Válida");
  //   return res.status(401).json({ msg: error.message });
  // }
  // res.json(producto);
};

// Si cambio solo uno, lo demas sigue igual. Solo edita quien lo creo.
const editarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  if (!producto) {
    const error = new Error("producto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  producto.cantidad = editarStock({
    cantidadOriginal: producto.cantidad,
    accion: req.body.accionstock,
    unidadesVendida: req.body.cantidad,
  });

  producto.nombreProducto = req.body.nombreProducto || producto.nombreProducto;
  producto.precio = req.body.precio || producto.precio;
  producto.costo = req.body.costo || producto.costo;

  producto.categoria = req.body.categoria || producto.categoria;
  producto.fecha = req.body.fecha || producto.fecha;
  producto.notas = req.body.notas || producto.notas;

  try {
    const productoAlmacenado = await producto.save();
    res.json(productoAlmacenado);
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

export {
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto,
  nuevoProducto,
  editarStock,
};

// switch (req.body.accionstock) {
//   case (req.body.accionstock = "aumentar"):
//     console.log("Aumentar");
//     producto.cantidad = producto.cantidad + req.body.cantidad;
//     break;
//   case (req.body.accionstock = "disminuir"):
//     console.log("Disminuir");
//     console.log(`${producto.cantidad} - ${req.body.cantidad}`);
//     producto.cantidad = producto.cantidad - req.body.cantidad;
//     break;
//   default:
//     producto.cantidad = req.body.cantidad || producto.cantidad;
//     break;
// }

// const editarStock = ({ cantidad, accion, unidades }) => {
//   console.log(cantidad, accion, unidades);
//   let nuevaCantidad = 0;
//   console.log(nuevaCantidad);

//   switch (accion) {
//     case (accion = "aumentar"):
//       console.log("Aumentar");
//       nuevaCantidad = cantidad + unidades;
//       break;
//     case (accion = "disminuir"):
//       console.log("Disminuir");
//       nuevaCantidad = cantidad - unidades;
//       break;
//     default:
//       nuevaCantidad = unidades;
//       break;
//   }
//   return nuevaCantidad;
// };

// // Si cambio solo uno, lo demas sigue igual. Solo edita quien lo creo.
// const editarProducto = async (req, res) => {
//   const { id } = req.params;
//   const producto = await Producto.findById(id);

//   if (!producto) {
//     const error = new Error("producto No Encontrado");
//     return res.status(404).json({ msg: error.message });
//   }

//   // switch (req.body.accionstock) {
//   //   case (req.body.accionstock = "aumentar"):
//   //     console.log("Aumentar");
//   //     producto.cantidad = producto.cantidad + req.body.cantidad;
//   //     break;
//   //   case (req.body.accionstock = "disminuir"):
//   //     console.log("Disminuir");
//   //     console.log(`${producto.cantidad} - ${req.body.cantidad}`);
//   //     producto.cantidad = producto.cantidad - req.body.cantidad;
//   //     break;
//   //   default:
//   //     producto.cantidad = req.body.cantidad || producto.cantidad;
//   //     break;
//   // }

//   producto.cantidad = editarStock({
//     cantidad: producto.cantidad,
//     accion: req.body.accionstock,
//     unidades: req.body.cantidad,
//   });

//   producto.nombreProducto = req.body.nombreProducto || producto.nombreProducto;
//   producto.precio = req.body.precio || producto.precio;
//   producto.costo = req.body.costo || producto.costo;

//   producto.categoria = req.body.categoria || producto.categoria;
//   producto.fecha = req.body.fecha || producto.fecha;
//   producto.notas = req.body.notas || producto.notas;

//   try {
//     const productoAlmacenado = await producto.save();
//     res.json(productoAlmacenado);
//   } catch (error) {
//     console.log(error);
//   }
// };
