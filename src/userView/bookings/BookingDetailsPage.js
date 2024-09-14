import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import { MyAPI } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InvoicePage from '../../components1/InvoicePage'

const BookingDetailsPage = () => {
  const [booking, setBooking] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = useSelector((state) => state.token)
  const { bookingId } = useParams()

  const fetchBooking = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/user/booking/${bookingId}`, token)
      let { success, error, message, booking: myBooking } = res.data || res
      setLoading(false)
      if (success) {
        setBooking(myBooking)
      } else {
        setError(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchBooking()
    }
  }, [token])

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <>
      <InvoicePage booking={booking || {}} />
    </>
  )
}

export default BookingDetailsPage
