import EncabezadoPagina from '../components/EncabezadoPagina';
import FormularioContacto from '../components/FormularioContacto';

function Contacto() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="CONVERSEMOS" titulo="Contacto">
        <p>Cuéntanos qué información necesitas sobre nuestras consultas, planes y talleres.</p>
      </EncabezadoPagina>
      <section className="panel-formulario">
        <h2>Escríbenos</h2>
        <p className="nota">Formulario de demostración: revisa los datos, pero no envía ni guarda el mensaje.</p>
        <p className="ayuda-formulario">Todos los campos son obligatorios, excepto el teléfono.</p>
        <FormularioContacto />
      </section>
    </main>
  );
}

export default Contacto;
