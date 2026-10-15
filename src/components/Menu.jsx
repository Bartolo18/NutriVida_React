import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Menu({ paginas }) {
  return (
    <Navbar className="menu" expand="md" collapseOnSelect aria-label="Menú principal">
      <Container className="contenedor" fluid>
        <Navbar.Toggle aria-controls="menu-principal" label="Abrir menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav>
            {paginas.map((pagina) => (
              <Nav.Link key={pagina.ruta} eventKey={pagina.ruta} as={NavLink} to={pagina.ruta} end>
                {pagina.nombre}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;