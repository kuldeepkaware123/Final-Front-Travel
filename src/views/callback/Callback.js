import React, { useEffect, useState } from 'react'
import { Table, Form, Modal, Button, Col, Row, Pagination, Spinner } from 'react-bootstrap'
import { MyAPI, MyError, MyToken } from '../../MyAPI'
import { useSelector } from 'react-redux'

const Callback = () => {
  const token = useSelector((state) => state.token)
  // Dummy data
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAllCallback = async () => {
    // API call to fetch all callback data
    try {
      let res = await MyAPI.GET('/admin/callbacks', token)
      let { success, message, error, callBacks } = res.data || res
      console.log(res.data)
      if (success) {
        setData(callBacks)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllCallback()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState('')

  const recordsPerPage = 10

  // Filtering data based on search term
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm),
  )

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle row click to show message
  const handleRowClick = (message) => {
    setSelectedMessage(message)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/callback/${id}`, token)
      let { success, message, error, callBacks } = res.data || res
      if (success) {
        MyError.success(message)
        fetchAllCallback()
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      {/* Search bar */}
      <Row className="d-flex align-items-center justify-content-end">
        <Col md={3}>
          <Form className="mt-3 mb-3">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                className="input-border"
                placeholder="Search by name, email, or phone"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {/* Table */}
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              S.no.
            </th>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              Name
            </th>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              Email
            </th>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              Phone
            </th>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              Message (200 words)
            </th>
            <th style={{ background: '#212631' }} className="text-dark  text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <Spinner animation="border" variant="primary" size="sm" />
              </td>
            </tr>
          ) : currentRecords && currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id}>
                <td className="text-dark">{index + 1}</td>
                <td className="text-dark">{item.name}</td>
                <td className="text-dark">{item.email}</td>
                <td className="text-dark">{item.phone}</td>
                <td
                  onClick={() => handleRowClick(item.message)}
                  className="text-dark cursor-pointer"
                >
                  {item.message.substring(0, 20)}...
                </td>
                <td className="text-dark">
                  <Button onClick={() => handleDelete(item._id)} size="sm" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-dark">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mb-4">
        <Pagination>
          {Array.from({ length: Math.ceil(filteredData.length / recordsPerPage) }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              onClick={() => paginate(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Message Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="bg-white" closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">{selectedMessage}</Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Callback
