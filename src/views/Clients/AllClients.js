import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap'
import { FaEye, FaSearch, FaSwatchbook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

function AllClients() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 10

  const fetchClients = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET('/users')
      let { success, message, error, users } = res.data || res
      if (success) {
        setClients(users)
        setFilteredClients(users)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    filterClients(clients, searchQuery)
  }, [searchQuery, clients])

  const filterClients = (clients, query) => {
    const filtered = clients.filter(
      (client) =>
        client.userName?.toLowerCase().includes(query.toLowerCase()) ||
        client.email?.toLowerCase().includes(query.toLowerCase()) ||
        client.phone?.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredClients(filtered)
    setCurrentPage(1) // Reset to first page on search
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

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
          <Container className="bg-white px-2 rounded-3">
            <Row className="mb-2 justify-content-between">
              <Col md={9}>
                <h5 className="fw-bold">All Clients</h5>
              </Col>
              <Col md={3}>
                <Form>
                  <Form.Group className="mb-3 d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2 input-border"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <Button variant="primary">
                      <FaSearch />
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Table striped responsive hover>
              <thead>
                <tr>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    #
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Customer Id
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Full Name
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Email
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Phone
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    DOB
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Registered Date
                  </th>
                  <th style={{ background: '#212631' }} className="text-white text-truncate">
                    Booking
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <Spinner animation="border" role="status" size="sm" />
                    </td>
                  </tr>
                )}
                {!loading && paginatedClients.length > 0
                  ? paginatedClients.map((client, index) => (
                      <tr key={client._id}>
                        <td className=" text-dark text-truncate">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className=" text-dark text-truncate">{client._id ?? 'NA'}</td>
                        <td className=" text-dark text-truncate">
                          {client.firstName ?? 'NA'} {client.lastName ?? 'NA'}
                        </td>
                        <td className=" text-dark text-truncate">{client.email ?? 'NA'}</td>
                        <td className=" text-dark text-truncate">{client.phone ?? 'NA'}</td>
                        <td className=" text-dark text-truncate">{client.dateOfBirth ?? ''}</td>
                        <td className=" text-dark text-truncate">
                          {client.registeredDate ?? 'NA'}
                        </td>
                        <td className=" cursor-pointer">
                          <FaSwatchbook
                            onClick={() => navigate(`/admin/client/${client._id}/bookings`)}
                            size={22}
                            color="#0984E3"
                          />
                        </td>
                      </tr>
                    ))
                  : !loading && (
                      <tr>
                        <td colSpan={10} className="text-center text-dark">
                          No Data Found
                        </td>
                      </tr>
                    )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-3 mb-3">
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(Math.ceil(filteredClients.length / itemsPerPage)).keys()].map(
                  (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ),
                )}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage)}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(Math.ceil(filteredClients.length / itemsPerPage))}
                  disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage)}
                />
              </Pagination>
            </div>
          </Container>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <b>Client Id :</b> Client Unique Id
          </Col>
          <Col md={12}>
            <b>Full Name :</b> John Smith
          </Col>
          <Col md={12}>
            <b>Email :</b> john-smith@email.com
          </Col>
          <Col md={12}>
            <b>Phone :</b> +1 1234567890
          </Col>
          <Col md={12}>
            <b>Username :</b> @john-smith2020
          </Col>
          <Col md={12}>
            <b>Company Name :</b> Company Name
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/admin/client/123/edit')}>
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
    </>
  )
}

export default AllClients
