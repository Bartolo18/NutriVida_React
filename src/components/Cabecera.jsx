import { Link } from 'react-router-dom';

function Cabecera() {
  return (
    <>
      <p className="franja">TEMUCO · NUTRICIÓN Y BIENESTAR DESDE 2016</p>
      <header>
        <div className="contenedor">
          <Link className="enlace-marca" to="/">
            <img className="logo" src="/imagenes/logo.svg" alt="" />
            <span className="marca">NutriVida</span>
          </Link>
          <p className="bajada">Clínica de nutrición · Temuco</p>
        </div>
      </header>
    </>
  );
}

export default Cabecera;