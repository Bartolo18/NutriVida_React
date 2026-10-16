import { Link } from 'react-router-dom';
import EncabezadoPagina from '../components/EncabezadoPagina';
import FormularioHora from '../components/FormularioHora';

function SolicitarHora() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="TU PRÓXIMO PASO" titulo="Solicitar hora">
        <p>Elige una atención y cuéntanos qué fecha y jornada prefieres.</p>
      </EncabezadoPagina>
      <section className="panel-formulario">
        <h2>Prepara tu solicitud</h2>
        <p className="nota">Formulario de demostración: revisa los datos, pero no los envía ni guarda. No reserva una hora real.</p>
        <p className="ayuda-formulario">Todos los campos son obligatorios. Puedes revisar las opciones en nuestro <Link to="/productos">catálogo</Link>.</p>
        <FormularioHora />
      </section>
    </main>
  );
}

export default SolicitarHora;
