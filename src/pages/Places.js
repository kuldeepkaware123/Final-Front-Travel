import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import { Link } from 'react-router-dom'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { MyAPI, MyError } from '../MyAPI'


const Places = () => {
  const [hotels, setHotels] = useState([])

  const fetchHotels = async () => {
    try {
      let res = await MyAPI.GET('/public/places')
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        setHotels(data)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  

  useEffect(() => {
    fetchHotels()
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
              <h1 className="mb-3">Places</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Places 
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      {/* <!-- hotel starts --> */}
      <section className="hotel">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pe-lg-4">
              <div className="listing-inner">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="list-results d-flex align-items-center justify-content-between">
                      <div className="list-results-sort">
                        <p className="m-0">
                          Showing {hotels && hotels.length > 0 && 1}-
                          {hotels && hotels.length > 0 ? hotels.length : 0} of{' '}
                          {hotels && hotels.length > 0 ? hotels.length : 0} results
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

                  {hotels &&
                    hotels.length > 0 &&
                    hotels.map((hotel, index) => (
                      <div className="col-lg-6">
                        <div className="trend-item shadow-lg bg-white mb-4 rounded overflow-hidden">
                          <div className="trend-image">
                            <img src={hotel.galleryImages[0]} alt="image" />
                          </div>
                          <div className="trend-content-main p-4 pb-2">
                            <div className="trend-content">
                              <h4>
                                <Link to={`/place/${hotel._id}`}>{hotel.title ?? ''}</Link>
                              </h4>
                              <p className="mb-3">{truncateText(hotel.description ?? '', 30)}</p>
                              <div className="entry-meta d-flex align-items-center justify-content-between">
                                <div className="entry-button d-flex align-items-center mb-2">
                                  <Link to={`/place/${hotel._id}`} className="nir-btn">
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
      {/* <!-- hotel Ends -->   */}

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default Places
