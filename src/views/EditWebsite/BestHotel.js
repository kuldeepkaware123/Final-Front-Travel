import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Pagination, Col, Row, Spinner } from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const BestHotel = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [hotels, setHotels] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noDataFound, setNoDataFound] = useState(false)
  const recordsPerPage = 10

  const getAllHotels = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET('/hotel', token)
      let { success, data, message, error } = res.data
      console.log(res.data)

      if (success) {
        setHotels(data)
        setNoDataFound(data.length === 0)
      } else {
        MyError.error(message || error || 'API Error.')
        setNoDataFound(true)
      }
    } catch (error) {
      MyError.error(error.message)
      setNoDataFound(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllHotels()
  }, [])

  const updateHotelStatus = async (id, status) => {
    try {
      let res = await MyAPI.PUT(`/admin/hotel/featured/${id}`,{}, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllHotels()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredHotels = hotels.filter((pkg) => {
    const dateFormatted = format(new Date(pkg.createdAt), 'yyyy-MM-dd')
    return (
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.tripType.some((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateFormatted.includes(searchTerm.toLowerCase())
    )
  })

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredHotels.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredHotels.length / recordsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <h5>Best Hotels</h5>
        </Col>
        <Col md={4}>&nbsp;</Col>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : noDataFound ? (
        <div className="text-center">No data found</div>
      ) : (
        <>
          <Table striped bordered responsive hover className="mb-3">
            <thead>
              <tr>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  S.No
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Title
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Destination
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Trip Type
                </th>

                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Price
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Status
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Date
                </th>
                <th style={{ background: '#212631' }} className="text-white text-truncate">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.reverse().map((item, index) => (
                <tr key={index}>
                  <td className="text-dark text-truncate">{indexOfFirstRecord + index + 1}</td>
                  <td className="text-dark text-truncate">{truncateText(item.title, 5)}</td>
                  <td className="text-dark text-truncate">
                    {item.destination.map((d, i) => (
                      <span key={i}>
                        {d.name}
                        {i < item.destination.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="text-dark text-truncate">
                    {item.tripType.map((t, i) => (
                      <span key={i}>
                        {t.name}
                        {i < item.tripType.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>

                  <td className="text-dark text-truncate">{item?.pricePerPerson}</td>
                  <td className="text-dark text-truncate">
                    <Form.Check
                      checked={item.isFeatured}
                      onClick={() => updateHotelStatus(item._id, !item.isFeatured)}
                      type="switch"
                      id="custom-switch"
                    />
                  </td>
                  <td className="text-dark text-truncate">
                    {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                  </td>
                  <td className="d-flex gap-2 text-dark text-truncate">
                    <Button variant="secondary">
                      <FaEye onClick={() => navigate(`/hotel/package/${item._id}`)} size={22} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center mb-3">
            <Pagination>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}
    </div>
  )
}

export default BestHotel
