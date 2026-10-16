import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import CampoFormulario from './CampoFormulario';
import { productos } from '../data/productos';
import { nombreValido, correoValido, fechaFutura } from '../utils/validaciones';

function FormularioHora() {
  const [resultado, setResultado] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: { nombre: '', correo: '', servicio: '', fecha: '', jornada: '' },
  });

  function revisarSolicitud() {
    setResultado('Datos correctos. La solicitud no se ha enviado ni guardado; no hay una hora reservada.');
  }

  return (
    <Form noValidate onChange={() => setResultado('')} onSubmit={handleSubmit(revisarSolicitud, () => setResultado(''))}>
      <CampoFormulario id="nombreHora" etiqueta="Nombre completo" error={errors.nombre?.message}>
        <Form.Control type="text" maxLength={100} aria-describedby="nombreHora-error" {...register('nombre', {
          validate: (valor) => (nombreValido(valor) && valor.length <= 100) || 'Escribe un nombre usando solo letras, espacios o guiones (máximo 100 caracteres).',
        })} />
      </CampoFormulario>
      <CampoFormulario id="correoHora" etiqueta="Correo electrónico" ayuda="Usa un correo de duoc.cl, profesor.duoc.cl o gmail.com." error={errors.correo?.message}>
        <Form.Control type="email" maxLength={100} aria-describedby="correoHora-ayuda correoHora-error" {...register('correo', {
          validate: (valor) => correoValido(valor) || 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).',
        })} />
      </CampoFormulario>
      <CampoFormulario id="servicioHora" etiqueta="Atención que te interesa" error={errors.servicio?.message}>
        <Form.Select aria-describedby="servicioHora-error" {...register('servicio', { required: 'Selecciona un servicio nutricional.' })}>
          <option value="">Selecciona una atención</option>
          {productos.map((producto) => <option key={producto.codigo}>{producto.nombre}</option>)}
        </Form.Select>
      </CampoFormulario>
      <CampoFormulario id="fechaHora" etiqueta="Fecha preferida" error={errors.fecha?.message}>
        <Form.Control type="date" aria-describedby="fechaHora-error" {...register('fecha', {
          validate: (valor) => fechaFutura(valor) || 'Selecciona una fecha futura.',
        })} />
      </CampoFormulario>
      <CampoFormulario id="jornadaHora" etiqueta="Jornada preferida" error={errors.jornada?.message}>
        <Form.Select aria-describedby="jornadaHora-error" {...register('jornada', { required: 'Selecciona una jornada.' })}>
          <option value="">Selecciona una jornada</option><option>Mañana</option><option>Tarde</option>
        </Form.Select>
      </CampoFormulario>
      <button className="boton" type="submit">Revisar solicitud</button>
      <p className="resultado" role="status">{resultado}</p>
    </Form>
  );
}

export default FormularioHora;
