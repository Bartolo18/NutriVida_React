import { Link } from 'react-router-dom';

function PiePagina() {
  return (
    <footer>
      <div className="contenedor">
        <p className="marca-pie">NutriVida</p>
        <p>Asesoría nutricional personalizada · Temuco</p>
        <p>
          <Link to="/productos">Consultas y planes</Link> · <Link to="/blog">Nuestro blog</Link> ·{' '}
          <Link to="/contacto">Contacto</Link> · <Link to="/administracion">Acceso</Link>
        </p>
        <p className="creditos">Proyecto académico DSY1104 · Christopher Villa y Bárbara Tolorza</p>
      </div>
    </footer>
  );
}

export default PiePagina;