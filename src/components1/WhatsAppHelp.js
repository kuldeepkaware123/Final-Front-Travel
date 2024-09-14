/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import WhatsAppHelpImg from '../images/rj_tour/whatsapp.png'
import conImg from '../images/rj_tour/consultancey.png'
import callBackImg from '../images/rj_tour/request-phone-call-callback-icon-white_116137-6250.avif'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { MyAPI, MyError } from '../MyAPI'

function WhatsAppHelp() {
  const [optionsActive, setIOptionsActive] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setIOptionsActive(false)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [msg, setMessage] = useState('')

  const handleAddReqCallBack = async () => {
    if (!name) {
      MyError.warn('Please Enter Name.')
    } else if (!email) {
      MyError.warn('Please Enter Email.')
    } else if (!phone) {
      MyError.warn('Please Enter Phone Number.')
    } else if (!msg) {
      MyError.warn('Please Enter Message.')
    } else {
      try {
        let res = await MyAPI.POST('/public/callback', { name, email, phone, message: msg })
        let { success, error, message } = res.data || res
        console.log(res.data)
        if (success) {
          MyError.success('Request Sent Successfully')
          handleClose()
          setName('')
          setEmail('')
          setPhone('')
          setMessage('')
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }
      } catch (error) {
        MyError.error(error.message)
      }
    }
  }

  return (
    <div className="whatsapp-help">
      <img
        onClick={() => setIOptionsActive(!optionsActive)}
        className="position-fixed"
        style={{
          bottom: '5vh',
          right: '3vw',
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50%',
          zIndex: '142512001',
          cursor: 'pointer',
        }}
        src={WhatsAppHelpImg}
        alt="WhatsApp Help"
      />
      <div
        className={
          optionsActive
            ? 'whatsapp-help-option-container shadow slide-active'
            : 'whatsapp-help-option-container shadow slide-inactive'
        }
      >
        <div className="option-item cursor-pointer" onClick={handleShow}>
          <img src={callBackImg} alt="icon img" />
          <p>Request A Call Back</p>
        </div>
        <div className="option-item cursor-pointer border-top border-3">
          <img src={WhatsAppHelpImg} alt="icon img" />
          <p>Chat With Our Executive</p>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body className="p-0 m-0 rounded-3 ">
          <Row>
            <Col
              md={7}
              className="d-flex bg-white p-0 rounded-start-3 justify-content-center align-items-center flex-column"
            >
              <img src={conImg} alt="Callback Image" className="img-fluid" />
              <h3 className="text-center theme">Where do you want to go next?</h3>
              <p>Make your move, fill out your details now!</p>
            </Col>
            <Col
              md={5}
              className="py-3 pe-3 rounded-end-3"
              style={{ background: 'var(--primary-color)' }}
            >
              <div
                onClick={handleClose}
                className="d-flex align-items-center justify-content-end mb-3 cursor-pointer"
              >
                <IoCloseCircleOutline size={26} color="yellow" />
              </div>
              {/* <Form> */}
              <Form.Group controlId="formName">
                <Form.Control
                  className="rounded-3 mt-2"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Control
                  className="rounded-3 mt-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Control
                  className="rounded-3 mt-2"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Control
                  className="mt-2"
                  as="textarea"
                  value={msg}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Enter your message"
                />
              </Form.Group>
              <Button
                onClick={handleAddReqCallBack}
                variant="warning"
                type="submit"
                className="w-100 mt-3 py-1 rounded-3"
              >
                Submit
              </Button>
              {/* </Form> */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default WhatsAppHelp
