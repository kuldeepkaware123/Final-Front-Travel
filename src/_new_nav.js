import React from 'react'
import CIcon from '@coreui/icons-react'
import { HiMiniUsers } from 'react-icons/hi2'
import { FaBoxesPacking, FaHotel, FaTruckMoving } from 'react-icons/fa6'
import { FaBoxOpen, FaCar } from 'react-icons/fa'
import { FaServer } from 'react-icons/fa'
import { TbPackages } from 'react-icons/tb'
import { MdConnectWithoutContact, MdOutlineReviews, MdWeb } from 'react-icons/md'
import { GiWindyStripes } from 'react-icons/gi'
import { IoCallOutline, IoHome } from 'react-icons/io5'
import { BiTrip } from 'react-icons/bi'
import { RiCoupon2Fill } from 'react-icons/ri'
import { BiSolidOffer } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'

import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _new_nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <IoHome icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Travel Management',
    to: '/base',
    icon: <MdConnectWithoutContact size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bookings',
        to: '/admin/bookings',
      },
      {
        component: CNavItem,
        name: 'Hot Deals',
        to: '/admin/hot/deals',
      },
      // {
      //   component: CNavItem,
      //   name: 'Enquiry',
      //   to: '/admin/enquiry',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Trip Management',
    to: '/base',
    icon: <FaBoxesPacking size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Packages',
        to: '/admin/packages/add',
      },
      {
        component: CNavItem,
        name: 'All Packages',
        to: '/admin/packages/all',
      },
      {
        component: CNavItem,
        name: 'Trip Type',
        to: '/admin/trip-type',
      },
      {
        component: CNavItem,
        name: 'Destinations',
        to: '/admin/destinations',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Car',
  //   to: '/base',
  //   icon: <FaCar size={22} icon={cilUserPlus} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add Car',
  //       to: '/admin/car/add',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'All Cars',
  //       to: '/admin/car/all',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Hotels',
    to: '/base',
    icon: <FaHotel size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Hotel',
        to: '/admin/hotels/add',
      },
      {
        component: CNavItem,
        name: 'All Hotels',
        to: '/admin/hotels/all',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Client',
    to: '/admin/client/all',
    icon: <HiMiniUsers size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Coupon',
    to: '/admin/coupon',
    icon: <RiCoupon2Fill size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Callback Request',
    to: '/admin/callback/request',
    icon: <IoCallOutline size={22} icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Offer',
    to: '/base',
    icon: <BiSolidOffer size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All offer',
        to: '/admin/offer/all',
      },
      {
        component: CNavItem,
        name: 'New Offer',
        to: '/admin/offer',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Blogs',
    to: '/base',
    icon: <HiMiniUsers size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Blogs',
        to: '/admin/blogs/all',
      },
      {
        component: CNavItem,
        name: 'Add Blog',
        to: '/admin/blogs/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pages',
    to: '/manage',
    icon: <MdWeb size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Travel Essentials',
        to: '/admin/manage/travel',
      },
      {
        component: CNavItem,
        name: 'FAQs',
        to: '/admin/manage/faq',
      },
      {
        component: CNavItem,
        name: 'Terms & Conditions',
        to: '/admin/manage/term-conditions',
      },
      {
        component: CNavItem,
        name: 'Payment Terms',
        to: '/admin/manage/payments-term',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Home Page',
    to: '/',
    icon: <CgWebsite size={22} icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banners',
        to: '/admin/banner',
      },
      // {
      //   component: CNavItem,
      //   name: 'Rajasthan',
      //   to: '/admin/rajasthan',
      // },
      {
        component: CNavItem,
        name: 'Best Tour',
        to: '/admin/best/tour',
      },
      {
        component: CNavItem,
        name: 'Testimonials',
        to: '/admin/testimonials',
      },
    ],
  },
]

export default _new_nav
