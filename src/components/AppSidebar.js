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

// import logo from '../images/my-img/logo-removebg-preview.png'
import logo from '../assets/Logo/White/PuruliaRoutes-logo-White-rgb-600px.png'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
// import navigation from '../_nav'
// my own sidebar
import navigation from '../_new_nav'
import { UpdateSideBar, setToken } from '../store'
import { MyToken } from '../MyAPI'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const handleLogOut = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isUser')
    MyToken.removeItem()
    dispatch(setToken(''))
  }

  return (
    <CSidebar
      className="border-end"
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
        <CCloseButton className="d-lg-none" dark onClick={() => dispatch(UpdateSideBar(false))} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter onClick={handleLogOut} className="border-top d-none d-lg-flex cursor-pointer">
        <span>Log Out</span>
        <CSidebarToggler />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
