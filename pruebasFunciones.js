// // Seccion Pruebas
// enviarPrueba();
// async function enviarPrueba() {
// // Agregar Prueba
// const prueba = new Prueba({
//   nombre: "Alfredo",
//   productoComprado: "Hamburguesa",
//   cantidad: 5,
//   categoria: "Comidas",
//   costo: 2,
//   precio: 50,
//   unidadesVendidas: 10,
//   fecha: new Date(),
// });
// prueba
//   .save()
//   .then(() => console.log(`Usuario ${prueba.nombre} creado correctamente.`));

// // Crear una venta
// const crearVenta = new Venta({
//   producto: "Fernet",
//   cantidad: 2,
//   valorIndividual: 1,
//   valorTotal: 2,
//   metodoPago: "Efectivo",
//   categoria: "bebidas",
//   notas: "Probando la venta",
// });
// crearVenta
//   .save()
//   .then(() =>
//     console.log(`Venta ${crearVenta.producto} creado correctamente.`)
//   );

// const LimitarCantidadDeInfo = await Prueba.find({ nombre: "Alfredo" }).limit(2);
// console.log(LimitarCantidadDeInfo);

// const BuscarEntreRangosDeValores = await Prueba.where("precio")
//   .gt(40)
//   .lt(61)
//   .limit(2);
// console.log(BuscarEntreRangosDeValores);

// // Reducir la cantidad de info que enviamos.
// const ReducirCantidadDeInformacionEnviada = await Prueba.find(
//   { nombre: "Alfredo" },
//   { cantidad: 1, precio: 1 }
// );
// console.log(ReducirCantidadDeInformacionEnviada);

// const contarVecesUnicas = await Prueba.count({ nombre: "Alfredo" });
// console.log(contarVecesUnicas);

// const contarVecesUnicasPorPropiedad = await Prueba.distinct("nombre"); console.log(contarVecesUnicasPorPropiedad)

// const sumarCantidadPorPersona = await Prueba.aggregate([
//   { $match: {} },
//   { $group: { _id: "$nombre", precio: { $sum: "$precio" } } },
// ]);
// console.log(sumarCantidadPorPersona);

// const sumarVentasUnicasPorProducto = await Prueba.aggregate([
//   { $match: {} },
//   {
//     $group: {
//       _id: "$productoComprado",
//       VentasTotales: { $sum: "$cantidad" },
//     },
//   },
// ]);
// console.log(sumarVentasUnicasPorProducto);

// const SegmentarAlgunas = await Prueba.aggregate([
//   { $match: { categoria: { $in: ["Inventario", "Comidas"] } } },
//   {
//     $group: {
//       _id: "$categoria",
//       precio: { $sum: "$precio" },
//     },
//   },
//   { $sort: { precio: 1 } },
// ]);
// console.log(SegmentarAlgunas);

// const SumarCantidadUnica = await Prueba.aggregate([
//   { $match: {} },
//   {
//     $group: {
//       _id: "$categoria",
//       Precio: { $sum: "$precio" },
//       Cantidad: { $sum: 1 },
//     },
//   },
//   { $sort: { precio: 1 } },
// ]);
// console.log(SumarCantidadUnica);

//

//  const buscarPorCreatedAt = await Prueba.find({
//   createdAt: {
//     $gt: "2022-07-26T00:00:00.000Z",
//     $lt: "2022-08-01T00:00:00.000Z",
//   },
// });
// console.log(buscarPorCreatedAt);

// const groupByDate = await Prueba.aggregate([
//   {
//     $group: {
//       _id: { $createdAt: { format: "%Y-%m-%d", date: "$day" } },
//       count: { $sum: 1 },
//     },
//   },
// ]);
// console.log(groupByDate);

// const buscarPorFecha = await Gasto.find({
//   createdAt: {
//     $gt: "2022-07-27T00:00:00.000Z",
//     $lt: "2022-07-28T00:00:00.000Z",
//   },
// })
//   .where("categoria")
//   .equals("Comida");
// console.log(buscarPorFecha);

// console.log("Obtener estadisticas")
// obtenerEstadisticas();
// console.log("Obtener ventas")
// obtenerEstadisticasVenta();
// obtenerEstadisticasGastos();
// obtenerVentas();
