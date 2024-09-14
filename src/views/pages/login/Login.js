import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { MyAPI, MyError, MyToken } from '../../../MyAPI'
import store, { setAdminData, setToken } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  let token = MyToken.getItem()
  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
    }
  }, [token])

  const Webtoken = useSelector((state) => state.token)

  useEffect(() => {
    if (Webtoken) {
      navigate('/admin/dashboard')
    }
  }, [Webtoken])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email) {
      MyError.warn('Please Enter a valid username')
      return
    }

    if (!password) {
      MyError.warn('Please Enter a valid Password')
      return
    }
    setLoading(true)
    try {
      let res = await MyAPI.POST('/adminSignin', { email, password })
      let { success, data, token, message, error } = res.data
      setLoading(false)
      if (success) {
        MyToken.setItem(token)
        localStorage.setItem('isAdmin', true)
        localStorage.removeItem('isUser')
        dispatch(setToken(token))
        dispatch(setAdminData(data))
        MyError.success(message)
      } else {
        MyError.error(message || error || res.message)
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h4>Login</h4>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={!loading && handleLogin}>
                          {loading ? (
                            <Spinner size="sm" animation="border" variant="primary" />
                          ) : (
                            'Login'
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCol className="m-0 p-0" xs={12} md={6} lg={5} sm={0}>
                <CCard className="text-white py-10" style={{ background: 'var(--primary-color)' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2 className="text-white">Purulia Travels</h2>
                      <p>
                        {/* {token ? token : 'No Token'} */}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
