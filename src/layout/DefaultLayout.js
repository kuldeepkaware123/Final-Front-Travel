import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyToken } from '../MyAPI'
import { setToken } from '../store'

const DefaultLayout = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  let token = MyToken.getItem()
  const Web_token = useSelector((state) => state.token)

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
    }
  }, [token])

  // useEffect(() => {
  if (!Web_token) {
    navigate('/admin/login')
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
