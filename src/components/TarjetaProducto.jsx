import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImagenProducto from './ImagenProducto';
import { formatearPrecio } from '../utils/formatearPrecio';

// Las propiedades permiten reutilizar esta tarjeta en Inicio y Productos.
function TarjetaProducto({ producto, mostrarDetalle = false }) {
  return (
    <Card as="article" className="tarjeta" id={producto.codigo.toLowerCase()}>
      <ImagenProducto imagen={producto.imagen} alt={producto.alt} />
      <Card.Body className="contenido-tarjeta">
        <p className="etiqueta">{producto.modalidad}</p>
        <h3>{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">{formatearPrecio(producto.precio)}</p>
        <p className="accion">
          {mostrarDetalle ? (
            <a className="boton" href={`/productos/${producto.codigo.toLowerCase()}`}>Ver detalles</a>
          ) : (
            <Link className="boton" to="/solicitar-hora">Solicitar hora</Link>
          )}
        </p>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;