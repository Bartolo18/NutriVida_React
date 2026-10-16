import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import CampoFormulario from './CampoFormulario';
import { tieneTexto, precioValido, stockValido } from '../utils/validaciones';

function FormularioProducto({ producto, onVolver }) {
  const [resultado, setResultado] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: producto || { codigo: '', nombre: '', precio: '', stock: '', categoria: '' },
  });

  return (
    <section className="panel-formulario">
      <h2>{producto ? `Editar producto ${producto.codigo}` : 'Nuevo producto'}</h2>
      <p className="nota">Simulación: revisa los datos, pero no agrega ni guarda productos.</p>
      <Form noValidate onChange={() => setResultado('')} onSubmit={handleSubmit(() => setResultado('Datos correctos. El cambio fue revisado, pero no se ha guardado.'), () => setResultado(''))}>
        <CampoFormulario id="codigoProducto" etiqueta="Código" error={errors.codigo?.message}>
          <Form.Control aria-describedby="codigoProducto-error" {...register('codigo', {
            validate: (valor) => (tieneTexto(valor) && valor.length >= 3) || 'Escribe un código de al menos 3 caracteres.',
          })} />
        </CampoFormulario>
        <CampoFormulario id="nombreProducto" etiqueta="Nombre" error={errors.nombre?.message}>
          <Form.Control maxLength={100} aria-describedby="nombreProducto-error" {...register('nombre', {
            validate: (valor) => (tieneTexto(valor) && valor.length <= 100) || 'Escribe un nombre de hasta 100 caracteres.',
          })} />
        </CampoFormulario>
        <CampoFormulario id="precioProducto" etiqueta="Precio" error={errors.precio?.message}>
          <Form.Control type="number" min="0" step="any" aria-describedby="precioProducto-error" {...register('precio', {
            validate: (valor) => precioValido(valor) || 'Escribe un precio igual o mayor que 0.',
          })} />
        </CampoFormulario>
        <CampoFormulario id="stockProducto" etiqueta="Stock" error={errors.stock?.message}>
          <Form.Control type="number" min="0" step="1" aria-describedby="stockProducto-error" {...register('stock', {
            validate: (valor) => stockValido(valor) || 'Escribe un stock entero igual o mayor que 0.',
          })} />
        </CampoFormulario>
        <CampoFormulario id="categoriaProducto" etiqueta="Categoría" error={errors.categoria?.message}>
          <Form.Select aria-describedby="categoriaProducto-error" {...register('categoria', { required: 'Selecciona una categoría.' })}>
            <option value="">Selecciona una categoría</option>
            <option value="Consulta">Consulta</option><option value="Plan">Plan especializado</option>
            <option value="Evaluación">Evaluación</option><option value="Taller">Taller grupal</option>
          </Form.Select>
        </CampoFormulario>
        <button className="boton" type="submit">Revisar datos</button>{' '}
        <button className="boton boton-secundario" type="button" onClick={onVolver}>Volver al listado</button>
        <p className="resultado" role="status">{resultado}</p>
      </Form>
    </section>
  );
}

export default FormularioProducto;
