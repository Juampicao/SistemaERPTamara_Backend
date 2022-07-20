import Gasto from "../models/Gasto.js";
import Usuario from "../models/Usuario.js";

// Traer todos los gastos. Postman /gastos.
const obtenerGastos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Solo los que creo el usuario
  const gastos = await Gasto.find().where("creador").equals(req.usuario);
  console.log(gastos);

  // Creando arrays por categoira.
  const arrayGastosComida = await Gasto.find()
    .where("categoria")
    .equals("Comida");
  // console.log(arrayGastosComida);

  const arrayGastosVarios = await Gasto.find()
    .where("categoria")
    .equals("Gastos");
  // console.log(arrayGastosVarios);

  const arrayGastosProveedor = await Gasto.find()
    .where("categoria")
    .equals("Proveedor");
  // console.log(arrayGastosProveedor);

  // Creando Arrays solo del valor.
  let arrayGastosComidaValores = [];
  let arrayGastosVariosValores = [];
  let arrayGastosProveedorValores = [];
  function crearArrayValores(oldArr, newArr) {
    for (let i = 0; i < oldArr.length; i++) {
      let result = oldArr[i].valor;
      newArr.push(result);
    }
  }
  crearArrayValores(arrayGastosComida, arrayGastosComidaValores);
  crearArrayValores(arrayGastosVarios, arrayGastosVariosValores);
  crearArrayValores(arrayGastosProveedor, arrayGastosProveedorValores);

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
  // let montoTotalGastos =
  //   arrayGastosComidaValores +
  //   arrayGastosVariosValores +
  //   arrayGastosProveedorValores;

  res.json({
    gastos,
    arrayGastosComida,
    arrayGastosVarios,
    arrayGastosProveedor,
    montoTotalGastosComida,
    montoTotalGastosVarios,
    montoTotalGastosProveedores,
    // montoTotalGastos,
  });

  // Todos los gastos creados por cualquiera
  // const gasto = await Gasto.find();
  // res.json(gasto);
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

const crearArraysValoresDeGastos = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const arrayGastosComida = await Gasto.find()
    .where("categoria")
    .equals("Comida");
  // res.json(arrayGastosComida);
  console.log(arrayGastosComida);
  // --- Funcion arrays nuevos y sumas dinamicas -----//
  // let arrayGastosComida = [];
  // let arrayGastosVarios = [];
  // let arrayGastosProveedor = [];

  // function crearArraysGastosSegmentados() {
  //   for (let i = 0; i < gastos.length; i++) {
  //     if (gastos[i].categoria === "Comida") {
  //       arrayGastosComida.push(gastos[i]);
  //     }
  //     if (gastos[i].categoria === "Gastos") {
  //       arrayGastosVarios.push(gastos[i]);
  //     }
  //     if (gastos[i].categoria === "Proveedor") {
  //       arrayGastosProveedor.push(gastos[i]);
  //     }
  //   }
  // }
  // crearArraysGastosSegmentados();
  // // console.log(arrayGastosComida, arrayGastosVarios, arrayGastosProveedor);

  // // 2) Crear Array con los valores de gastosComida.
  // let arrayGastosComidaValores = [];
  // let arrayGastosVariosValores = [];
  // let arrayGastosProveedorValores = [];
  // function crearArrayValores(oldArr, newArr) {
  //   for (let i = 0; i < oldArr.length; i++) {
  //     let result = oldArr[i].valor;
  //     newArr.push(result);
  //     // console.log(newArr);
  //   }
  // }
  // crearArrayValores(arrayGastosComida, arrayGastosComidaValores);
  // crearArrayValores(arrayGastosVarios, arrayGastosVariosValores);
  // crearArrayValores(arrayGastosProveedor, arrayGastosProveedorValores);

  // // 3) Funcion suma de arrays, dinamico.
  // function sumarNumerosArray(arr) {
  //   // arr && arr.length ? arr : [0, 0];
  //   const reducer = (accumulator, curr) => accumulator + curr;
  //   let resultado = arr.reduce(reducer);
  //   // console.log(resultado);
  //   return resultado;
  // }
};

export {
  obtenerGastos,
  nuevoGasto,
  obtenerGasto,
  editarGasto,
  eliminarGasto,
  crearArraysValoresDeGastos,
};
