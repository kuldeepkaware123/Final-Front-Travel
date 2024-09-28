import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Pagination, Row, Table, Spinner } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

const AllHotel = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const [hotels, setHotels] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false) // New state for loading
  const recordsPerPage = 10

  const fetAllhotels = async () => {
    setLoading(true) // Set loading to true before fetching
    try {
      let res = await MyAPI.GET(`/hotel`, token)
      let { success, message, error, data } = res.data || res
      // console.log(res.data)

      if (success) {
        setHotels(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  useEffect(() => {
    fetAllhotels()
  }, [token])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const filteredhotels = hotels.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery) ||
      item._id.toLowerCase().includes(searchQuery) ||
      new Date(item.createdAt).toISOString().split('T')[0].includes(searchQuery),
  )

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredhotels.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredhotels.length / recordsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteHotel = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/hotel/${id}`, token)
      let { success, message, error } = res.data || res

      if (success) {
        fetAllhotels()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleChangeStatus = async (hotelId, status) => {
    try {
      let formData = new FormData()
      if (status === 'active') {
        formData.append('status', 'inactive')
      } else {
        formData.append('status', 'active')
      }

      let res = await MyAPI.PUT(`/hotel/${hotelId}`, formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetAllhotels()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }
  return (
    <>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              S.No
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Hotel ID
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Hotel Title
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Publish Date
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Status
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <Spinner variant="primary" size="sm" animation="border" />
              </td>
            </tr>
          ) : currentRecords.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td className="text-dark">{indexOfFirstRecord + index + 1}</td>
                <td className="text-dark">{item._id}</td>
                <td className="text-dark">
                  {item.title.split(' ').slice(0, 10).join(' ')}
                  {item.title.split(' ').length > 10 ? '...' : ''}
                </td>
                <td className="text-dark">
                  {new Date(item.createdAt).toISOString().split('T')[0]}
                </td>
                <td className="text-dark">
                  <Form.Check
                    type="switch"
                    id={`custom-switch-${index}`}
                    onClick={() => handleChangeStatus(item._id, item.status)}
                    defaultChecked={item.status === 'active'}
                  />
                </td>
                <td className="d-flex gap-2 text-dark">
                  <Button
                    onClick={() => navigate(`/admin/hotels/edit/${item._id}`)}
                    variant="warning"
                    className="mr-2"
                  >
                    <CiEdit size={22} />
                  </Button>
                  <Button onClick={() => handleDeleteHotel(item._id)} variant="danger">
                    <MdDelete size={22} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mb-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex}
              active={pageIndex + 1 === currentPage}
              onClick={() => paginate(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  )
}

export default AllHotel
