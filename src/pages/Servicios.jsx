import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/EncabezadoPagina';
import TarjetaServicio from '../components/TarjetaServicio';

function Servicios() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="ÁREAS DE ATENCIÓN" titulo="Servicios nutricionales.">
        <p>Conoce nuestros enfoques de atención antes de elegir una consulta o un plan.</p>
      </EncabezadoPagina>

      <TarjetaServicio
        titulo="Control de peso"
        descripcion="Orientación nutricional para personas que buscan trabajar sus hábitos y objetivos de peso."
        destino="/productos/pl001"
        textoEnlace="Ver plan de pérdida de peso"
      />
      <TarjetaServicio
        titulo="Enfermedades metabólicas"
        descripcion="Atención nutricional para acompañar necesidades relacionadas con enfermedades metabólicas."
        destino="/productos/pl004"
        textoEnlace="Ver plan de control de diabetes e hipertensión"
      />
      <TarjetaServicio
        titulo="Nutrición deportiva"
        descripcion="Orientación para personas que desean relacionar su alimentación con la práctica de actividad física."
        destino="/productos/pl003"
        textoEnlace="Ver plan de nutrición deportiva"
      />
      <TarjetaServicio
        titulo="Alimentación vegetariana y vegana"
        descripcion="Orientación nutricional para quienes siguen una alimentación vegetariana o vegana."
        destino="/productos/pl005"
        textoEnlace="Ver plan de alimentación vegetariana y vegana"
      />

      <section className="panel-verde">
        <h2>Da el siguiente paso.</h2>
        <p>Revisa el catálogo y completa tus preferencias en el formulario.</p>
        <p className="accion"><Link className="boton boton-claro" to="/solicitar-hora">Solicitar hora</Link></p>
      </section>
    </main>
  );
}

export default Servicios;