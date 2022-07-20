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

// export default formatearFecha(DiaActual);
let DiaHoy = new Date();
export let DiaActual = DiaHoy.toISOString().substring(0, 10);

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
  return resultado;
}

console.log(DiaActual);
export default {
  DiaActual,
  formatearFecha,
  crearArrayValores,
  sumarNumerosArray,
};
