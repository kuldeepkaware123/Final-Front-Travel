import React, { useEffect, useState } from 'react'
import { Table, Button, Badge, Container, Form, Pagination, Col, Spinner } from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setBookingData } from '../../store'
import { useNavigate } from 'react-router-dom'

const pageSize = 10

const AllBookings = () => {
  const [bookings, setBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setBookingData({
        packageId: '',
      }),
    )
  }, [])

  const fetchBookings = async (token) => {
    try {
      setLoading(true) // Start loading
      let res = await MyAPI.GET('/admin/bookings/hotels', token)
      let { success, message, error, checkouts } = res.data || res
      console.log(res.data)
      if (success) {
        setBookings(checkouts)
      } else {
        MyError.error(message || error || 'Server Error. Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    fetchBookings(token)
  }, [token])

  //   // Filtered and paginated data
  //   const filteredBookings = bookings.filter(
  //     (booking) =>
  //       booking.rz_order_id.orderId.includes(searchTerm) ||
  //       booking.rz_order_id.razorpay_payment_id.includes(searchTerm) ||
  //       booking.package.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.bookingDate.includes(searchTerm) ||
  //       booking.rz_order_id.status.toLowerCase().includes(searchTerm.toLowerCase()),
  //   )

  //   const totalItems = filteredBookings.length
  //   const totalPages = Math.ceil(totalItems / pageSize)

  // Pagination logic
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  //   const paginatedBookings = filteredBookings.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize,
  //   )

  function formattedDate(date) {
    // Convert the date string to a Date object
    date = new Date(date)

    // Ensure the date is a valid Date object
    if (isNaN(date)) {
      throw new Error('Invalid date')
    }

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return `${months[monthIndex]} ${day} ${year}`
  }
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="poppins">Your Bookings</h5>
        <Col md={3}>
          <Form.Control
            type="text"
            className="input-border"
            placeholder="Search by Booking ID, Package Name, Date, Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                S.No
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Hotel Name
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                User Name
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Phone
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Booking Start Date
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Booking Date
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Total Days
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Total People
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Total Price
              </th>
              <th style={{ background: '#212631' }} className="text-white text-truncate">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td className="text-dark text-truncate" style={{ maxWidth: '100px' }}>
                  {index + 1}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '200px' }}>
                  {booking && booking.hotel ? truncateText(booking.hotel.title, 5) : 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '200px' }}>
                  {booking && booking.user
                    ? truncateText(booking.user.firstName + ' ' + booking.user.lastName, 5)
                    : 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '200px' }}>
                  {booking && booking.user ? truncateText(booking.user.phone, 5) : 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  {booking.bookingStartDate ?? 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  {formattedDate(booking.createdAt) ?? 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  {booking.totalDays ?? 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  {booking.totalPeople ?? 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  {booking.bookingPrice ?? 'N/A'}
                </td>
                <td className="text-dark text-truncate" style={{ maxWidth: '150px' }}>
                  <Badge
                    bg={
                      booking.bookingStatus === 'booked'
                        ? 'success'
                        : booking.bookingStatus === 'cancelled'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {booking.bookingStatus}
                  </Badge>
                </td>
              </tr>
            ))}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  <h5>No bookings found.</h5>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default AllBookings
