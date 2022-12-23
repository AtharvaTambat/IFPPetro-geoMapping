import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarScroll() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="http://localhost:3000/userdashboard">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="http://localhost:3000/userdashboard/orders">Orders</Nav.Link>
            <Nav.Link href="http://localhost:3000/userdashboard/service">Service/Time Sheets</Nav.Link>
            <Nav.Link href="http://localhost:3000/userdashboard/logs">Logs</Nav.Link>
            <Nav.Link href="http://localhost:3000/userdashboard/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarScroll;