/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import { Link } from 'react-router-dom'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { MyAPI, MyError } from '../MyAPI'
import EnquiryButton from '../components1/EnquiryButton'
import EnquiryForm from './EnquiryForm'

function BlogsPage() {
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

  const [recentBlogs, setRecentBlogs] = useState([])
  const [selectedTab, setSelectedTab] = useState('recent')
  const fetchRecentBlogs = async () => {
    try {
      let res = await MyAPI.GET('/recent-blogs')
      let { success, message, error, data } = res.data || res
      console.log('recent blog', res.data)
      if (success) {
        setRecentBlogs(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
    fetchRecentBlogs()
  }, [])

  const formatDate = (dateString, format) => {
    const date = new Date(dateString)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }

    switch (format) {
      case 'dd':
        return date.toLocaleDateString('en-US', { day: '2-digit' })
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'long' })
      case 'year':
        return date.toLocaleDateString('en-US', { year: 'numeric' })
      case 'all':
        return date.toLocaleDateString('en-US', options)
      default:
        return date.toLocaleDateString('en-US', options) // Default to 'all' format
    }
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  const [showEnquiry, setShowEnquiry] = useState(false)

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
              <h1 className="mb-3">Blogs</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog's
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
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pe-lg-4">
              <div className="listing-inner">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="list-results d-flex align-items-center justify-content-between">
                      <div className="list-results-sort">
                        <p className="m-0">
                          Showing {blogs && blogs.length > 0 && 1}-
                          {blogs && blogs.length > 0 ? blogs.length : 0} of{' '}
                          {blogs && blogs.length > 0 ? blogs.length : 0} results
                        </p>
                      </div>
                      <div className="click-menu d-flex align-items-center justify-content-between">
                        {/* <div className="change-list me-2 rounded overflow-hidden"><Link href="post-list-1.html"><i className="fa fa-bars bg-grey"></i></Link></div>
                                                <div className="change-grid f-active me-2 rounded overflow-hidden"><Link href="post-grid-1.html"><i className="fa fa-th"></i></Link></div> */}
                        <div className="sortby d-flex align-items-center justify-content-between ml-2">
                          &nbsp;
                          {/* <select className="niceSelect">
                            <option value="1">Sort By</option>
                            <option value="2">Average rating</option>
                            <option value="3">Price: low to high</option>
                            <option value="4">Price: high to low</option>
                          </select> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {blogs &&
                    blogs.length > 0 &&
                    blogs.map((blog, index) => (
                      <div className="col-lg-6">
                        <div className="trend-item shadow-lg bg-white mb-4 rounded overflow-hidden">
                          <div className="trend-image">
                            <img src={blog.coverImage} alt="image" />
                          </div>
                          <div className="trend-content-main p-4 pb-2">
                            <div className="trend-content">

                              <h4>
                                <Link to={`/blog/${blog._id}`}>{blog.title ?? ''}</Link>
                              </h4>
                              <p className="mb-3">{truncateText(blog.description ?? '', 30)}</p>
                              <div className="entry-meta d-flex align-items-center justify-content-between">

                                <div className="entry-button d-flex align-items-center mb-2">
                                  <Link to={`/blog/${blog._id}`} className="nir-btn">
                                    Read More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                </div>


              </div>
            </div>



          </div>
        </div>
      </section>
      {/* <!-- blog Ends -->   */}

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default BlogsPage
