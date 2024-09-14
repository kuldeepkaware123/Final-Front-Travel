import React from 'react'
import { CFooter } from '@coreui/react'
import { useLocation } from 'react-router-dom'

const AppFooter = () => {
  const location = useLocation()
  return (
    <CFooter
      className="px-4"
      style={location.pathname.includes('user') ? { backgroundColor: 'var(--white-color)' } : null}
    >
      <div className="ms-auto">
        <span
          style={location.pathname.includes('user') ? { color: '#ccc' } : null}
          className="me-1"
        >
          Design & Developed by
        </span>
        <a href="https://softseekersinfotech.com/" target="_blank" rel="noopener noreferrer">
          SoftSeekers Infotech Private Limited
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
