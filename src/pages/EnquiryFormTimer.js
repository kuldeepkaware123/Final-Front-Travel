import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap'
import './model.css'
import 'react-phone-input-2/lib/style.css'
import { MyAPI, MyError, MyToken } from '../MyAPI'
import PhoneInput from 'react-phone-input-2'
import { setIsEnquiryVisible, setToken, setUserId } from '../store'
import { useDispatch, useSelector } from 'react-redux'
const EnquiryFormTimer = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const isActiveLastThree = useSelector((state) => state.isActiveLastThree)
  const isEnquiryVisible = useSelector((state) => state.isEnquiryVisible)
  const isBookingClicked = useSelector((state) => state.isBookingClicked)

  useEffect(() => {
    const isUserPath = location.hash.includes('#/user')
    const isCheckoutPath = location.hash.includes('#/checkout')
    const isAdminPath = location.hash.includes('#/admin')

    console.log('Current Pathname:', location.pathname)

    if (
      isActiveLastThree &&
      !isEnquiryVisible &&
      !isBookingClicked &&
      !isUserPath &&
      !isCheckoutPath &&
      !isAdminPath &&
      !localStorage.getItem('isAdmin')
    ) {
      setShow(true)
      dispatch(setIsEnquiryVisible(true))
    }
  }, [isActiveLastThree, isEnquiryVisible])

  const token = useSelector((state) => state.token)
  const [isUser, setIsUser] = useState(false)
  useState(() => {
    let localToken = MyToken.getItem()
    let userIs = localStorage.getItem('isUser')
    dispatch(setToken(localToken ?? ''))
    setIsUser(userIs)
  }, [token])
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    travelDestination: '',
    startDate: '',
    noOfDays: '',
    adultPassengers: '0',
    midPassengers: '0',
    childPassengers: '0',
    flightTrain: false,
    hotelCab: '',
    additionalInfo: '',
    name: '',
    email: '',
    phone: '',
    otp: '',
    enteredOtp: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleStep1Submit = () => {
    if (!formData.travelDestination) {
      return MyError.warn('Please Enter travel destination')
    }
    if (!formData.startDate) {
      return MyError.warn('Please Enter start date')
    }
    if (!formData.noOfDays) {
      return MyError.warn('Please Enter number of days')
    }

    if (!formData.hotelCab) {
      return MyError.warn('Please Enter hotel/cab preference')
    }

    setStep(2)
  }

  const inputStyle = {
    width: '100%',
    height: '50px', // Adjust height here
    padding: '15px 10px',
    fontSize: '18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    paddingLeft: '70px', // Adjust left padding to ensure the country code is not hidden
  }

  const [otpSent, setOtpSent] = useState(false)
  const [otpVerify, setOtpVerify] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const sendOtp = async () => {
    // Send OTP to user's phone number
    if (!formData.name) {
      return MyError.warn('Please Enter your name')
    }
    if (!formData.email) {
      return MyError.warn('Please Enter your email')
    }
    if (!mobileNumber) {
      return MyError.warn('Please Enter your mobile number')
    }

    // Logic to send OTP goes here
    if (mobileNumber.length < 11) {
      return MyError.warn('Please enter a valid mobile number')
    }
    try {
      let res = await MyAPI.POST('/otp', {
        type: 'phone',
        value: mobileNumber,
        name: formData.name,
        email: formData.email,
      })
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        setOtpSent(true)
        // setResendTimer(30)
      } else {
        MyError.warn(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const verifyOtp = async () => {
    if (formData.enteredOtp.length < 6) {
      return MyError.warn('Please enter a valid OTP')
    }
    try {
      let res = await MyAPI.PUT('/otp', {
        type: 'phone',
        value: mobileNumber,
        name: formData.name,
        email: formData.email,
        otp: formData.enteredOtp,
      })
      let { success, message, error, token, userId } = res.data || res
      if (success) {
        setOtpVerify(true)
        MyError.success(message)
        MyToken.setItem(token)
        localStorage.setItem('userId', userId)
        dispatch(setUserId(userId))
        dispatch(setToken(token))
        localStorage.setItem('isUser', true)
      } else {
        MyError.warn('Invalid OTP Please try again.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSubmitEnquiry = async () => {
    try {
      let payload = {
        destination: formData.travelDestination,
        StartDate: formData.startDate,
        noOfDays: formData.noOfDays,
        noOfAdults: formData.adultPassengers,
        noOfChildrenAbove6: formData.midPassengers,
        noOfChildrenBelow6: formData.childPassengers,
        travelByFlightOrTrain: formData.flightTrain, // or "Train"
        accomodationType: formData.hotelCab, // or "Hotel Only" or // "Cab Only"
        additionalInfo: formData.additionalInfo,
      }
      let res = await MyAPI.POST('/user/enquiry', payload, token)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        setFormData({
          travelDestination: '',
          startDate: '',
          noOfDays: '',
          adultPassengers: '0',
          midPassengers: '0',
          childPassengers: '0',
          flightTrain: false,
          hotelCab: '',
          additionalInfo: '',
          name: '',
          email: '',
          phone: '',
          otp: '',
          enteredOtp: '',
        })
        setShow(false)
      } else {
        MyError.warn(error)
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  return (
    <Modal
      className={show ? null : 'd-none'}
      show={show}
      onHide={() => setShow(false)}
      centered
      size={step === 2 ? 'sm' : 'lg'}
      scrollable
    >
      <Modal.Header className="bg-white" closeButton>
        <Modal.Title>Enquiry Form</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-scrollbar-enquiry bg-white">
        {localStorage.getItem('isAdmin') && (
          <Alert className="px-3 py-1" variant="warning">
            <Alert.Heading>Warning!</Alert.Heading>
            <p>You are not authorized to fill out this Enquiry.</p>
          </Alert>
        )}

        {step === 1 && !localStorage.getItem('isAdmin') && (
          <Row>
            <Col md={12} className="mb-2">
              <Form.Group controlId="travelDestination">
                <Form.Label>Where would you like to travel?</Form.Label>
                <Form.Control
                  type="text"
                  name="travelDestination"
                  className="input-border"
                  value={formData.travelDestination}
                  onChange={handleChange}
                  placeholder="Enter your travel destination"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="startDate">
                <Form.Label>Trip Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  className="input-border"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-2">
              <Form.Group controlId="noOfDays">
                <Form.Label>No Of Days</Form.Label>
                <Form.Control
                  as="select"
                  name="noOfDays"
                  className="input-border"
                  value={formData.noOfDays}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="3 days or less">3 days or less</option>
                  <option value="4-5 days">4-5 days</option>
                  <option value="6 days or more">6 days or more</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-2">
              <Form.Group>
                <Form.Label>No of Passengers</Form.Label>
                <Row>
                  <Col md={4}>
                    <Form.Label>Adult</Form.Label>
                    <Form.Control
                      type="number"
                      name="adultPassengers"
                      value={formData.adultPassengers}
                      onChange={handleChange}
                      className="input-border"
                      placeholder="Enter number of adults"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>Child (above 6 years)</Form.Label>
                    <Form.Control
                      type="number"
                      name="midPassengers"
                      value={formData.midPassengers}
                      onChange={handleChange}
                      className="input-border"
                      placeholder="Enter number of children above 6 years"
                      required
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>Child (6 years or less)</Form.Label>
                    <Form.Control
                      type="number"
                      name="childPassengers"
                      className="input-border"
                      value={formData.childPassengers}
                      onChange={handleChange}
                      placeholder="Enter number of children 6 years or less"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-2">
              <Form.Group controlId="flightTrain">
                <Form.Check
                  type="checkbox"
                  name="flightTrain"
                  label="Flight / Train"
                  checked={formData.flightTrain}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="mb-2">
              <Form.Group controlId="hotelCab" className="d-flex align-items-center gap-2">
                <Form.Check
                  type="radio"
                  name="hotelCab"
                  value="Hotel + Cab"
                  label="Hotel + Cab"
                  checked={formData.hotelCab === 'Hotel + Cab'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  name="hotelCab"
                  value="Hotel Only"
                  label="Hotel Only"
                  checked={formData.hotelCab === 'Hotel Only'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  name="hotelCab"
                  value="Cab Only"
                  label="Cab Only"
                  checked={formData.hotelCab === 'Cab Only'}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="mb-2">
              <Form.Group controlId="additionalInfo">
                <Form.Label>Additional Info</Form.Label>
                <Form.Control
                  as="textarea"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter any additional information"
                />
              </Form.Group>
            </Col>

            {!localStorage.getItem('isAdmin') && (
              <Col md={12} className="mb-2 d-flex align-items-center justify-content-end">
                <Button
                  onClick={
                    token && !localStorage.getItem('isAdmin')
                      ? handleSubmitEnquiry
                      : handleStep1Submit
                  }
                  variant="primary"
                  type="submit"
                >
                  {token ? 'Submit' : 'Next'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShow(false)}
                  className="ms-2"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
            )}
          </Row>
        )}
        {step === 2 && !localStorage.getItem('isAdmin') && (
          <Row>
            <Col md={12} className="mb-2">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="input-border"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-2">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="input-border"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-2">
              <Form.Label>Phone</Form.Label>
              <div className="form-group mb-2">
                <PhoneInput
                  country={'in'} // Set default country to India
                  value={mobileNumber}
                  onChange={(phone) => setMobileNumber(phone)}
                  inputStyle={{
                    ...inputStyle,
                    backgroundColor: otpSent ? '#f1f1f1' : 'white',
                  }} // Make input non-editable after OTP is sent
                  disabled={otpSent}
                  placeholder="Enter Mobile Number"
                  buttonStyle={{
                    fontSize: '18px',
                    height: '50px',
                    width: '50px',
                    padding: 0,
                  }} // Adjust button height
                />
              </div>
            </Col>

            {!otpSent && (
              <>
                <Col md={12} className="mt-5 d-flex align-items-center justify-content-end">
                  <Button variant="primary" type="button" onClick={sendOtp}>
                    Send OTP
                  </Button>
                </Col>
              </>
            )}
            {otpSent && !otpVerify && (
              <>
                <Col md={12} className="mb-2">
                  <Form.Group controlId="enteredOtp">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="enteredOtp"
                      className="input-border"
                      value={formData.enteredOtp}
                      onChange={handleChange}
                      placeholder="Enter the OTP"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-2 d-flex align-items-center justify-content-end">
                  <Button variant="primary" type="button" onClick={verifyOtp}>
                    Verify OTP
                  </Button>
                </Col>
              </>
            )}
            {otpVerify && (
              <Col>
                <Alert className="rounded-2 text-center" variant="success">
                  <p className="text-dark mt-1">Your account has been created successfully!</p>
                </Alert>
              </Col>
            )}
            {otpVerify && (
              <Col md={12} className="mb-2 d-flex align-items-center justify-content-end">
                <Button onClick={handleSubmitEnquiry} variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShow(false)}
                  className="ms-2"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
            )}
          </Row>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EnquiryFormTimer
