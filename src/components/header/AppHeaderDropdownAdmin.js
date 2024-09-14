import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { MyAPI, MyError, MyToken } from '../../MyAPI'
import { setToken } from '../../store'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdownAdmin = () => {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const fetchProfile = async (token) => {
    try {
      let res = await MyAPI.GET('/user/profile', token)
      let { success, message, error, user } = res.data || res
      if (success) {
        setProfile(user)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      // fetchProfile(token)
    }
  }, [token])

  const handleLogOut = () => {
    MyToken.removeItem()
    localStorage.removeItem('isUser')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userId')
    dispatch(setToken(''))
    navigate('/')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem href="#/user/edit/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}
        {/* <CDropdownItem href="#/user/booking">
          <CIcon icon={cilCreditCard} className="me-2" />
          Bookings
        </CDropdownItem> */}

        <CDropdownItem onClick={handleLogOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownAdmin
