import React from 'react';
import { Button, Container, Row, Stack, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import lada from '../../images/lada.png'
import { Link } from 'react-router-dom'

const MergeConflict = () => {
  return (
    <Container
    className='p-3 mx-3 my-3 bg-info rounded-3 shadow-sm'>
      <Row>
        <Col>
          <Stack>
          <h1 className='header my-3'>
            <span className="text-warning">SW</span>
            <span className="">-Auto</span>
          </h1>

          <div>Röyh</div>
          <div>Uusi ja luotettava tapa saada kolmannen osapuolen arvio autostasi!</div>

          <h6 className='my-3 pt-4'>Syötä rekisteritunnuksesi ja me etsimme autosi tiedot!</h6>

          <Form>
            <input defaultValue={'Kummallisuuksia luvassa'}></input>
            <Container
            className='p-3 mx-3 my-3 bg-info rounded-3 shadow-sm'>
              <Row>
                <Col className='my-3'>
                  <Form.Check 
                    id={`turvatyynyt`}
                    label={`Turvatyynyt`}
                  />
                  <Form.Check 
                    id={`abs`}
                    label={`ABS-jarrut`}
                  />
                    <Form.Check 
                    id={`taustapeili`}
                    label={`Taustapeili`}
                  />
                    <Form.Check 
                    id={`ilmastointi`}
                    label={`Ilmastointi`}
                  />
                </Col>

                <Col className='my-3'>
                  <Form.Check 
                    id={`turvavyö`}
                    label={`Turvavyö`}
                  />
                  <Form.Check 
                    id={`kevytmetallivanteet`}
                    label={`Kevytmetallivanteet`}
                  />
                    <Form.Check 
                    id={`peruutuskamera`}
                    label={`Peruutuskamera`}
                  />
                    <Form.Check 
                    id={`startstop`}
                    label={`Start-stop`}
                  />
                </Col>

                <Col className='my-3'>
                  <Form.Check 
                    id={`peruutustutka`}
                    label={`Peruutustutka`}
                  />
                  <Form.Check 
                    id={`tummennetutlasit`}
                    label={`Tummennetut etulasit`}
                  />
                    <Form.Check 
                    id={`navigointi`}
                    label={`Navigointijärjestelmä`}
                  />
                    <Form.Check 
                    id={`vakionopeudensäädin`}
                    label={`Vakionopeudensäädin`}
                  />
                </Col>
              </Row>
            </Container>
          </Form>

          <Button className='mx-1 my-1 shadow-sm btn-warning' as={Link} to={'/'}>Tarkista nyt</Button>
          </Stack>
        </Col>

        <Col className='my-3'>
          <Stack>
            <img src={lada} alt="lada" />
            <p>Tämä auto (Lada Niva, 2020) arvioitiin SW-Autolla.</p>
            <p>Ja tämäkin muutettu?</p>
          </Stack>
        </Col>
      </Row>
    </Container>

  )
}

export default MergeConflict