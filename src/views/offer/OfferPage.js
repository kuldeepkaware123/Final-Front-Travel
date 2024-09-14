import React, { useEffect, useState } from 'react'
import {
  Table,
  Form,
  Button,
  Pagination,
  Col,
  Row,
  InputGroup,
  FormControl,
  Badge,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function OfferPage() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [packages, setPackages] = useState([])
  const [selectedPackages, setSelectedPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true) // New loading state
  const recordsPerPage = 10

  const getAllPackages = async () => {
    try {
      let res = await MyAPI.GET('/admin/offer/packages?isOffered=true', token)
      let { success, packages, message, error } = res.data || res
      if (success) {
        setPackages(packages)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      setLoading(false) // Set loading to false after data is fetched
    } catch (error) {
      MyError.error(error.message)
      setLoading(false) // Set loading to false in case of error
    }
  }

  useEffect(() => {
    getAllPackages()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleSelectPackage = (e, packageId) => {
    if (e.target.checked) {
      setSelectedPackages([...selectedPackages, packageId])
    } else {
      setSelectedPackages(selectedPackages.filter((id) => id !== packageId))
    }
  }

  const removeOffer = async (delete_id) => {
    try {
      let res = await MyAPI.POST('/admin/offer/remove', { packageIds: [`${delete_id}`] }, token)
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('Offer Removed Successfully.')
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const filteredPackages = packages.filter((pkg) => {
    const dateFormatted = format(new Date(pkg.createdAt), 'yyyy-MM-dd')
    return (
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.some((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.tripType.some((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.costOptions.totalPrice.toString().includes(searchTerm.toLowerCase()) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateFormatted.includes(searchTerm.toLowerCase())
    )
  })

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredPackages.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredPackages.length / recordsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  return (
    <div>
      <Row className="d-flex align-items-center justify-content-end mb-3">
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

      {/* {loading ? ( // Show spinner while loading
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '50vh' }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredPackages.length === 0 ? ( // Show "No data found" if no packages are found
        <Alert variant="info" className="text-center">
          No data found.
        </Alert>
      ) : (
        <> */}
      <Table striped bordered hover responsive className="mb-3">
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
              Original Price
            </th>
            <th style={{ background: '#212631' }} className="text-white text-truncate">
              Discount
            </th>
            <th style={{ background: '#212631' }} className="text-white text-truncate">
              Offer Price
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
          {currentRecords &&
            currentRecords.length > 0 &&
            currentRecords.map((item, index) => (
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
                <td className="text-dark text-truncate">
                  {item.fixedDeparture.type === true
                    ? item.fixedDeparture.tripleSharing.totalPrice
                    : item.costOptions.totalPrice}
                </td>
                <td className="text-dark text-truncate">
                  {item.offer.type === 'percentage'
                    ? `${item.offer.value}%`
                    : `${item.offer.value}`}
                </td>
                <td className="text-dark text-truncate">
                  {parseInt(
                    calculateDiscountedPrice(
                      item.offer.type,
                      item.fixedDeparture.type === true
                        ? item.fixedDeparture.tripleSharing.totalPrice
                        : item.costOptions.totalPrice,
                      item.offer.value,
                    ),
                  )}
                </td>
                <td className="text-dark text-truncate">
                  {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                </td>
                <td className="text-dark text-truncate">
                  <Button onClick={() => removeOffer(item._id)} size="sm" variant="danger">
                    <MdDelete size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          {!loading && currentRecords && currentRecords.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center">
                <p className="text-dark">No offers found</p>
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={10} className="text-center">
                <Spinner animation="border" variant="primary" role="status" size="sm" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mb-3">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
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
      {/* </>
      )} */}
    </div>
  )
}

export default OfferPage
