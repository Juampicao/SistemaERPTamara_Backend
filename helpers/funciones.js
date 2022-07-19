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

console.log(DiaActual);
export default {
  DiaActual,
  formatearFecha,
};
