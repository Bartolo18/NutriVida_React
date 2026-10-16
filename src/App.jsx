import { Navigate, Route, Routes } from 'react-router-dom';
import Cabecera from './components/Cabecera';
import Menu from './components/Menu';
import PiePagina from './components/PiePagina';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import SolicitarHora from './pages/SolicitarHora';
import Administracion from './pages/Administracion';

// La misma lista configura el menú y las rutas, como en la base del profesor.
const paginas = [
  { ruta: '/', nombre: 'Inicio', componente: Inicio },
  { ruta: '/nosotros', nombre: 'Nosotros', componente: Nosotros },
  { ruta: '/servicios', nombre: 'Servicios', componente: Servicios },
  { ruta: '/productos', nombre: 'Productos', componente: Productos },
  { ruta: '/blog', nombre: 'Blog', componente: Blog },
  { ruta: '/contacto', nombre: 'Contacto', componente: Contacto },
  { ruta: '/solicitar-hora', nombre: 'Solicitar hora', componente: SolicitarHora },
];

function App() {
  return (
    <>
      <Cabecera />
      <Menu paginas={paginas} />
      <Routes>
        {paginas.map(({ ruta, componente: Pagina }) => (
          <Route key={ruta} path={ruta} element={<Pagina />} />
        ))}
        <Route path="/administracion" element={<Administracion />} />
        <Route path="/productos/:codigo" element={<ProductoDetalle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PiePagina />
    </>
  );
}

export default App;
