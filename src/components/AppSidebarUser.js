import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { sygnet } from 'src/assets/brand/sygnet'
// import logo from '../images/my-img/logo-removebg-preview.png'
import logo from '../assets/Logo/White/PuruliaRoutes-logo-White-rgb-600px.png'

// sidebar nav config
// import navigation from '../_nav'
// my own sidebar
import navigation from '../_user_nav'
import { MyToken } from '../MyAPI'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../store'

const AppSidebarUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const handleLogOut = () => {
    MyToken.removeItem()
    localStorage.removeItem('isUser')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userId')
    dispatch(setToken(''))
    navigate('/')
  }

  return (
    <CSidebar
      className="border-end"
      style={{ backgroundColor: 'var(--primary-color)' }}
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> */}
          <img width={'100%'} style={{ aspectRatio: 4 / 1, objectFit: 'contain' }} src={logo} />
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter
        onClick={handleLogOut}
        className="border-top d-none d-lg-flex align-items-center justify-content-between cursor-pointer"
      >
        <p>&nbsp;</p>
        <p>Log Out</p>
        <CSidebarToggler />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebarUser)
