import React, { useContext } from "react";
import { Button, Container, Row, Stack, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const Login = () => {
  const { setLogged } = useContext(AuthContext);
  return (
    <Container className="p-3 mx-3 my-3 bg-info rounded-3 shadow-sm">
      <h1 className="header my-3">
        <span className="text-warning">SW</span>
        <span className="">-Auto</span>
      </h1>
      <Form>
        <h4>Käyttäjätunnus</h4>
        <input></input>
        <h4>Salasana</h4>
        <input type={"password"}></input>
        <div></div>
        <Button
          onClick={() => setLogged(true)}
          className="mx-1 my-3 shadow-sm btn-warning"
          as={Link}
          to={"/"}
        >
          Kirjaudu Sisään
        </Button>
        <Button className="mx-1 my-3 shadow-sm btn-warning" as={Link} to={"/"}>
          Peruuta
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
