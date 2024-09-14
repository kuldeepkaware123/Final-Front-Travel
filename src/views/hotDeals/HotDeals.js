import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Pagination, Col, Row, Spinner } from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { calculateDiscountedPrice, MyAPI, MyError, truncateText } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function HotDeals() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const [loading, setLoading] = useState(false)

  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getAllPackages = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET('/admin/package', token)
      setLoading(false)
      let { success, packages, message, error } = res.data || res
      if (success) {
        setPackages(packages)
        filterPackages(packages, searchQuery)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res.data)
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    getAllPackages()
  }, [])

  const filterPackages = (packages, query) => {
    let filtered = packages.filter(
      (item) =>
        (item.offer || item.hotDeals) &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.destination.some((dest) => dest.name.toLowerCase().includes(query.toLowerCase()))),
    )
    setFilteredPackages(filtered)
  }

  useEffect(() => {
    filterPackages(packages, searchQuery)
  }, [searchQuery, packages])

  const updatePackageStatus = async (id, status) => {
    try {
      let formData = new FormData()
      formData.append('hotDeals', !status)

      let res = await MyAPI.PUT(`/admin/package/${id}`, formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('Hot deal status updated.')
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              S.No
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Title
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Location
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Original Price
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Discount
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Offer Price
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Status
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Date
            </th>
            <th className="text-white text-truncate" style={{ background: '#212631' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={9} className="text-center text-dark">
                <Spinner size="sm" animation="border" variant="primary" />
              </td>
            </tr>
          )}

          {paginatedPackages &&
            paginatedPackages.length > 0 &&
            paginatedPackages.map((item, index) => (
              <tr key={item._id}>
                <td className="text-dark text-truncate">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="text-dark text-truncate">{truncateText(item.title, 5)}</td>
                <td className="text-dark text-truncate">
                  {item.destination.map((dest) => dest.name).join(', ')}
                </td>
                <td className="text-dark text-truncate">
                  {item.fixedDeparture.type === true
                    ? item.fixedDeparture.tripleSharing.totalPrice
                    : item.costOptions.totalPrice}
                </td>
                <td className="text-dark text-truncate">
                  {item.offer
                    ? item.offer.type === 'percentage'
                      ? `${item.offer.value}%`
                      : `${item.offer.value}`
                    : 'Offer Removed'}
                </td>
                <td className="text-dark text-truncate">
                  {item.offer
                    ? parseInt(
                        calculateDiscountedPrice(
                          item.offer.type,
                          item.fixedDeparture.type === true
                            ? item.fixedDeparture.tripleSharing.totalPrice
                            : item.costOptions.totalPrice,
                          item.offer.value,
                        ),
                      )
                    : item.fixedDeparture.type === true
                      ? item.fixedDeparture.tripleSharing.totalPrice
                      : item.costOptions.totalPrice}
                </td>
                <td className="text-dark text-truncate">
                  <Form.Check
                    checked={item.hotDeals}
                    onClick={() => updatePackageStatus(item._id, item.hotDeals)}
                    type="switch"
                    id="custom-switch"
                  />
                </td>
                <td className="text-dark text-truncate">
                  {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                </td>
                <td className="d-flex gap-2 text-dark">
                  <Button variant="secondary">
                    <FaEye size={22} />
                  </Button>
                </td>
              </tr>
            ))}
          {!loading && paginatedPackages && paginatedPackages.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-dark">
                No packages found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Bottom pagination section */}
      {filteredPackages && filteredPackages.length > 0 && (
        <div className="d-flex justify-content-center mt-3 mb-3">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(filteredPackages.length / itemsPerPage)).keys()].map(
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
              disabled={currentPage === Math.ceil(filteredPackages.length / itemsPerPage)}
            />
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default HotDeals
