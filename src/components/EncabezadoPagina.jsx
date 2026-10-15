function EncabezadoPagina({ etiqueta, titulo, children }) {
  return (
    <section className="encabezado-pagina">
      <p className="etiqueta">{etiqueta}</p>
      <h1>{titulo}</h1>
      {children}
    </section>
  );
}

export default EncabezadoPagina;