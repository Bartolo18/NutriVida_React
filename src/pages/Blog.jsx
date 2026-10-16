import EncabezadoPagina from '../components/EncabezadoPagina';
import ArticuloBlog from '../components/ArticuloBlog';

function Blog() {
  return (
    <main className="contenedor">
      <EncabezadoPagina etiqueta="NUESTRO BLOG" titulo="Conoce más sobre NutriVida.">
        <p>Dos lecturas para conocer las consultas, los planes y las formas de atención.</p>
      </EncabezadoPagina>

      <div className="enlaces-seccion">
        <a href="#primera-consulta">Tu primera consulta</a>
        <a href="#planes">Opciones de acompañamiento</a>
      </div>
      <p className="nota">Los servicios, valores y duraciones mencionados corresponden al catálogo de demostración.</p>

      <ArticuloBlog
        id="primera-consulta"
        etiqueta="CONSULTAS NUTRICIONALES"
        titulo="Tu primera consulta, paso a paso."
        imagen="/imagenes/control-peso.jpg"
        alt="Ensalada de hojas verdes con palta, granada y semillas"
        destino="/productos"
        textoEnlace="Explorar consultas"
      >
        <h3>El comienzo de tu proceso</h3>
        <p>La primera consulta nutricional de NutriVida dura 50 minutos y se realiza de forma presencial. Su valor es de $35.000. Es el servicio destinado a la evaluación inicial y al diseño del primer plan alimenticio.</p>
        <h3>Conocer tu situación</h3>
        <p>La atención incluye una anamnesis, es decir, la recopilación de antecedentes relevantes para la evaluación, y una antropometría completa. A partir de esa evaluación se diseña el primer plan alimenticio.</p>
        <h3>El seguimiento también forma parte del camino</h3>
        <p>El catálogo ofrece controles mensuales de 30 minutos por $25.000 y controles quincenales de 30 minutos por $22.000. Estos últimos se describen como un seguimiento intensivo cada 15 días, recomendado en los primeros dos meses.</p>
        <h3>Una alternativa a distancia</h3>
        <p>La teleconsulta nutricional de seguimiento dura 30 minutos y cuesta $20.000. En el catálogo se indica que requiere una consulta presencial previa. Puedes revisar los detalles de cada servicio antes de elegir una opción.</p>
      </ArticuloBlog>

      <ArticuloBlog
        id="planes"
        etiqueta="PLANES, EVALUACIONES Y TALLERES"
        titulo="Un acompañamiento para distintos objetivos."
        imagen="/imagenes/deportiva.jpg"
        alt="Ingredientes variados organizados en recipientes"
        destino="/productos"
        textoEnlace="Explorar planes"
      >
        <h3>Más de una forma de acompañarte</h3>
        <p>NutriVida reúne cuatro tipos de servicios: consultas, planes especializados, evaluaciones y talleres grupales. Cada alternativa tiene un propósito y un contenido que puedes revisar en el catálogo.</p>
        <h3>Planes especializados</h3>
        <p>Hay planes de pérdida de peso de uno y tres meses, nutrición deportiva, control de diabetes e hipertensión, alimentación vegetariana o vegana y alimentación infantil. Los planes agrupan prestaciones con enfoques específicos; revisa sus descripciones para conocer qué incluyen.</p>
        <h3>Evaluaciones para conocer el punto de partida</h3>
        <p>Las evaluaciones incluyen antropometría, bioimpedanciometría, encuesta de hábitos alimentarios y análisis de exámenes de laboratorio en contexto nutricional. Sus duraciones van de 15 a 20 minutos, de acuerdo con el servicio.</p>
        <h3>Aprender en grupo</h3>
        <p>Los talleres abordan alimentación saludable, cocina nutritiva y nutrición para deportistas. Duran entre 90 y 120 minutos y cuentan con un máximo de 8, 10 o 12 participantes, según el taller. El taller de cocina incluye preparación de recetas y degustación.</p>
      </ArticuloBlog>
    </main>
  );
}

export default Blog;