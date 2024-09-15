import React, { useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'
import { Spinner } from 'react-bootstrap'

const SignUP = () => {
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await MyAPI.POST('/userSignup', {
        userName,
        email,
        phone,
        password,
      })
      //   console.log(response.data)
      if (response.data.success) {
        navigate('/login')
      } else {
        MyError.warn(response.data.message)
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
                <h3 className="text-center border-b pb-2">Register</h3>

                <form method="post" action="#" name="mobileloginform" id="mobileloginform">
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className="border-2"
                      placeholder="Enter your userName"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </div>
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
                      type="number"
                      className="border-2"
                      placeholder="Enter your phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
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
                    Already have an account? <Link to="/login">Login</Link>
                  </p>

                  <div className="comment-btn mb-2 pb-2 text-center border-b">
                    {loading ? (
                      <Spinner size="sm" animation="border" color="blue" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <input
                        onClick={handleRegister}
                        type="button"
                        className="nir-btn w-100"
                        id="submit2"
                        value="Register"
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

export default SignUP
