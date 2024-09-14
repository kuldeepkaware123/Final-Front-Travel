// src/components/EnquiryButton.js
import React, { useState, useEffect } from 'react'
import EnquiryForm from '../pages/EnquiryForm'

const EnquiryButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true)
  //   }, 10000) //10000 120000

  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <>
      <button className="shadow" style={buttonStyle} onClick={() => setIsOpen(true)}>
        Enquiry Now
      </button>
      <EnquiryForm show={isOpen} setShow={setIsOpen} />
    </>
  )
}

const buttonStyle = {
  position: 'fixed',
  left: '15px',
  top: '50%',
  transform: 'translateY(-50%) rotate(-270deg)',
  transformOrigin: 'center left',
  padding: '5px 20px',
  backgroundColor: '#244855',
  border: '2px solid #DEC3BC',
  color: '#fff',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 14555,
}

export default EnquiryButton
