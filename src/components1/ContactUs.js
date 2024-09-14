/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import supportImg from '../images/rj_tour/today-removebg-preview.png'
import { MyAPI, MyError } from '../MyAPI'
function ContactUs() {
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <h4 className="mb-1 theme1">contact us</h4>
          <h1 className="m-0">Contact Us</h1>
          <p className="p-1 w-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
          <br />
          <br />
        </div>
        <div className="col-12 col-md-7 col-lg-7 d-flex align-content-center justify-content-center">
          <img className="" src={supportImg} />
        </div>
        <div
          className="col-12 col-md-4 col-lg-4 p-3 ps-4 blur"
          style={{ borderRadius: '12px', background: 'var(--primary-color)' }}
        >
          <br />
          {/* <form> */}
          <div className="form-group">
            {/* <label htmlFor="formName">Name</label> */}
            <input
              type="text"
              style={{ borderColor: '#029E9D' }}
              className="form-control n-banner-input-1 border border-white"
              id="formName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group mt-3">
            {/* <label htmlFor="formEmail">Email</label> */}
            <input
              style={{ borderColor: '#029E9D' }}
              type="email"
              className="form-control n-banner-input-1 border border-white"
              id="formEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mt-3">
            {/* <label htmlFor="formPhone">Phone</label> */}
            <input
              style={{ borderColor: '#029E9D' }}
              type="text"
              className="form-control n-banner-input-1 border border-white"
              id="formPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group mt-3">
            {/* <label htmlFor="formMessage">Message</label> */}
            <textarea
              style={{ borderColor: '#029E9D' }}
              className="form-control n-banner-input-1 border border-white"
              id="formMessage"
              rows="4"
              value={msg}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            onClick={handleAddReqCallBack}
            type="submit"
            className="btn w-100 mt-1 py-1"
            style={{ background: '#FFFAA1' }}
          >
            Submit
          </button>
          <br />
          &nbsp;
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default ContactUs
