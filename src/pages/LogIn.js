/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useNavigate } from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import { MyAPI, MyError, MyToken } from '../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUserId } from '../store'
import { Spinner } from 'react-bootstrap'

function LogIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.POST('/user/login', {
        email,
        password,
      })
      let { success, message, error, token, userId } = res.data || res
      console.log(res)

      if (success) {
        MyError.success(message)
        MyToken.setItem(token)
        localStorage.setItem('userId', userId)
        dispatch(setUserId(userId))
        dispatch(setToken(token))
        localStorage.setItem('isUser', true)
        localStorage.removeItem('isAdmin')
      } else {
        MyError.warn(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <section className="login-register pt-6 pb-6">
        <div className="container">
          <div className="log-main blog-full log-reg w-75 mx-auto">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 pe-4">
                <h3 className="text-center border-b pb-2">Login</h3>

                <form method="post" action="#" name="mobileloginform" id="mobileloginform">
                  <div className="form-group mb-2">
                    <input
                      type="email"
                      className="border-2"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <input
                      type="password"
                      className="border-2"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  <p>
                    Don't have an account? <Link to="/signup">Register</Link>
                  </p>

                  <div className="comment-btn mb-2 pb-2 text-center border-b">
                    {loading ? (
                      <Spinner size="sm" animation="border" color="blue" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <input
                        onClick={handleLogin}
                        type="button"
                        className="nir-btn w-100"
                        id="submit2"
                        value="Login"
                      />
                    )}
                  </div>
                </form>
              </div>
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
