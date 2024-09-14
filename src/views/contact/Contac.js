import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Pagination,
  Row,
  Table,
  Spinner,
} from 'react-bootstrap'
import { FaEye, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'

function Contac() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleShowModal = (message) => {
    setSelectedMessage(message)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const token = useSelector((state) => state.token)

  const [allEnquiry, setAllEnquiry] = useState([])

  const fetchEnquiryData = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET('/admin/enquiry', token)
      let { success, message, error, data } = res.data || res
      if (success) {
        setAllEnquiry(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
    setLoading(false)
  }

  const deleteEnquiry = async (id) => {
    setLoading(true)
    try {
      let res = await MyAPI.DELETE(`/admin/enquiry/${id}`, token)
      let { success, message, error, data } = res.data || res
      if (success) {
        MyError.success(message)
        fetchEnquiryData()
        setShowModal(false)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEnquiryData()
  }, [token])

  const filteredEnquiries = allEnquiry.filter(
    (contact) =>
      (contact.user.name && contact.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.user.email && contact.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.user.phone && contact.user.phone.includes(searchTerm)),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEnquiries = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <Row>
        <Col md={12}>
          <Container className="bg-white py-3 px-2 rounded-3">
            <Row className="mb-3 d-flex justify-content-end">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2 input-border"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
            <Table className="mt-3" striped responsive hover>
              <thead>
                <tr>
                  <th className="text-center text-white" style={{ background: '#212631' }}>
                    #
                  </th>
                  <th className="text-center text-white" style={{ background: '#212631' }}>
                    Name
                  </th>
                  <th className="text-center text-white" style={{ background: '#212631' }}>
                    Email
                  </th>
                  <th className="text-center text-white" style={{ background: '#212631' }}>
                    Phone
                  </th>
                  <th className="text-center text-white" style={{ background: '#212631' }}>
                    Destination
                  </th>
                  <th
                    className="text-center text-white"
                    style={{ background: '#212631' }}
                    colSpan={2}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <Spinner variant="primary" animation="border" size="sm" />
                    </td>
                  </tr>
                )}
                {!loading && currentEnquiries.length > 0
                  ? currentEnquiries.reverse().map((contact, index) => (
                      <tr key={contact.id}>
                        <td className="text-center text-dark">{index + 1 + indexOfFirstItem}</td>
                        <td className="text-center text-dark">{contact.user.name ?? 'N/A'}</td>
                        <td className="text-center text-dark">{contact.user.email ?? 'N/A'}</td>
                        <td className="text-center text-dark">{contact.user.phone ?? 'N/A'}</td>
                        <td className="text-center text-dark">{contact.destination ?? 'N/A'}</td>
                        {/* <td className="text-center text-dark">
                          <Button size="sm" variant="info" onClick={() => handleShowModal(contact)}>
                            <FaEye size={22} />
                          </Button>
                        </td> */}
                        <td className="text-center text-dark">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => navigate(`/admin/inquiry/${contact._id}`)}
                          >
                            <IoIosAddCircleOutline size={22} />
                          </Button>
                        </td>
                        <td className="text-center text-dark">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteEnquiry(contact._id)}
                          >
                            <MdDelete size={22} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : !loading && (
                      <tr>
                        <td colSpan={8} className="text-center text-dark">
                          No data found
                        </td>
                      </tr>
                    )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First onClick={() => paginate(1)} />
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(Math.ceil(filteredEnquiries.length / itemsPerPage)).keys()].map(
                  (number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ),
                )}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredEnquiries.length / itemsPerPage)}
                />
                <Pagination.Last
                  onClick={() => paginate(Math.ceil(filteredEnquiries.length / itemsPerPage))}
                />
              </Pagination>
            </div>
          </Container>
        </Col>
        {/* Modal for showing details */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className={showModal ? '' : 'd-none'}
          style={{ marginTop: '10vh' }}
        >
          <Modal.Header className="bg-white" closeButton>
            <Modal.Title>Message Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            <Col md={12}>
              <b>Client Id :</b>{' '}
              {selectedMessage && selectedMessage._id ? selectedMessage._id : 'N/A'}
            </Col>
            <Col md={12}>
              <b>Full Name :</b>{' '}
              {selectedMessage && selectedMessage.user.name ? selectedMessage.user.name : 'N/A'}
            </Col>
            <Col md={12}>
              <b>Email :</b>{' '}
              {selectedMessage && selectedMessage.user.email ? selectedMessage.user.email : 'N/A'}
            </Col>
            <Col md={12}>
              <b>Phone :</b>{' '}
              {selectedMessage && selectedMessage.user.phone ? selectedMessage.user.phone : 'N/A'}
            </Col>
            <Col md={12}>
              <b>Message :</b>{' '}
              {selectedMessage && selectedMessage.additionalInfo
                ? selectedMessage.additionalInfo
                : 'N/A'}
            </Col>
          </Modal.Body>
          <Modal.Footer className="bg-white">
            <Button
              variant="danger"
              className="text-white"
              onClick={() => deleteEnquiry(selectedMessage._id)}
            >
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

export default Contac
