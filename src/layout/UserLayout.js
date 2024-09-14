import React, { useEffect } from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import AppSidebarUser from '../components/AppSidebarUser'
import { MyToken } from '../MyAPI'
import { useDispatch } from 'react-redux'
import { setToken } from '../store'

const UserLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    let token = MyToken.getItem()
    if (token) {
      dispatch(setToken(token))
    }
  }, [])

  return (
    <div>
      <AppSidebarUser />
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

export default UserLayout
