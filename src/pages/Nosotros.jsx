import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/EncabezadoPagina';

function Nosotros() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="NUESTRA CLÍNICA" titulo="Nutrición con sentido humano.">
        <p>Desde 2016 acompañamos a nuestros pacientes en Temuco, Región de La Araucanía.</p>
      </EncabezadoPagina>

      <section className="presentacion-clinica">
        <Row className="g-4">
          <Col xs={12} md={5}>
            <img className="imagen-clinica" src="/imagenes/vegetariana.jpg" alt="Ensalada vegetariana con garbanzos, palta y tomates" />
          </Col>
          <Col xs={12} md={7} className="texto-clinica">
            <p className="etiqueta">UN EQUIPO QUE TE ACOMPAÑA</p>
            <h2>Distintos enfoques, un mismo compromiso.</h2>
            <p>NutriVida es una clínica de nutrición integrada por cuatro nutricionistas. Atiende a personas con objetivos de control de peso, necesidades metabólicas, nutrición deportiva y alimentación vegetariana o vegana.</p>
            <p>La clínica atiende aproximadamente a 60 pacientes por semana, con controles cada quince días o cada mes, según cada proceso.</p>
            <p><Link to="/servicios">Revisa las áreas de atención</Link></p>
          </Col>
        </Row>
      </section>

      <section>
        <p className="etiqueta">NUESTRA FORMA DE ACOMPAÑARTE</p>
        <h2>Conocer, orientar y acompañar.</h2>
        {/* responsive permite desplazar la tabla si no cabe en la pantalla. */}
        <Table responsive>
          <caption>Opciones que encontrarás en el catálogo</caption>
          <thead>
            <tr><th>Tipo de atención</th><th>Propósito</th></tr>
          </thead>
          <tbody>
            <tr><td>Consulta inicial</td><td>Conocer los antecedentes y definir el primer plan alimenticio.</td></tr>
            <tr><td>Controles de seguimiento</td><td>Revisar los avances y ajustar el plan vigente.</td></tr>
            <tr><td>Evaluaciones</td><td>Recopilar información sobre hábitos y estado nutricional.</td></tr>
            <tr><td>Talleres grupales</td><td>Compartir conocimientos y actividades sobre alimentación.</td></tr>
          </tbody>
        </Table>
      </section>

      <section className="destacado">
        <h2>Nuestro equipo</h2>
        <p>NutriVida cuenta con cuatro nutricionistas que trabajan en distintas áreas:</p>
        <ul>
          <li><strong>Camila Soto:</strong> control de peso y hábitos saludables.</li>
          <li><strong>Daniela Rojas:</strong> enfermedades metabólicas.</li>
          <li><strong>Valentina Muñoz:</strong> nutrición deportiva.</li>
          <li><strong>Fernanda Silva:</strong> alimentación vegetariana y vegana.</li>
        </ul>
      </section>
    </main>
  );
}

export default Nosotros;