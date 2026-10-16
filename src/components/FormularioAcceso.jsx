import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoFormulario from './CampoFormulario';
import { correoValido, claveValida } from '../utils/validaciones';
import { usuariosEjemplo } from '../data/ejemplosAdministracion';

function FormularioAcceso({ onIngresar }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const [errorAcceso, setErrorAcceso] = useState('');

  function revisarCorreo(valor) {
    return correoValido(valor) ? '' : 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).';
  }

  function revisarClave(valor) {
    return claveValida(valor) ? '' : 'Escribe una contraseña de entre 4 y 10 caracteres.';
  }

  function ingresar(evento) {
    evento.preventDefault();
    const nuevosErrores = { correo: revisarCorreo(correo), clave: revisarClave(clave) };
    setErrores(nuevosErrores);
    setErrorAcceso('');
    if (nuevosErrores.correo || nuevosErrores.clave) return;

    const usuario = usuariosEjemplo.find((cuenta) => cuenta.correo === correo.toLowerCase());
    if (!usuario || clave !== 'nutrivida') {
      setErrorAcceso('Correo o contraseña incorrectos. Revisa las cuentas de prueba.');
      return;
    }
    // El padre recibe el usuario y cambia la vista según su perfil.
    onIngresar(usuario);
  }

  return (
    <Form noValidate onSubmit={ingresar} onChange={() => setErrorAcceso('')}>
      <CampoFormulario id="correoAcceso" etiqueta="Correo" error={errores.correo}>
        <Form.Control type="email" value={correo} maxLength={100} aria-describedby="correoAcceso-error" onChange={(evento) => {
          setCorreo(evento.target.value);
          setErrores({ ...errores, correo: revisarCorreo(evento.target.value) });
        }} onBlur={() => setErrores({ ...errores, correo: revisarCorreo(correo) })} />
      </CampoFormulario>
      <CampoFormulario id="claveAcceso" etiqueta="Contraseña" ayuda="Contraseña de entre 4 y 10 caracteres." error={errores.clave}>
        <Form.Control type="password" value={clave} maxLength={10} aria-describedby="claveAcceso-ayuda claveAcceso-error" onChange={(evento) => {
          setClave(evento.target.value);
          setErrores({ ...errores, clave: revisarClave(evento.target.value) });
        }} onBlur={() => setErrores({ ...errores, clave: revisarClave(clave) })} />
      </CampoFormulario>
      <button className="boton" type="submit">Ingresar</button>
      <p className="error" role="alert">{errorAcceso}</p>
    </Form>
  );
}

export default FormularioAcceso;
