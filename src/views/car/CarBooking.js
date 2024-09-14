import React from 'react'
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

function CarBooking() {
  const data = [
    {
      carName: 'Toyota',
      carModel: 'Corolla',
      bookingPerson: 'John Doe',
      phone: '123-456-7890',
      duration: '3 days',
    },
    {
      carName: 'Honda',
      carModel: 'Civic',
      bookingPerson: 'Jane Smith',
      phone: '987-654-3210',
      duration: '2 days',
    },
    // Add more booking data as needed
  ]
  return (
    <>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control className="input-border" type="text" placeholder="Search" />
          </Form.Group>
        </Col>
        {/* <Button variant="primary">Filter</Button> */}
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-dark">S.No</th>
            <th className="text-dark">Car Name</th>
            <th className="text-dark">Car Model</th>
            <th className="text-dark">Booking Person</th>
            <th className="text-dark">Phone</th>
            <th className="text-dark">Duration</th>
            <th className="text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="text-dark">{index + 1}</td>
              <td className="text-dark">{item.carName}</td>
              <td className="text-dark">{item.carModel}</td>
              <td className="text-dark">{item.bookingPerson}</td>
              <td className="text-dark">{item.phone}</td>
              <td className="text-dark">{item.duration}</td>
              <td className="d-flex gap-2 text-dark">
                <Button variant="info" className="mr-2">
                  <FaCheck />
                </Button>
                <Button variant="danger">
                  <IoMdClose size={22} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  )
}

export default CarBooking
