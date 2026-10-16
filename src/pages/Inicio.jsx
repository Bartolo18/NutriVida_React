import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TarjetaProducto from '../components/TarjetaProducto';
import { productos } from '../data/productos';

function Inicio() {
  const consultaInicial = productos.find((producto) => producto.codigo === 'CN001');
  const planPeso = productos.find((producto) => producto.codigo === 'PL001');

  return (
    <main className="contenedor">
      <section className="portada">
        <Row className="align-items-center g-4">
          <Col xs={12} md={6} className="texto-portada">
            <p className="etiqueta">UN ESPACIO PARA CUIDARTE</p>
            <h1>Tu bienestar empieza con una buena nutrición.</h1>
            <p>Te acompañamos con consultas y planes pensados para tus objetivos, tu rutina y tu manera de vivir.</p>
            <p className="accion"><Link className="boton" to="/productos">Explorar el catálogo</Link></p>
            <p><Link to="/nosotros">Conoce NutriVida</Link></p>
          </Col>
          <Col xs={12} md={6}>
            <img className="imagen-portada" src="/imagenes/metabolica.jpg" alt="Plato con huevo, palta, tomates y verduras variadas" />
          </Col>
        </Row>
      </section>

      <section className="datos-clinica">
        <Row>
          <Col xs={12} md={4}><p><strong>Desde 2016</strong><br />en Temuco</p></Col>
          <Col xs={12} md={4}><p><strong>4 nutricionistas</strong><br />distintas áreas de atención</p></Col>
          <Col xs={12} md={4}><p><strong>18 opciones</strong><br />en nuestro catálogo</p></Col>
        </Row>
      </section>

      <section>
        <p className="etiqueta">ENCUENTRA TU PUNTO DE PARTIDA</p>
        <h2>Un plan para cada etapa.</h2>
        <p>Conoce dos opciones y revisa sus detalles antes de solicitar orientación.</p>
        {/* La misma tarjeta recibe los datos de cada opción mediante propiedades. */}
        <Row className="tarjetas g-4">
          <Col xs={12} md={6}><TarjetaProducto producto={consultaInicial} mostrarDetalle /></Col>
          <Col xs={12} md={6}><TarjetaProducto producto={planPeso} mostrarDetalle /></Col>
        </Row>
        <p className="nota">Valores referenciales del catálogo de demostración.</p>
        <p><Link to="/productos">Ver todos los productos y planes</Link></p>
      </section>

      <section className="destacado">
        <p className="etiqueta">ATENCIÓN PARA DISTINTAS NECESIDADES</p>
        <h2>Un equipo, distintos objetivos.</h2>
        <p>NutriVida cuenta con cuatro nutricionistas y atiende en Temuco desde 2016.</p>
        <ul>
          <li>Control de peso y enfermedades metabólicas.</li>
          <li>Nutrición deportiva.</li>
          <li>Alimentación vegetariana y vegana.</li>
        </ul>
        <p><Link to="/servicios">Conocer las áreas de atención</Link></p>
      </section>

      <section className="panel-verde">
        <p className="etiqueta">CERCA DE TI</p>
        <h2>Da el primer paso.</h2>
        <ol>
          <li>Revisa los servicios y planes.</li>
          <li>Completa el formulario con tus preferencias.</li>
          <li>Revisa tus datos y los mensajes del formulario.</li>
        </ol>
        <p className="accion"><Link className="boton boton-claro" to="/solicitar-hora">Solicitar hora</Link></p>
        <p className="nota">El formulario es una demostración: no registra una cita real.</p>
      </section>
    </main>
  );
}

export default Inicio;