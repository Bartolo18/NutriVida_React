// children permite conservar el contenido particular dentro de un artículo común.
function ArticuloBlog({ id, etiqueta, titulo, imagen, alt, destino, textoEnlace, children }) {
  return (
    <article className="articulo-blog" id={id}>
      <p className="etiqueta">{etiqueta}</p>
      <h2>{titulo}</h2>
      <img className="imagen-articulo" src={imagen} alt={alt} />
      {children}
      <p className="accion"><a className="boton" href={destino}>{textoEnlace}</a></p>
    </article>
  );
}

export default ArticuloBlog;