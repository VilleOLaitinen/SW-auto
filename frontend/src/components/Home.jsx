import React, { useState, useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Button, Container, Row, Stack, Col } from "react-bootstrap";
import tiiaksa from "../../images/tiiaksa.png";
import lada from "../../images/lada.png";
import { Link } from "react-router-dom";

const Home = () => {
  const { logged } = useContext(AuthContext);

  return (
    <Container className="p-3 mx-3 my-3 bg-info rounded-3 shadow-sm">
      {!logged ? (
        <>
          <Button className="me-2 btn-warning" as={Link} to={"/login"}>
            Kirjaudu Sisään
          </Button>
          <Button className="me-2 btn-warning" as={Link} to={"/register"}>
            Rekisteröidy
          </Button>
        </>
      ) : (
        <h3>Hei Erkki Esimerkki!</h3>
      )}
      <Row>
        <Col>
          <Stack>
            <h1 className="header my-3">
              <span className="text-warning">SW</span>
              <span className="">-Auto</span>
            </h1>

            <div>Tiedätkö autosi arvon?</div>
            <div>
              Uusi ja luotettava tapa saada kolmannen osapuolen arvio autostasi!
            </div>

            <Button
              className="mx-1 my-1 shadow-sm btn-warning"
              as={Link}
              to={"/search"}
            >
              Tarkista nyt
            </Button>
            <img src={tiiaksa} alt="tiiaksa" />
          </Stack>
        </Col>

        <Col className="my-3">
          <Stack>
            <img src={lada} alt="lada" />
            <p>Tämä auto (Lada Niva, 2020) arvioitiin SW-Autolla.</p>
            <p>Omistaja ei myynyt autoa, kun arvioksi muodostui 1759€</p>
            <Button
              className="mx-1 my-1 shadow-sm btn-warning"
              as={Link}
              to={"/car"}
            >
              Hae auton tietoja
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
