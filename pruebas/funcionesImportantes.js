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
