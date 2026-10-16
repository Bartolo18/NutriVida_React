import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import CampoFormulario from './CampoFormulario';
import { nombreValido, correoValido, telefonoValido, tieneTexto } from '../utils/validaciones';

function FormularioContacto() {
  const [resultado, setResultado] = useState('');
  // register conecta los campos; handleSubmit solo acepta datos que cumplen las reglas.
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: { nombre: '', correo: '', telefono: '', motivo: '', mensaje: '' },
  });

  function revisarMensaje() {
    setResultado('Datos correctos. El mensaje no se ha enviado ni guardado.');
  }

  return (
    <Form noValidate onChange={() => setResultado('')} onSubmit={handleSubmit(revisarMensaje, () => setResultado(''))}>
      <CampoFormulario id="nombreContacto" etiqueta="Nombre completo" error={errors.nombre?.message}>
        <Form.Control type="text" maxLength={100} aria-describedby="nombreContacto-error" {...register('nombre', {
          validate: (valor) => (nombreValido(valor) && valor.length <= 100) || 'Escribe un nombre usando solo letras, espacios o guiones (máximo 100 caracteres).',
        })} />
      </CampoFormulario>
      <CampoFormulario id="correoContacto" etiqueta="Correo electrónico" ayuda="Usa un correo de duoc.cl, profesor.duoc.cl o gmail.com." error={errors.correo?.message}>
        <Form.Control type="email" maxLength={100} aria-describedby="correoContacto-ayuda correoContacto-error" {...register('correo', {
          validate: (valor) => correoValido(valor) || 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).',
        })} />
      </CampoFormulario>
      <CampoFormulario id="telefonoContacto" etiqueta="Teléfono (opcional)" ayuda="9 dígitos, sin +56 ni espacios." error={errors.telefono?.message}>
        <Form.Control type="tel" maxLength={9} placeholder="912345678" aria-describedby="telefonoContacto-ayuda telefonoContacto-error" {...register('telefono', {
          validate: (valor) => valor === '' || telefonoValido(valor) || 'Usa 9 dígitos o deja el teléfono vacío.',
        })} />
      </CampoFormulario>
      <CampoFormulario id="motivoContacto" etiqueta="Motivo del mensaje" error={errors.motivo?.message}>
        <Form.Select aria-describedby="motivoContacto-error" {...register('motivo', { required: 'Selecciona un motivo.' })}>
          <option value="">Selecciona un motivo</option>
          <option>Consultas y planes</option><option>Evaluaciones</option><option>Talleres grupales</option><option>Otra consulta</option>
        </Form.Select>
      </CampoFormulario>
      <CampoFormulario id="mensajeContacto" etiqueta="Mensaje" ayuda="Máximo 500 caracteres." error={errors.mensaje?.message}>
        <Form.Control as="textarea" rows={5} maxLength={500} aria-describedby="mensajeContacto-ayuda mensajeContacto-error" {...register('mensaje', {
          validate: (valor) => (tieneTexto(valor) && valor.length <= 500) || 'Escribe un mensaje (máximo 500 caracteres).',
        })} />
      </CampoFormulario>
      <button className="boton" type="submit">Revisar mensaje</button>
      <p className="resultado" role="status">{resultado}</p>
    </Form>
  );
}

export default FormularioContacto;
