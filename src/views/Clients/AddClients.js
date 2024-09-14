import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

function AddClients() {
  return (
    <>
      <Row>
        <Col>
          <h5>Add Client</h5>
        </Col>
      </Row>
      <Container className="shadow px-3 py-3 rounded-4 bg-white">
        <Row>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Customer Unique Id</Form.Label>
              <Form.Control type="text" placeholder="Enter unique ID" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email Address." />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Name" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-3">
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter Password" />
            </Form.Group>
          </Col>
          <Col md={12} className="mt-3">
            <Form.Group controlId="clientAssignDriverCheckbox">
              <Form.Check type="checkbox" label="Client able to assign the drivers" />
            </Form.Group>
          </Col>
          <br />
          <Col md={3} className="mt-3">
            <Button className="border-0" style={{ backgroundColor: '#2ECC71' }} size="small">
              Add Client
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddClients
