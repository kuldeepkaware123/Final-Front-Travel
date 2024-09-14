/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../MyAPI'
import '../css/offerTag.css'
import EnquiryButton from '../components1/EnquiryButton'
import { Spinner } from 'react-bootstrap'

function HotDeals() {
  const [allPackages, setAllPackages] = useState([])
  const [AllDestinations, setAllDestinations] = useState([])
  const [filterDestination, setFilterDestination] = useState('1')
  const [filterPrice, setFilterPrice] = useState('1')
  const [filterSearchQuery, setFilterSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchAllDestinations = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/public/destinations')
      let { success, message, error, data } = res.data || res
      setLoading(false)
      if (success) {
        const filteredDestinations = data.filter((destination) =>
          destination.packages.some((pkg) => !pkg.isPrivate),
        )
        setAllDestinations(filteredDestinations)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const fetchPackages = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/hotdeals')
      let { success, message, error, data } = res.data || res
      setLoading(false)
      if (success) {
        const filteredDestinations = data.filter((destination) => !destination.isPrivate)
        setAllPackages(filteredDestinations)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (filterDestination === '1' && filterPrice === '1' && !filterSearchQuery) {
      fetchPackages()
      fetchAllDestinations()
    }
  }, [filterDestination, filterPrice, filterSearchQuery])

  const fetchFilterPackages = async () => {
    try {
      let payload = {
        destination: filterDestination,
        hotDeals: true,
        // tripType: '66a8917b9d5b0d45e5e0d2f0',
        price: filterPrice, // highToLow
        searchQuery: filterSearchQuery,
      }
      setLoading(true)
      let res = await MyAPI.POST('/public/filterPackages', payload)
      let { success, message, error, packages } = res.data || res
      setLoading(false)
      if (success) {
        setAllPackages(packages)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (filterDestination !== '1' || filterPrice !== '1' || filterSearchQuery) {
      fetchFilterPackages()
    }
  }, [filterDestination, filterPrice, filterSearchQuery])

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
              <h1 className="mb-3">Hot Deals</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    hot deals
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
      <section className="trending pt-6 pb-0 bg-lgrey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="list-results d-flex align-items-center justify-content-between">
                <div className="list-results-sort">
                  <p className="m-0">
                    Showing {allPackages && allPackages.length > 0 && 1}-
                    {allPackages && allPackages.length > 0 ? allPackages.length : 0} of{' '}
                    {allPackages && allPackages.length > 0 ? allPackages.length : 0}
                    results
                  </p>
                </div>
                <div className="click-menu d-flex align-items-center justify-content-between">
                  <div className="sortby d-flex align-items-center justify-content-between ml-2">
                    <select
                      value={filterDestination}
                      onChange={(e) => setFilterDestination(e.target.value)}
                      className="niceSelect me-2 border border-secondary"
                    >
                      {AllDestinations && AllDestinations.length > 0 && (
                        <option value="1">Sort By Destination</option>
                      )}

                      {AllDestinations &&
                        AllDestinations.length > 0 &&
                        AllDestinations.map(
                          (destination, index) =>
                            destination.packages.length > 0 && (
                              <option key={index} value={destination._id}>
                                {destination.name}
                              </option>
                            ),
                        )}

                      {AllDestinations && AllDestinations.length === 0 && (
                        <>
                          <option value="1">Sort By Destination</option>
                          <option value="1"> Destination Not Found</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="sortby d-flex align-items-center justify-content-between ml-2">
                    <select
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                      className="niceSelect border border-secondary"
                    >
                      <option value="1">Sort By</option>
                      <option value="lowToHigh">Price: low to high</option>
                      <option value="highToLow">Price: high to low</option>
                    </select>
                  </div>
                  <div className="search-input ml-2 ms-2">
                    <input
                      type="text"
                      value={filterSearchQuery}
                      onChange={(e) => setFilterSearchQuery(e.target.value)}
                      className="form-control border border-secondary"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                {allPackages &&
                  allPackages.length > 0 &&
                  allPackages.map((item, index) =>
                    item.offer ? (
                      <div className="col-lg-4 col-md-4 mb-4">
                        <div className="dealwrapper red">
                          <div className="ribbon-wrapper">
                            <div className="ribbon-tag">
                              {item.offer.type === 'percentage'
                                ? `${item.offer.value}% Off`
                                : `${item.offer.value} Off`}
                            </div>
                          </div>
                          <div className="trend-item rounded box-shadow">
                            <div className="trend-image position-relative">
                              <img
                                loading="lazy"
                                src={item && item.galleryImages[0]}
                                alt="image"
                                style={{ maxHeight: '40vh', objectFit: 'cover' }}
                                className=""
                              />
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <div className="trend-meta bg-theme white px-3 py-2 rounded">
                                <div className="entry-author">
                                  <i className="icon-calendar"></i>
                                  <span className="fw-bold">
                                    {' '}
                                    &nbsp; {item.nights ?? ''}N - {item.days ?? ''}D
                                  </span>
                                </div>
                              </div>
                              <h5 className="theme mb-1">
                                <i className="flaticon-location-pin"></i>{' '}
                                {item.destination.map((item) => item.name) ?? ''}
                              </h5>
                              <h3 className="mb-1">
                                <Link to={`/package/${item._id}`}>
                                  {truncateText(item.title, 5) ?? ''}
                                </Link>
                              </h3>
                              <div className="rating-main d-flex align-items-center pb-2">
                                <div className="rating">
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                </div>
                                <span className="ms-2">(12)</span>
                              </div>
                              {/* <p className=" border-b pb-2 mb-2">
                                {truncateText(item.description ?? '', 30)}
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-lg-4 col-md-4 mb-4">
                        <div className="trend-item rounded box-shadow">
                          <div className="trend-image position-relative">
                            <img
                              loading="lazy"
                              src={item && item.galleryImages[0]}
                              alt="image"
                              style={{ maxHeight: '40vh', objectFit: 'cover' }}
                              className=""
                            />
                            <div className="color-overlay"></div>
                          </div>
                          <div className="trend-content p-4 pt-5 position-relative">
                            <div className="trend-meta bg-theme white px-3 py-2 rounded">
                              <div className="entry-author">
                                <i className="icon-calendar"></i>
                                <span className="fw-bold">
                                  {' '}
                                  &nbsp; {item.nights ?? ''}N - {item.days ?? ''}D
                                </span>
                              </div>
                            </div>
                            <h5 className="theme mb-1">
                              <i className="flaticon-location-pin"></i>{' '}
                              {item.destination.map((item) => item.name) ?? ''}
                            </h5>
                            <h3 className="mb-1">
                              <Link to={`/package/${item._id}`}>{item.title ?? ''}</Link>
                            </h3>
                            <div className="rating-main d-flex align-items-center pb-2">
                              <div className="rating">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                              </div>
                              <span className="ms-2">(12)</span>
                            </div>
                            <p className=" border-b pb-2 mb-2">
                              {truncateText(item.description ?? '', 30)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                {loading && ( // Display loading spinner if fetching data
                  <div className="col-lg-12 text-center mt-2">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
                {!loading && allPackages && allPackages.length === 0 && (
                  <div className="text-center">
                    <h3 className="text-center">No Data Found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default HotDeals
