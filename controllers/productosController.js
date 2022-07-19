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
  const producto = await Producto.findById(id);
  res.json(producto);

  // if (!producto) {
  //   const error = new Error("No Encontrado");
  //   return res.status(404).json({ msg: error.message });
  // }

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

  producto.nombreProducto = req.body.nombreProducto || producto.nombreProducto;
  producto.precio = req.body.precio || producto.precio;
  producto.costo = req.body.costo || producto.costo;
  producto.cantidad = req.body.cantidad || producto.cantidad;

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

// Solo cambia la cantidad en stock del producto en una venta.
const editarCantidadProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);

  console.log("Editando la cantidad...");
  res.json("Editando la qqqq...");

  // if (!producto) {
  //   const error = new Error("producto No Encontrado");
  //   return res.status(404).json({ msg: error.message });
  // }

  // // producto.cantidad - restarStock;
  // producto.cantidad = req.body.cantidad || producto.cantidad;

  // try {
  //   const productoAlmacenado = await producto.save();
  //   res.json(productoAlmacenado);
  // } catch (error) {
  //   console.log(error);
  // }
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
  editarCantidadProducto,
  nuevoProducto,
};
