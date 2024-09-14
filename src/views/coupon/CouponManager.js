import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Table,
  Modal,
  Row,
  Col,
  InputGroup,
  FormControl,
  Pagination,
} from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

const CouponManager = () => {
  const token = useSelector((state) => state.token)

  const [coupons, setCoupons] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentCoupon, setCurrentCoupon] = useState({
    code: '',
    discount: '',
    expireAt: '',
    limit: '',
  })
  const [editIndex, setEditIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const couponsPerPage = 10

  const fetchCoupons = async () => {
    try {
      let res = await MyAPI.GET('/admin/coupon', token)
      let { success, error, message, data } = res.data || res
      console.log(res.data)
      if (success) {
        setCoupons(data.reverse())
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [token])

  const handleShow = () => setShowModal(true)
  const handleClose = () => {
    setShowModal(false)
    setCurrentCoupon({ code: '', discount: '', expireAt: '', limit: '' })
    setEditIndex(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCoupon({ ...currentCoupon, [name]: value })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2) // Months are zero indexed
    const day = `0${date.getDate()}`.slice(-2)

    return `${year}-${month}-${day}`
  }

  const handleSaveCoupon = async () => {
    if (!currentCoupon.code) {
      return MyError.warn('Enter Coupon Code')
    }

    if (!currentCoupon.discount) {
      return MyError.warn('Enter Discount')
    }

    if (!currentCoupon.expireAt) {
      return MyError.warn('Select Expire At')
    }

    if (!currentCoupon.limit) {
      return MyError.warn('Enter Limit')
    }

    try {
      if (editIndex !== null) {
        let res = await MyAPI.PUT(`/admin/coupon/${currentCoupon._id}`, currentCoupon, token)
        let { success, message, error } = res.data || res
        if (success) {
          fetchCoupons()
          MyError.success(message)
          handleClose()
          setEditIndex(null)
        } else {
          MyError.error(message || error || 'Server Error Please try again later')
        }
      } else {
        let res = await MyAPI.POST('/admin/coupon', currentCoupon, token)
        let { success, message, error } = res.data || res
        if (success) {
          MyError.success(message)
          fetchCoupons()
          setCurrentCoupon({ code: '', discount: '', expireAt: '', limit: '' })
          handleClose()
        } else {
          MyError.error(message || error || 'Server Error Please try again later')
        }
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleEditCoupon = (index) => {
    setCurrentCoupon(coupons[index])
    setEditIndex(index)
    handleShow()
  }

  const handleDeleteCoupon = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/coupon/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        fetchCoupons()
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.discount.toString().toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastCoupon = currentPage * couponsPerPage
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage
  const currentCoupons = filteredCoupons.slice(indexOfFirstCoupon, indexOfLastCoupon)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage)

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" onClick={handleShow}>
          Add Coupon
        </Button>
        <Col md={3}>
          <InputGroup>
            <FormControl
              placeholder="Search Coupons"
              aria-label="Search Coupons"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-white" style={{ background: '#212631' }}>
              Code
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Percentage
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Expiry Date
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Usage Limit
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCoupons.length > 0 ? (
            currentCoupons.map((coupon, index) => (
              <tr key={index}>
                <td className="text-dark">{coupon.code}</td>
                <td className="text-dark">{coupon.discount}</td>
                <td className="text-dark">{formatDate(coupon.expireAt)}</td>
                <td className="text-dark">{coupon.limit}</td>
                <td className="text-dark">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => handleEditCoupon(index)}
                  >
                    <CiEdit size={22} />
                  </Button>
                  <Button
                    className="ms-2"
                    variant="danger"
                    onClick={() => handleDeleteCoupon(coupon._id)}
                  >
                    <MdDelete size={22} color="#fff" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-dark">
                Coupon data not found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-4 mb-4">
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal className="rounded-3" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Coupon' : 'Add Coupon'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formTitle">
                <Form.Label>Coupon Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  className="input-border"
                  placeholder="Enter Coupon Code"
                  value={currentCoupon.code}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formPercentage">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  className="input-border"
                  placeholder="Enter Discount Percentage"
                  value={currentCoupon.discount}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formExpiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expireAt"
                  className="input-border"
                  value={editIndex ? formatDate(currentCoupon.expireAt) : currentCoupon.expireAt}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formUsageLimit">
                <Form.Label>Usage Limit</Form.Label>
                <Form.Control
                  type="number"
                  name="limit"
                  className="input-border"
                  placeholder="Enter Usage Limit"
                  value={currentCoupon.limit}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCoupon}>
            {editIndex !== null ? 'Save Changes' : 'Add Coupon'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CouponManager
