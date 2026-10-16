import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import EncabezadoPagina from '../components/EncabezadoPagina';
import FormularioAcceso from '../components/FormularioAcceso';
import FormularioProducto from '../components/FormularioProducto';
import FormularioUsuario from '../components/FormularioUsuario';
import PanelSolicitudes from '../components/PanelSolicitudes';
import { productosEjemplo, usuariosEjemplo } from '../data/ejemplosAdministracion';
import { formatearPrecio } from '../utils/formatearPrecio';

function Administracion() {
  const [usuario, setUsuario] = useState(null);
  const [panel, setPanel] = useState('productos');
  const [productoEditar, setProductoEditar] = useState(null);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const esAdministrador = usuario?.perfil === 'Administrador';
  const esPersonal = esAdministrador || usuario?.perfil === 'Vendedor';

  function ingresar(cuenta) {
    setUsuario(cuenta);
    setPanel(cuenta.perfil === 'Cliente' ? 'cliente' : 'productos');
  }

  function salir() {
    setUsuario(null);
    setPanel('productos');
    setProductoEditar(null);
    setUsuarioEditar(null);
  }

  function editarProducto(producto) {
    if (!esAdministrador) return;
    setProductoEditar(producto);
    setPanel('editarProducto');
  }

  function editarUsuario(cuenta) {
    if (!esAdministrador) return;
    setUsuarioEditar(cuenta);
    setPanel('editarUsuario');
  }

  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="NUTRIVIDA" titulo="Acceso por perfil">
        <p>Usa una cuenta de prueba para ver sus opciones. Esta demostración no guarda datos ni protege información real.</p>
      </EncabezadoPagina>
      {!usuario ? (
        <section className="panel-formulario">
          <h2>Ingresar</h2>
          <FormularioAcceso onIngresar={ingresar} />
          <h3>Cuentas de prueba</h3>
          <ul className="cuentas-prueba">
            {usuariosEjemplo.map((cuenta) => <li key={cuenta.correo}><strong>{cuenta.perfil}:</strong> {cuenta.correo}</li>)}
          </ul>
          <p className="nota">Contraseña para las tres: <strong>nutrivida</strong>. No uses datos personales.</p>
        </section>
      ) : (
        <>
          <p className="resultado">Perfil: {usuario.perfil} · Acceso de demostración.</p>
          <div className="menu-gestion">
            {esPersonal && <button className="boton" type="button" onClick={() => setPanel('productos')}>Productos</button>}
            {esAdministrador && <button className="boton" type="button" onClick={() => setPanel('usuarios')}>Usuarios</button>}
            {esPersonal && <button className="boton" type="button" onClick={() => setPanel('solicitudes')}>Solicitudes</button>}
            <button className="boton boton-secundario" type="button" onClick={salir}>Salir</button>
          </div>

          {esPersonal && panel === 'productos' && (
            <section>
              <h2>Productos</h2>
              <p className="nota">Listado de ejemplo. Los nombres llevan al detalle publicado en el catálogo.</p>
              <Table bordered responsive>
                <caption>Consultas y planes de NutriVida</caption>
                <thead><tr><th>Código</th><th>Nombre y detalle</th><th>Precio</th></tr></thead>
                <tbody>{productosEjemplo.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.codigo}</td><td><a href={`/productos/${producto.codigo.toLowerCase()}`}>{producto.nombre}</a></td><td>{formatearPrecio(producto.precio)}</td>
                  </tr>
                ))}</tbody>
              </Table>
              {esAdministrador && <div className="menu-gestion">
                <button className="boton" type="button" onClick={() => editarProducto(null)}>Nuevo producto</button>
                {productosEjemplo.map((producto) => <button className="boton boton-secundario" type="button" key={producto.codigo} onClick={() => editarProducto(producto)}>Editar {producto.codigo}</button>)}
              </div>}
            </section>
          )}

          {esAdministrador && panel === 'usuarios' && (
            <section>
              <h2>Usuarios</h2>
              <p className="nota">Personas ficticias. Este listado no es una base de datos.</p>
              <Table bordered responsive>
                <caption>Ejemplos de los tres perfiles</caption>
                <thead><tr><th>Nombre</th><th>Correo</th><th>Perfil</th><th>Acción</th></tr></thead>
                <tbody>{usuariosEjemplo.map((cuenta) => (
                  <tr key={cuenta.correo}>
                    <td>{cuenta.nombre} {cuenta.apellidos}</td><td>{cuenta.correo}</td><td>{cuenta.perfil}</td>
                    <td><button className="boton boton-secundario" type="button" onClick={() => editarUsuario(cuenta)}>Editar {cuenta.nombre}</button></td>
                  </tr>
                ))}</tbody>
              </Table>
              <button className="boton" type="button" onClick={() => editarUsuario(null)}>Nuevo usuario</button>
            </section>
          )}

          {esAdministrador && panel === 'editarProducto' && <FormularioProducto key={productoEditar?.codigo || 'nuevo'} producto={productoEditar} onVolver={() => setPanel('productos')} />}
          {esAdministrador && panel === 'editarUsuario' && <FormularioUsuario key={usuarioEditar?.correo || 'nuevo'} usuario={usuarioEditar} onVolver={() => setPanel('usuarios')} />}
          {esPersonal && panel === 'solicitudes' && <PanelSolicitudes />}

          {usuario.perfil === 'Cliente' && (
            <section className="destacado">
              <h2>Bienvenido a NutriVida</h2>
              <p>Puedes revisar nuestras consultas y planes o completar los formularios de demostración.</p>
              <p><Link to="/">Ir al inicio</Link> · <Link to="/productos">Ver catálogo</Link> · <Link to="/blog">Leer el blog</Link></p>
              <p><Link to="/contacto">Contacto</Link> · <Link to="/solicitar-hora">Solicitar hora</Link></p>
            </section>
          )}
          <p className="nota">Al recargar esta página, deberás ingresar nuevamente para probar un perfil.</p>
        </>
      )}
    </main>
  );
}

export default Administracion;
