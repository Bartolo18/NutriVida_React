import { Navigate, Route, Routes } from 'react-router-dom';
import Cabecera from './components/Cabecera';
import Menu from './components/Menu';
import PiePagina from './components/PiePagina';

// Las páginas pendientes se migran en las próximas etapas.
function PaginaPendiente({ titulo }) {
  return <main className="contenedor"><h1>{titulo}</h1><p>Sección pendiente de migración.</p></main>;
}

const paginas = [
  { ruta: '/', nombre: 'Inicio' },
  { ruta: '/nosotros', nombre: 'Nosotros' },
  { ruta: '/servicios', nombre: 'Servicios' },
  { ruta: '/productos', nombre: 'Productos' },
  { ruta: '/blog', nombre: 'Blog' },
  { ruta: '/contacto', nombre: 'Contacto' },
  { ruta: '/solicitar-hora', nombre: 'Solicitar hora' },
];

function App() {
  return (
    <>
      <Cabecera />
      <Menu paginas={paginas} />
      <Routes>
        {paginas.map(({ ruta, nombre, componente: Pagina }) => (
          <Route key={ruta} path={ruta} element={Pagina ? <Pagina /> : <PaginaPendiente titulo={nombre} />} />
        ))}
        <Route path="/administracion" element={<PaginaPendiente titulo="Acceso por perfil" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default App;