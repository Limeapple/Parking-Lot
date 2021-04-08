import { Navbar, Nav, Form } from "react-bootstrap";

const Bar = ({ history }) => {
  return (
    <Navbar style={container}>
      <Navbar.Brand>Parking App</Navbar.Brand>
      <Nav className='mr-auto' />
      <Form inline></Form>
      <Navbar.Brand
        style={logoutStyle}
        onClick={() => {
          history.push("/");
          localStorage.removeItem("token");
          window.location.reload();
        }}>
        Logout
      </Navbar.Brand>
    </Navbar>
  );
};

const container = {
  background: "hsla(0, 0%, 17%, 1)",
  height: "10%",
};

const logoutStyle = {
  paddingLeft: 20,
  cursor: "pointer",
};

export default Bar;
