// Cada área conserva la misma estructura y recibe sus textos mediante propiedades.
function TarjetaServicio({ titulo, descripcion, destino, textoEnlace }) {
  return (
    <article className="servicio">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <p><a href={destino}>{textoEnlace}</a></p>
    </article>
  );
}

export default TarjetaServicio;