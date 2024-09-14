import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import {
  FaBoxOpen,
  FaEye,
  FaMapMarkedAlt,
  FaRegEdit,
  FaSearch,
  FaTruckMoving,
} from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useColorModes } from '@coreui/react'

function AllClientsJob() {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  console.log(colorMode)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <Row>
        <Col md={12}>
          <Container className="bg-white py-3 px-2 rounded-3">
            <Row className="mb-3 d-flex justify-content-between ">
              <Col md={12} className="d-flex align-items-center justify-content-between gap-2 ">
                <div className="d-flex align-items-center gap-2">
                  show
                  <Col md={4}>
                    <Form.Select>
                      <option>10</option>
                      <option>20</option>
                      <option>30</option>
                    </Form.Select>
                  </Col>
                  entries
                </div>
                <Col md={8} className="d-flex align-items-center">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <Form.Control type="text" placeholder="Search" />
                  </div>
                </Col>
              </Col>
            </Row>
            <Table className="mt-3" striped responsive hover>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Job Id</th>
                  <th className="text-center">Ref No</th>
                  <th className="text-center">Customer Id</th>
                  <th className="text-center">Driver Name</th>
                  <th className="text-center">AWB</th>
                  <th className="text-center">Ready Time</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Booking Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center" colSpan={4}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">12345</td>
                  <td className="text-center">REF123</td>
                  <td className="text-center">CUST001</td>
                  <td className="text-center">John Doe</td>
                  <td className="text-center">AWB001</td>
                  <td className="text-center">10:00 AM</td>
                  <td className="text-center">2 HR</td>
                  <td className="text-center">2024/04/30</td>
                  <td className="text-center">
                    <div
                      className="px-1 py-1 rounded-5"
                      style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                    >
                      Active
                    </div>
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaEye size={22} color="#0984E3" />
                    {/* <FaEye onClick={handleShowModal} size={22} color="#0984E3" /> */}
                  </td>
                  <td className="text-center cursor-pointer">
                    <FaRegEdit
                      onClick={() => navigate('/client/edit/123')}
                      size={22}
                      color="#624DE3"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </Container>
        </Col>
        {/* Modal for showing details */}
        <Modal show={showModal} onHide={handleCloseModal} style={{ marginTop: '10vh' }}>
          <Modal.Header closeButton>
            <Modal.Title>Client Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md={12}>
              <b>Client Id :</b> Client Unique Id{' '}
            </Col>
            <Col md={12}>
              <b>Full Name :</b> John Smith{' '}
            </Col>
            <Col md={12}>
              <b>Email :</b> john-smith@email.com{' '}
            </Col>
            <Col md={12}>
              <b>Phone :</b> +1 1234567890{' '}
            </Col>
            <Col md={12}>
              <b>Username :</b> @john-smith2020{' '}
            </Col>
            <Col md={12}>
              <b>Company Name :</b> Company Name{' '}
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => navigate('/client/edit/123')}>
              Edit
            </Button>
            <Button variant="danger" className="text-white" onClick={handleCloseModal}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  )
}

export default AllClientsJob
