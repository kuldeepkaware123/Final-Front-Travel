import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Spinner, Badge } from 'react-bootstrap'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEye } from 'react-icons/fa'

function BookingPage() {
  const { id } = useParams()
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [checkoutData, setCheckOutData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchClientByBookings = async (token, id) => {
    try {
      let res = await MyAPI.GET(`/admin/user/bookings/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        let { checkouts, user } = res.data.data
        setUserData(user || null)
        setCheckOutData(checkouts || null)
      } else {
        MyError.error(message || error || 'Server Error, please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && id) {
      fetchClientByBookings(token, id)
    }
  }, [token, id])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '80vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  return (
    <Container>
      {/* Client details */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header className="bg-dark text-white">Client Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Title className="text-dark">
                    <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
                  </Card.Title>
                  <Card.Text className="text-dark">
                    <strong>User ID:</strong> {userData?._id}
                    <br />
                    <strong>Email:</strong> {userData?.email}
                    <br />
                    {/* <strong>Registered Date:</strong> {clientDetails.registeredDate} */}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>DOB:</strong> {formatDate(userData?.dateOfBirth)}
                    <br />
                    <strong>Gender:</strong> {userData?.gender}
                    <br />
                    <strong>Phone:</strong> {userData?.phone}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Package booking details */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-dark text-white">Package Booking Details</Card.Header>
            <Card.Body>
              {checkoutData && checkoutData.length > 0 ? (
                <Table striped responsive bordered hover>
                  <thead>
                    <tr>
                      <th className="text-dark text-truncate">S.no</th>
                      <th className="text-dark text-truncate">Order ID</th>
                      <th className="text-dark text-truncate">Payment ID</th>
                      <th className="text-dark text-truncate">Package Name</th>
                      <th className="text-dark text-truncate">Booking Date</th>
                      <th className="text-dark text-truncate">Final Amount</th>
                      <th className="text-dark text-truncate">Paid Amount</th>
                      <th className="text-dark text-truncate">Status</th>
                      <th className="text-dark text-truncate">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkoutData.map((booking, index) => (
                      <tr key={index}>
                        <td className="text-dark text-truncate">{index + 1}</td>
                        <td className="text-dark text-truncate">{booking.rz_order_id.orderId}</td>
                        <td className="text-dark text-truncate">
                          {booking.rz_order_id.razorpay_payment_id}
                        </td>
                        <td className="text-dark text-truncate">
                          {truncateText(booking?.package?.title || 'Booking Title Not Found', 5)}
                        </td>
                        <td className="text-dark text-truncate">
                          {formatDate(booking.bookingDate)}
                        </td>
                        <td className="text-dark text-truncate">{booking.price.finalPrice}</td>
                        <td className="text-dark text-truncate">
                          {booking.rz_order_id.amount / 100}
                        </td>
                        <td className="text-dark text-truncate">
                          <Badge bg={booking.rz_order_id.status === 'paid' ? 'success' : 'danger'}>
                            {booking.rz_order_id.status === 'paid' ? 'Paid' : 'Failed'}
                          </Badge>
                        </td>
                        <td className="text-dark">
                          <Button
                            onClick={() => navigate(`/admin/booking/${booking._id}`)}
                            variant="info"
                            size="sm"
                            className="me-2"
                          >
                            <FaEye size={22} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-dark">No booking details found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BookingPage
