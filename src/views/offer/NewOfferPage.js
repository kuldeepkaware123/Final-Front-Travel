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
} from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

function NewOfferPage() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  const [packages, setPackages] = useState([])
  const [selectedPackages, setSelectedPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [discount, setDiscount] = useState('')
  const [discountType, setDiscountType] = useState('percentage')
  const [loading, setLoading] = useState(false)
  const recordsPerPage = 10

  const getAllPackages = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET('/admin/offer/packages?isOffered=false', token)
      let { success, packages, message, error } = res.data || res
      if (success) {
        const filteredDestinations = packages.filter((destination) => !destination.isPrivate)
        setPackages(filteredDestinations)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res.data)
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
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

  const applyDiscount = async () => {
    if (!discount) {
      return MyError.error('Discount cannot be empty')
    }

    if (selectedPackages.length === 0) {
      return MyError.warn('Please Select Package')
    }

    let packageIds = []
    selectedPackages.forEach((id) => {
      packageIds.push(id)
    })

    try {
      let res = await MyAPI.POST(
        '/admin/offer/packages',
        {
          type: discountType === 'percentage' ? 'percentage' : 'price',
          value: discount,
          packageIds,
        },
        token,
      )
      let { success, message, error } = res.data || res
      if (success) {
        getAllPackages()
        MyError.success('Offer Successfully applied')
        setSelectedPackages([])
        setDiscount('')
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
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

      <Row className="mb-3">
        <Col md={6} className="d-flex">
          <InputGroup className="d-flex">
            <FormControl
              placeholder="Discount"
              aria-label="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Form.Select
              aria-label="Discount type"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </Form.Select>
            <Button onClick={applyDiscount}>Apply Discount</Button>
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="mb-3">
        <thead>
          <tr>
            <th style={{ background: '#212631' }} className="text-white text-truncate">
              Select
            </th>
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
            {/* <th className="text-dark">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            currentRecords.length > 0 &&
            currentRecords.reverse().map((item, index) => (
              <tr key={index}>
                <td className="text-dark text-truncate">
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => handleSelectPackage(e, item._id)}
                    checked={selectedPackages.includes(item._id)}
                  />
                </td>
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
                <td className="text-dark text-truncate">{item.costOptions.totalPrice}</td>
                <td className="text-dark text-truncate">
                  <Badge
                    bg={item.status === 'active' ? 'success' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => updatePackageStatus(item._id, item.status)}
                  >
                    {item.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="text-dark text-truncate">
                  {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                </td>
              </tr>
            ))}
          {!loading && currentRecords.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-dark">
                No Data Found
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={8} className="text-center">
                <Spinner variant="primary" animation="border" role="status" size="sm"></Spinner>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mb-3 mt-3">
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
    </div>
  )
}

export default NewOfferPage
