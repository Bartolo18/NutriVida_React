import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { solicitudesEjemplo } from '../data/ejemplosAdministracion';

function PanelSolicitudes() {
  const [detalle, setDetalle] = useState(null);

  return (
    <section>
      <h2>Solicitudes</h2>
      <p className="nota">Ejemplos ficticios. No provienen del formulario Solicitar hora ni representan reservas reales.</p>
      <Table bordered responsive>
        <caption>Solicitudes de ejemplo</caption>
        <thead><tr><th>Código</th><th>Servicio</th><th>Estado</th><th>Detalle</th></tr></thead>
        <tbody>
          {solicitudesEjemplo.map((solicitud) => (
            <tr key={solicitud.codigo}>
              <td>{solicitud.codigo}</td><td>{solicitud.servicio}</td><td>{solicitud.estado}</td>
              <td><button className="boton boton-secundario" type="button" onClick={() => setDetalle(solicitud)}>Ver detalle {solicitud.codigo}</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {detalle && (
        <div className="detalle-solicitud destacado">
          <h3>{detalle.codigo} · {detalle.servicio}</h3>
          <p>Paciente de ejemplo: {detalle.paciente}. Jornada preferida: {detalle.jornada}.</p>
          <p>Motivo: {detalle.motivo}. Estado: pendiente de revisión.</p>
        </div>
      )}
    </section>
  );
}

export default PanelSolicitudes;
