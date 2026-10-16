import { Navigate, Route, Routes } from 'react-router-dom';
import Cabecera from './components/Cabecera';
import Menu from './components/Menu';
import PiePagina from './components/PiePagina';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import SolicitarHora from './pages/SolicitarHora';
import ProductoDetalle from './pages/ProductoDetalle';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Blog from './pages/Blog';

// Las páginas pendientes se migran en las próximas etapas.
function PaginaPendiente({ titulo }) {
  return <main className="contenedor"><h1>{titulo}</h1><p>Sección pendiente de migración.</p></main>;
}

const paginas = [
  { ruta: '/', nombre: 'Inicio', componente: Inicio },
  { ruta: '/nosotros', nombre: 'Nosotros', componente: Nosotros },
  { ruta: '/servicios', nombre: 'Servicios', componente: Servicios },
  { ruta: '/productos', nombre: 'Productos', componente: Productos },
  { ruta: '/blog', nombre: 'Blog', componente: Blog },
  { ruta: '/contacto', nombre: 'Contacto', componente: Contacto },
  { ruta: '/solicitar-hora', nombre: 'Solicitar hora', componente: SolicitarHora },
]

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
        <Route path="/productos/:codigo" element={<ProductoDetalle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default App;
