import { Row, Col } from 'react-bootstrap';
import EncabezadoPagina from '../components/EncabezadoPagina';
import TarjetaProducto from '../components/TarjetaProducto';
import { productos } from '../data/productos';

const grupos = [
  { id: 'consultas', titulo: 'Consultas nutricionales' },
  { id: 'planes', titulo: 'Planes especializados' },
  { id: 'evaluaciones', titulo: 'Evaluaciones' },
  { id: 'talleres', titulo: 'Talleres grupales' },
];

function Productos() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="CONSULTAS Y PLANES" titulo="Un plan para cada etapa.">
        <p>Conoce las opciones del catálogo y revisa qué incluye cada atención.</p>
      </EncabezadoPagina>
      <p className="nota">Catálogo de demostración. Los precios y las duraciones son referenciales.</p>
      <div className="enlaces-seccion">
        {grupos.map((grupo) => <a key={grupo.id} href={`#${grupo.id}`}>{grupo.titulo}</a>)}
      </div>
      {grupos.map((grupo) => (
        <section key={grupo.id} id={grupo.id}>
          <h2>{grupo.titulo}</h2>
          <Row className="g-4">
            {productos.filter((producto) => producto.grupo === grupo.id).map((producto) => (
              <Col key={producto.codigo} md={6}>
                <TarjetaProducto producto={producto} />
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </main>
  );
}

export default Productos;