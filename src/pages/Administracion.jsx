import { useState } from 'react';
import EncabezadoPagina from '../components/EncabezadoPagina';
import FormularioAcceso from '../components/FormularioAcceso';
import { usuariosEjemplo } from '../data/ejemplosAdministracion';

function Administracion() {
  const [usuario, setUsuario] = useState(null);
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="NUTRIVIDA" titulo="Acceso por perfil">
        <p>Acceso de demostración. Las herramientas se integrarán en las siguientes etapas.</p>
      </EncabezadoPagina>
      {!usuario ? (
        <section className="panel-formulario">
          <h2>Ingresar</h2>
          <FormularioAcceso onIngresar={setUsuario} />
          <h3>Cuentas de prueba</h3>
          <ul>{usuariosEjemplo.map((cuenta) => <li key={cuenta.correo}>{cuenta.perfil}: {cuenta.correo}</li>)}</ul>
          <p>Contraseña para las tres: nutrivida.</p>
        </section>
      ) : (
        <section>
          <p>Perfil: {usuario.perfil} · Acceso de demostración.</p>
          <button className="boton" type="button" onClick={() => setUsuario(null)}>Salir</button>
        </section>
      )}
    </main>
  );
}

export default Administracion;
