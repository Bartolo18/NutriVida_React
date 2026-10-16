import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import CampoFormulario from './CampoFormulario';
import { nombreValido, correoValido } from '../utils/validaciones';

function FormularioUsuario({ usuario, onVolver }) {
  const [resultado, setResultado] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: usuario || { nombre: '', apellidos: '', correo: '', perfil: '' },
  });

  return (
    <section className="panel-formulario">
      <h2>{usuario ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <p className="nota">Formulario básico de demostración. No crea una cuenta ni cambia los permisos de acceso.</p>
      <Form noValidate onChange={() => setResultado('')} onSubmit={handleSubmit(() => setResultado('Datos correctos. No se ha creado ni modificado una cuenta; los accesos de prueba siguen iguales.'), () => setResultado(''))}>
        <CampoFormulario id="nombreUsuario" etiqueta="Nombre" error={errors.nombre?.message}>
          <Form.Control maxLength={50} aria-describedby="nombreUsuario-error" {...register('nombre', {
            validate: (valor) => (nombreValido(valor) && valor.length <= 50) || 'Escribe un nombre de hasta 50 caracteres.',
          })} />
        </CampoFormulario>
        <CampoFormulario id="apellidosUsuario" etiqueta="Apellidos" error={errors.apellidos?.message}>
          <Form.Control maxLength={100} aria-describedby="apellidosUsuario-error" {...register('apellidos', {
            validate: (valor) => (nombreValido(valor) && valor.length <= 100) || 'Escribe los apellidos (máximo 100 caracteres).',
          })} />
        </CampoFormulario>
        <CampoFormulario id="correoUsuario" etiqueta="Correo" error={errors.correo?.message}>
          <Form.Control type="email" maxLength={100} aria-describedby="correoUsuario-error" {...register('correo', {
            validate: (valor) => correoValido(valor) || 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).',
          })} />
        </CampoFormulario>
        <CampoFormulario id="perfilUsuario" etiqueta="Perfil" error={errors.perfil?.message}>
          <Form.Select aria-describedby="perfilUsuario-error" {...register('perfil', { required: 'Selecciona uno de los tres perfiles.' })}>
            <option value="">Selecciona un perfil</option><option>Administrador</option><option>Vendedor</option><option>Cliente</option>
          </Form.Select>
        </CampoFormulario>
        <button className="boton" type="submit">Revisar datos</button>{' '}
        <button className="boton boton-secundario" type="button" onClick={onVolver}>Volver al listado</button>
        <p className="resultado" role="status">{resultado}</p>
      </Form>
    </section>
  );
}

export default FormularioUsuario;
