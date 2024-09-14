/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { MyAPI, MyError, MyToken } from '../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserId } from '../store'
import { Spinner } from 'react-bootstrap'

function LogIn() {
  const [isLogIn, setIsLogIn] = useState(true)
  const [isMobileLogin, setIsMobileLogin] = useState(true)
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const storeToken = useSelector((state) => state.token)
  const storeBooking = useSelector((state) => state.booking)
  let token = MyToken.getItem()

  useEffect(() => {
    if (storeToken && !storeBooking.redirectBack) {
      navigate('/user/dashboard')
    }
    if (storeToken && storeBooking.redirectBack) {
      navigate(storeBooking.redirectBack)
    }
    if (token && !storeBooking.redirectBack) {
      dispatch(setToken(token))
      navigate('/user/dashboard')
    }
  }, [storeToken, token])

  const inputStyle = {
    width: '100%',
    height: '50px', // Adjust height here
    padding: '15px 10px',
    fontSize: '18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    paddingLeft: '70px', // Adjust left padding to ensure the country code is not hidden
  }

  const handleSendOtp = async () => {
    // Logic to send OTP goes here
    if (mobileNumber.length < 11) {
      return MyError.warn('Please enter a valid mobile number')
    }
    setLoading(true)
    try {
      let res = await MyAPI.POST('/otp', { type: 'phone', value: mobileNumber })
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        MyError.success(message)
        setIsOtpSent(true)
        setResendTimer(30)
      } else {
        MyError.warn(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleValidateOtp = async () => {
    // Logic to validate OTP goes here
    if (otp.length < 6) {
      return MyError.warn('Please enter a valid OTP')
    }
    setLoading(true)
    try {
      let res = await MyAPI.PUT('/otp', { type: 'phone', value: mobileNumber, otp })
      let { success, message, error, token, userId } = res.data || res
      setLoading(false)
      console.log('verify message', res.data)
      if (success) {
        MyError.success(message)
        MyToken.setItem(token)
        localStorage.setItem('userId', userId)
        dispatch(setUserId(userId))
        dispatch(setToken(token))
        localStorage.setItem('isUser', true)
        localStorage.removeItem('isAdmin')
      } else {
        MyError.warn('Invalid OTP Please try again.')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleResendOtp = async () => {
    if (mobileNumber.length < 11) {
      return MyError.warn('Please enter a valid mobile number')
    }
    setLoading(true)
    try {
      let res = await MyAPI.POST('/otp', { type: 'phone', value: mobileNumber })
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        MyError.success(message)
        localStorage.removeItem('isUser')
        localStorage.removeItem('isAdmin')
        setIsOtpSent(true)
        setResendTimer(30)
      } else {
        MyError.warn(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [resendTimer])

  return (
    <>
      <Header />

      <section className="login-register pt-6 pb-6">
        <div className="container">
          <div className="log-main blog-full log-reg w-75 mx-auto">
            <div className="row align-items-center justify-content-center">
              {isLogIn && (
                <>
                  <div className="col-lg-6 pe-4">
                    <h3 className="text-center border-b pb-2">Login</h3>
                    {isMobileLogin ? (
                      <form method="post" action="#" name="mobileloginform" id="mobileloginform">
                        <div className="form-group mb-2">
                          <PhoneInput
                            country={'in'} // Set default country to India
                            value={mobileNumber}
                            onChange={(phone) => setMobileNumber(phone)}
                            inputStyle={{
                              ...inputStyle,
                              backgroundColor: isOtpSent ? '#f1f1f1' : 'white',
                            }} // Make input non-editable after OTP is sent
                            disabled={isOtpSent}
                            placeholder="Enter Mobile Number"
                            buttonStyle={{
                              fontSize: '18px',
                              height: '50px',
                              width: '50px',
                              padding: 0,
                            }} // Adjust button height
                          />
                        </div>
                        {!isOtpSent ? (
                          <div className="comment-btn mb-2 pb-2 text-center border-b">
                            {loading ? (
                              <Spinner size="sm" animation="border" color="blue" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            ) : (
                              <input
                                onClick={handleSendOtp}
                                type="button"
                                className="nir-btn w-100"
                                id="submit2"
                                value="Send OTP"
                              />
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="form-group mb-2">
                              <input
                                type="text"
                                name="otp"
                                className="form-control"
                                id="otp"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={inputStyle}
                              />
                            </div>
                            <div className="comment-btn mb-2 pb-2 text-center border-b">
                              {loading ? (
                                <Spinner size="sm" animation="border" color="blue" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              ) : (
                                <input
                                  onClick={handleValidateOtp}
                                  type="button"
                                  className="nir-btn w-100"
                                  id="submit3"
                                  value="Validate OTP"
                                />
                              )}
                            </div>
                            <div className="text-center mt-1">
                              {resendTimer > 0 ? (
                                <p>Resend OTP in {resendTimer} seconds</p>
                              ) : (
                                !loading && (
                                  <button
                                    type="button"
                                    onClick={!loading && handleResendOtp}
                                    className="nir-btn w-100"
                                  >
                                    Resend OTP
                                  </button>
                                )
                              )}
                            </div>
                          </>
                        )}
                      </form>
                    ) : (
                      <form method="post" action="#" name="contactform" id="contactform3">
                        <div className="form-group mb-2">
                          <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            id="fullname"
                            placeholder="User Name or Email Address"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <input
                            type="password"
                            name="password_name"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            style={inputStyle}
                          />
                        </div>
                        <div className="form-group mb-2 d-flex align-content-center justify-content-between">
                          <div className="d-flex align-items-center justify-content-start gap-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="exampleCheck3"
                            />
                            <label className="custom-control-label mb-0" htmlFor="exampleCheck3">
                              Remember me
                            </label>
                          </div>
                          <a className="float-end" href="#">
                            Lost your password?
                          </a>
                        </div>
                        <div className="comment-btn mb-2 pb-2 text-center border-b">
                          <input
                            onClick={() => navigate('/user/dashboard')}
                            type="button"
                            className="nir-btn w-100"
                            id="submit1"
                            value="Login"
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default LogIn
