import { Link, Navigate, useParams } from 'react-router-dom';
import EncabezadoPagina from '../components/EncabezadoPagina';
import TarjetaProducto from '../components/TarjetaProducto';
import { productos } from '../data/productos';

// useParams obtiene el código escrito en la URL, como en el ejemplo del profesor.
function ProductoDetalle() {
  const { codigo } = useParams();
  const producto = productos.find((item) => item.codigo.toLowerCase() === codigo.toLowerCase());

  if (!producto) return <Navigate to="/productos" replace />;

  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="CONSULTAS Y PLANES" titulo="Detalle de la atención">
        <p>Catálogo de demostración. Los precios y las duraciones son referenciales.</p>
        <p><Link to="/productos">Volver al catálogo</Link></p>
      </EncabezadoPagina>
      <section className="detalle-producto">
        <TarjetaProducto producto={producto} />
      </section>
    </main>
  );
}

export default ProductoDetalle;