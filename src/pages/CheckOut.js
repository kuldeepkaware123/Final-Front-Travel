/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useNavigate } from 'react-router-dom'
import { MyAPI, MyError, RZ_API_KEY, truncateText } from '../MyAPI'
import '../css/offerTag.css'
import EnquiryButton from '../components1/EnquiryButton'
import { Button, Card, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { countryList } from './countryName'
import { useDispatch, useSelector } from 'react-redux'
import useRazorpay from 'react-razorpay'
import axios from 'axios'
import { setBookingData, setIsBookingClicked } from '../store'

function CheckOut() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const token = useSelector((state) => state.token)
  const booking = useSelector((state) => state.booking)

  const fetchPackage = async (id) => {
    try {
      let res = await MyAPI.GET(`/admin/package/${id}`)
      let { success, message, error, packageExist } = res.data || res
      if (success) {
        setData(packageExist)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchProfile = async (token) => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/user/profile', token)
      let { success, error, message, user } = res.data || res
      setLoading(false)
      if (success) {
        setFirstName(user.firstName ?? '')
        setLastName(user.lastName ?? '')
        setCountry(user.country ?? 'India')
        setPhone(user.phone ?? '')
        // setAddress(user.address ?? '')
        setEmail(user.email ?? '')
        setDOB(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '')
        setGender(user.gender ?? 'Male')
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    dispatch(setIsBookingClicked(true))
    if (token) {
      fetchProfile(token)
    }
    if (booking && booking.packageId) {
      fetchPackage(booking.packageId)
    }
    if (!booking || !booking.packageId) {
      navigate('/')
    }
  }, [booking])

  function formattedDate(date) {
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

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('Male')
  const [country, setCountry] = useState('India')
  const [dob, setDOB] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [note, setNote] = useState('')
  const [bookingOption, setBookingOption] = useState('payment')
  const [paymentMode, setPaymentMode] = useState('full')

  const [couponCode, setCouponCode] = useState('')
  const [applyCoupon, setApplyCoupon] = useState({})

  function calculatePartialPayment(totalAmount, percentage) {
    console.log('partial amount', {
      totalAmount,
      percentage,
      retenAm: (totalAmount * percentage) / 100,
    })
    return (totalAmount * percentage) / 100
  }

  const [orderId, setOrderId] = useState('')
  const [rz_order, setRZOrder] = useState(null)
  const [Razorpay] = useRazorpay()

  // const [bookingId, setBookingId] = useState('')

  const handleSubmitCheckOut = async (totalAmount, partialAmount) => {
    if (!firstName || !lastName) {
      return MyError.warn('Please Enter Name')
    }
    if (!email) {
      return MyError.warn('Please Enter Email')
    }
    if (!phone) {
      return MyError.warn('Please Enter Phone')
    }
    if (!dob) {
      return MyError.warn('Please Enter Date of Birth')
    }
    if (!address) {
      return MyError.warn('Please Enter Address')
    }
    if (!city) {
      return MyError.warn('Please Enter City')
    }

    if (!zip) {
      return MyError.warn('Please Enter Zip Code')
    }

    if (!country) {
      return MyError.warn('Please Select Country')
    }

    console.log({ totalAmount, partialAmount })
    setLoading(true)
    try {
      const response = await MyAPI.POST('/create-order', {
        amount: paymentMode === 'full' ? totalAmount : partialAmount,
        note,
        receipt: email,
      })
      console.log('RZ_ORDER_RES', response)
      setRZOrder(response)
      createDbOrder(response, totalAmount, partialAmount)
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const createDbOrder = async (response, totalAmount, partialAmount) => {
    try {
      let res = await MyAPI.POST('/order/create', {
        ...response.data,
        orderId: response.data.id,
        userId: localStorage.getItem('userId'),
      })
      let { success, message, error, order } = res.data || res
      console.log('createDbOrder', res.data)
      if (success) {
        // handlePayment(response)
        handleDBCheckOut(order._id, totalAmount, partialAmount, response)
      } else {
        MyError.error(message || error)
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handlePayment = async (response, bookingId) => {
    try {
      const { data } = response
      const options = {
        // key: 'rzp_test_yVffW9br2JhyF7', // nitesh test RZ_API_KEY
        key: RZ_API_KEY, // Purulia RZ_API_KEY
        amount: data.amount.toString(),
        currency: data.currency,
        name: 'Purulia Travels',
        description: 'Purulia Travels Booking Amount',
        order_id: data.id,
        handler: function (response) {
          console.log('After Payment', response)
          handleUpdateStatus(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            bookingId,
          )
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email,
          contact: phone,
        },
        notes: {
          address: `${address} ${country} (${zip})`,
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.open()
    } catch (error) {
      setLoading(false)
      console.error('Error creating order:', error)
    }
  }

  const handleUpdateStatus = async (orderId, paymentId, signature, bookingId) => {
    try {
      let res = await MyAPI.PUT('/order/create', {
        orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      })
      setLoading(false)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success('Booking Success')
        navigateRoute(bookingId)
      } else {
        MyError.error(message)
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const navigateRoute = (bookingId) => {
    console.log('redirecting', `/user/booking/${bookingId}`)
    navigate(`/user/booking/${bookingId}`)
  }

  const handleDBCheckOut = async (rz_order_id, finalPrice, partialAmount, response) => {
    try {
      let payload = {
        rz_order_id,
        packageId: booking.packageId,
        billingAddress: {
          address,
          city,
          country,
          postal: zip,
          note,
        },
        paymentMode: paymentMode === 'full' ? 'Full' : 'Partial',
        bookingDate: booking.startDate,
        price: {
          quantity: booking.groupSize,
          finalPrice: finalPrice,
          paidAmount: paymentMode === 'full' ? finalPrice : partialAmount,
        },
        userDetails: {
          firstName: firstName,
          lastName: lastName,
          email,
          dateOfBirth: dob,
          gender,
          phone,
        },
      }
      if (data.offer) {
        payload.price.offer = data.offer._id
      }

      if (applyCoupon && applyCoupon.discount) {
        payload.price.coupon = applyCoupon._id
      }

      if (booking.isSingle) {
        payload.price.fixedDepartureType = 'Single'
      } else {
        if (booking.fixedOption === 'tripleSharing') {
          payload.price.fixedDepartureType = 'Triple'
        } else {
          payload.price.fixedDepartureType = 'Double'
        }
      }

      let res = await MyAPI.POST('/user/checkout', payload, token)
      let { success, message, error } = res.data || res
      if (success) {
        console.log('checkoutDb created', res.data.data._id)
        // setBookingId(res.data.data._id)
        handlePayment(response, res.data.data._id)
      } else {
        MyError.error(message || error || 'Server Error')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleValidateCoupon = async () => {
    if (!couponCode) {
      return MyError.warn('Please enter coupon code ')
    }

    try {
      let res = await MyAPI.POST(
        '/coupon/apply',
        {
          code: couponCode,
        },
        token,
      )
      let { success, message, error, data } = res.data || res
      if (success) {
        setApplyCoupon(data)
      } else {
        MyError.error(message || error || 'Server Error')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <>
      <Header />

      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{
          backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg)',
        }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{
            backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)',
          }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">Check Out</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    checkout
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <Container>
        <Row>
          <Col md={8}>
            <h4>Traveler Details</h4>
            <Card className="p-3">
              <h5>Lead Traveler</h5>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    className="input-border"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    className="input-border"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    className="input-border"
                    type="text"
                    disabled
                    value={phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-border"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formDOB">
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    className="input-border"
                    type="date"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div className="d-flex text-white gap-2">
                    <Form.Check
                      className="text-dark"
                      type="radio"
                      label="Male"
                      checked={gender === 'Male'}
                      onClick={(e) => setGender('Male')}
                      name="genderRadios"
                      id="genderRadio1"
                    />
                    <Form.Check
                      className="text-dark"
                      type="radio"
                      label="Female"
                      checked={gender === 'Female'}
                      onClick={(e) => setGender('Female')}
                      name="genderRadios"
                      id="genderRadio2"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Card>
          </Col>

          <Col md={4}>
            <h4>Your Order</h4>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img
                    src={
                      data
                        ? data.galleryImages[0] || data.galleryImages[1]
                        : 'https://via.placeholder.com/100'
                    }
                    alt={data ? truncateText(data.title, 5) : 'Loading...'}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="ms-3">
                    <h5>{data ? truncateText(data.title, 5) : 'Loading...'}</h5>
                    <p className="text-dark">
                      Booking Date <br />
                      {booking &&
                        booking.startDate &&
                        new Date(booking.startDate).toISOString().split('T')[0]}
                    </p>
                    <p className="text-dark">
                      {booking.privatePriceText !== 'Total Cost' && (
                        <>
                          {booking && booking.groupSize}{' '}
                          <sub>{booking.privatePriceText && booking.privatePriceText}</sub> x{' '}
                        </>
                      )}
                      {/* <h5> */}
                      {booking && data && data.offer && (
                        <span className="text-muted text-truncate text-decoration-line-through">
                          ₹
                          {data
                            ? data.fixedDeparture.type === true
                              ? booking.fixedOption === 'tripleSharing'
                                ? data.fixedDeparture.tripleSharing.totalPrice
                                : data.fixedDeparture.doubleSharing.totalPrice
                              : data.costOptions.totalPrice
                            : 'Loading...'}
                        </span>
                      )}
                      &nbsp; ₹
                      {booking && data
                        ? data.offer
                          ? calculateDiscountedPrice(
                            data.offer.type,
                            data.fixedDeparture.type === true
                              ? booking.fixedOption === 'tripleSharing'
                                ? data.fixedDeparture.tripleSharing.totalPrice
                                : data.fixedDeparture.doubleSharing.totalPrice
                              : data.costOptions.totalPrice,
                            data.offer.value,
                          )
                          : data.fixedDeparture.type === true
                            ? booking.fixedOption === 'tripleSharing'
                              ? data.fixedDeparture.tripleSharing.totalPrice
                              : data.fixedDeparture.doubleSharing.totalPrice
                            : data.costOptions.totalPrice
                        : 'Loading...'}{' '}
                      <sub>
                        {booking.privatePriceText === 'Total Cost' && booking.privatePriceText}
                      </sub>
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="link" className="text-danger">
                    <FaTrash /> Remove
                  </Button>
                  <Button onClick={() => navigate(booking.editUrl)} variant="link">
                    <FaEdit /> Edit
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer>
                <h5>
                  {booking && data && (data.offer || (applyCoupon && applyCoupon.discount)) && (
                    <span className="text-muted text-truncate text-decoration-line-through">
                      Total:₹
                      {data
                        ? parseInt(
                          data.fixedDeparture.type === true
                            ? booking.fixedOption === 'tripleSharing'
                              ? data.fixedDeparture.tripleSharing.totalPrice
                              : data.fixedDeparture.doubleSharing.totalPrice
                            : data.costOptions.totalPrice,
                        ) * booking.groupSize
                        : 'Loading...'}
                    </span>
                  )}
                  <br />
                  Total: ₹
                  {booking && data
                    ? parseInt(
                      data.offer
                        ? calculateDiscountedPrice(
                          data.offer.type,
                          data.fixedDeparture.type === true
                            ? booking.fixedOption === 'tripleSharing'
                              ? data.fixedDeparture.tripleSharing.totalPrice
                              : data.fixedDeparture.doubleSharing.totalPrice
                            : data.costOptions.totalPrice,
                          data.offer.value,
                        )
                        : applyCoupon && applyCoupon.discount
                          ? calculateDiscountedPrice(
                            'percentage',
                            data.fixedDeparture.type === true
                              ? booking.fixedOption === 'tripleSharing'
                                ? data.fixedDeparture.tripleSharing.totalPrice
                                : data.fixedDeparture.doubleSharing.totalPrice
                              : data.costOptions.totalPrice,
                            applyCoupon.discount,
                          )
                          : data.fixedDeparture.type === true
                            ? booking.fixedOption === 'tripleSharing'
                              ? data.fixedDeparture.tripleSharing.totalPrice
                              : data.fixedDeparture.doubleSharing.totalPrice
                            : data.costOptions.totalPrice,
                    ) * booking.groupSize
                    : 'Loading...'}
                </h5>
                {booking && data && !data.offer && (
                  <>
                    <Form.Group controlId="formPromoCode">
                      <Form.Control
                        className={applyCoupon && applyCoupon.discount && 'border border-success'}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        type="text"
                        disabled={applyCoupon && applyCoupon.discount}
                        placeholder="Enter promo code"
                      />
                    </Form.Group>
                    {applyCoupon && !applyCoupon.discount && (
                      <Button onClick={handleValidateCoupon} variant="danger" className="mt-2">
                        Apply Coupon
                      </Button>
                    )}
                  </>
                )}
              </Card.Footer>
            </Card>
          </Col>
          <Col md={8} className="mt-3">
            <Card className="p-3">
              <h5>Billing Address</h5>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formFirstName">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-border"
                    type="text"
                    placeholder="Enter Address"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formLastName">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-border"
                    type="text"
                    placeholder="Enter City"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formCountry">
                  <Form.Label>Country *</Form.Label>
                  <Form.Control
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="input-border"
                    as="select"
                  >
                    <option>Select Country</option>
                    {countryList &&
                      countryList.length > 0 &&
                      countryList.map((c, index) => (
                        <option value={c} key={index}>
                          {c}
                        </option>
                      ))}
                    <option>Country 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formLastName">
                  <Form.Label>Postal *</Form.Label>
                  <Form.Control
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="input-border"
                    type="text"
                    placeholder="Enter Postal"
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group controlId="formNote">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    className="input-border"
                    as="textarea"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your note here"
                  />
                </Form.Group>
              </Col>
            </Card>
          </Col>

          <Col md={8} className="mt-5">
            <Card className="p-3">
              <h5>Booking / Payments</h5>
              <Col md={12} className="mt-2">
                <Form.Group controlId="bookingOptions">
                  <Form.Label>Booking Options *</Form.Label>
                  <Form.Select
                    value={bookingOption}
                    onChange={(e) => setBookingOption(e.target.value)}
                  >
                    <option value="payment">Booking with payment</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} className="mt-2 mb-2">
                <Form.Group controlId="paymentMode">
                  <Form.Label>Payment Mode *</Form.Label>
                  <Form.Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="full">Full Payment</option>
                    <option value="partial">Partial Payment</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} className="text-end">
                <b className="text-dark">
                  ₹
                  {booking && data
                    ? paymentMode === 'full'
                      ? parseInt(
                        data.offer
                          ? calculateDiscountedPrice(
                            data.offer.type,
                            data.fixedDeparture.type === true
                              ? booking.fixedOption === 'tripleSharing'
                                ? data.fixedDeparture.tripleSharing.totalPrice
                                : data.fixedDeparture.doubleSharing.totalPrice
                              : data.costOptions.totalPrice,
                            data.offer.value,
                          )
                          : applyCoupon && applyCoupon.discount
                            ? calculateDiscountedPrice(
                              'percentage',
                              data.fixedDeparture.type === true
                                ? booking.fixedOption === 'tripleSharing'
                                  ? data.fixedDeparture.tripleSharing.totalPrice
                                  : data.fixedDeparture.doubleSharing.totalPrice
                                : data.costOptions.totalPrice,
                              applyCoupon.discount,
                            )
                            : data.fixedDeparture.type === true
                              ? booking.fixedOption === 'tripleSharing'
                                ? data.fixedDeparture.tripleSharing.totalPrice
                                : data.fixedDeparture.doubleSharing.totalPrice
                              : data.costOptions.totalPrice,
                      ) * booking.groupSize
                      : calculatePartialPayment(
                        parseInt(
                          data.offer
                            ? calculateDiscountedPrice(
                              data.offer.type,
                              parseInt(
                                data.fixedDeparture.type === true
                                  ? booking.fixedOption === 'tripleSharing'
                                    ? data.fixedDeparture.tripleSharing.totalPrice
                                    : data.fixedDeparture.doubleSharing.totalPrice
                                  : data.costOptions.totalPrice,
                              ),
                              data.offer.value,
                            )
                            : applyCoupon && applyCoupon.discount
                              ? calculateDiscountedPrice(
                                'percentage',
                                data.fixedDeparture.type === true
                                  ? booking.fixedOption === 'tripleSharing'
                                    ? data.fixedDeparture.tripleSharing.totalPrice
                                    : data.fixedDeparture.doubleSharing.totalPrice
                                  : data.costOptions.totalPrice,
                                applyCoupon.discount,
                              )
                              : data.fixedDeparture.type === true
                                ? booking.fixedOption === 'tripleSharing'
                                  ? data.fixedDeparture.tripleSharing.totalPrice
                                  : data.fixedDeparture.doubleSharing.totalPrice
                                : data.costOptions.totalPrice,
                        ) * booking.groupSize,
                        data.partialPayment,
                      )
                    : 'Loading...'}
                  /-
                </b>
                &nbsp;
                {!loading ? (
                  <Button
                    onClick={() =>
                      handleSubmitCheckOut(
                        parseInt(
                          data.offer
                            ? calculateDiscountedPrice(
                              data.offer.type,
                              data.fixedDeparture.type === true
                                ? booking.fixedOption === 'tripleSharing'
                                  ? data.fixedDeparture.tripleSharing.totalPrice
                                  : data.fixedDeparture.doubleSharing.totalPrice
                                : data.costOptions.totalPrice,
                              data.offer.value,
                            )
                            : applyCoupon && applyCoupon.discount
                              ? calculateDiscountedPrice(
                                'percentage',
                                data.fixedDeparture.type === true
                                  ? booking.fixedOption === 'tripleSharing'
                                    ? data.fixedDeparture.tripleSharing.totalPrice
                                    : data.fixedDeparture.doubleSharing.totalPrice
                                  : data.costOptions.totalPrice,
                                applyCoupon.discount,
                              )
                              : data.fixedDeparture.type === true
                                ? booking.fixedOption === 'tripleSharing'
                                  ? data.fixedDeparture.tripleSharing.totalPrice
                                  : data.fixedDeparture.doubleSharing.totalPrice
                                : data.costOptions.totalPrice,
                        ) * booking.groupSize,
                        calculatePartialPayment(
                          parseInt(
                            data.offer
                              ? calculateDiscountedPrice(
                                data.offer.type,
                                data.fixedDeparture.type === true
                                  ? booking.fixedOption === 'tripleSharing'
                                    ? data.fixedDeparture.tripleSharing.totalPrice
                                    : data.fixedDeparture.doubleSharing.totalPrice
                                  : data.costOptions.totalPrice,
                                data.offer.value,
                              )
                              : applyCoupon && applyCoupon.discount
                                ? calculateDiscountedPrice(
                                  'percentage',
                                  data.fixedDeparture.type === true
                                    ? booking.fixedOption === 'tripleSharing'
                                      ? data.fixedDeparture.tripleSharing.totalPrice
                                      : data.fixedDeparture.doubleSharing.totalPrice
                                    : data.costOptions.totalPrice,
                                  applyCoupon.discount,
                                )
                                : data.fixedDeparture.type === true
                                  ? booking.fixedOption === 'tripleSharing'
                                    ? data.fixedDeparture.tripleSharing.totalPrice
                                    : data.fixedDeparture.doubleSharing.totalPrice
                                  : data.costOptions.totalPrice,
                          ) * booking.groupSize,
                          data.partialPayment,
                        ),
                      )
                    }
                    style={{ background: '#244855' }}
                    className="border-0"
                    variant="danger"
                  >
                    Book and Pay
                  </Button>
                ) : (
                  <Button disabled>
                    <Spinner size="sm" animation="border" color="blue" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Button>
                )}
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default CheckOut
