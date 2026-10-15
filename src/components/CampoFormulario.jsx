import { Form } from 'react-bootstrap';

// Pieza compartida: etiqueta, campo, ayuda y mensaje de validación.
function CampoFormulario({ id, etiqueta, ayuda, error, children }) {
  return (
    <Form.Group className="fila-formulario" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      {children}
      {ayuda && <p className="ayuda-formulario" id={`${id}-ayuda`}>{ayuda}</p>}
      <p className="error" id={`${id}-error`} aria-live="polite">{error}</p>
    </Form.Group>
  );
}

export default CampoFormulario;
