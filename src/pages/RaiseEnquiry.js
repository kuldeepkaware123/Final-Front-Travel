/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import { Link } from 'react-router-dom'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { MyAPI, MyError } from '../MyAPI'
import EnquiryButton from '../components1/EnquiryButton'
import CreateEnquiry from '../userView/contact/CreateEnquiry'

function RaiseEnquiry() {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      let res = await MyAPI.GET('/activeBlogs')
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        setBlogs(data)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  return (
    <>
      <Header />


      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{
          backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg)',
        }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{
            backgroundImage: 'url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)',
          }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">Raise Enquiry</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Public</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Enquiry
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      {/* <!-- blog starts --> */}
      <section className="blog">
        <CreateEnquiry />
      </section>
      {/* <!-- blog Ends -->   */}

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default RaiseEnquiry
