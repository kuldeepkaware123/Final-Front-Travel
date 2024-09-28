import React from 'react'
import CIcon from '@coreui/icons-react'
import { FaSwatchbook } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { cilSpeedometer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _user_nav = [
  // {
  //   component: CNavItem,
  //   name: 'Home',
  //   to: '/',
  //   icon: <IoHome icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/user/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/user/edit/profile',
    icon: <CgProfile size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bookings',
    to: '/user/booking',
    icon: <FaSwatchbook size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'My Enquiry',
  //   to: '/user/enquiry',
  //   icon: <TbProgressHelp size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Create Enquiry',
  //   to: '/user/create/enquiry',
  //   icon: <VscGitPullRequestCreate size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
]

export default _user_nav
