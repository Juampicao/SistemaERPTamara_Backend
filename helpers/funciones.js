// Formatear Fecha
export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

let date = new Date();
export let FechaHoyArgentina = date
  .toLocaleString("en-US", "America/Argentina/Buenos_Aires")
  .slice(0, 9);

// Paso 1 Crear Array.
export function crearArrayValores(oldArr, newArr) {
  for (let i = 0; i < oldArr.length; i++) {
    let result = oldArr[i].valor;
    newArr.push(result);
  }
}

// Paso 2 sumar los numeros del array.
export function sumarNumerosArray(arr) {
  let resultado;
  if (arr.length > 0) {
    const reducer = (accumulator, curr) => accumulator + curr;
    resultado = arr.reduce(reducer);
  } else {
    resultado = 0;
  }
  console.log(resultado);
  return resultado;
}

// export function sumarNumerosArray(oldArr, newArr) {
//   let resultado;
//   if (oldArr.length > 0) {
//     const reducer = (accumulator, curr) => accumulator + curr;
//     resultado = oldArr.reduce(reducer);
//     newArr.push(resultado);
//   } else {
//     resultado = 0;
//   }
//   return newArr;
// }

// Buscar por fecha

// let resultadoInformacionFinal = [];

export async function BuscarPorFechaReutilizable(
  guardarResultado,
  Modelo,
  fechaGt,
  fechaLt,
  usuario,
  propiedad
) {
  const resultado = await Modelo.find({
    createdAt: {
      $gt: fechaGt,
      $lt: fechaLt,
    },
  })
    .where("creador")
    .equals(usuario)
    .select(propiedad);

  const guardarVariable = await guardarResultado.push(resultado);
  console.log(guardarResultado);
  return resultado;
}

// BuscarPorFechaReutilizable(
//   resultadoInformacionFinal,
//   Gasto,
//   "2022-08-02T00:00:00.000Z",
//   "2022-08-04T00:00:00.000Z",
//   "62e91039b90478c52028fa50",
//   "valor"
// );

// setTimeout(() => {
//   console.log(resultadoInformacionFinal);
// }, 1500);
// console.log(resultadoInformacionFinal);

export default {
  formatearFecha,
  crearArrayValores,
  sumarNumerosArray,
  FechaHoyArgentina,
  BuscarPorFechaReutilizable,
};
