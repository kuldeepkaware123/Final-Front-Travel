/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { MyAPI, MyError, truncateText } from '../MyAPI'
import '../css/offerTag.css'
import EnquiryButton from '../components1/EnquiryButton'

function HotelPackage() {
  const [allPackages, setAllPackages] = useState([])
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [destination, setDestination] = useState(null)

  const fetchPackages = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/public/packages/${id}`)
      let { success, message, error, data } = res.data || res
      console.log(res.data)
      if (success) {
        const filteredDestinations = data.packages.filter(
          (destination) => !destination.isPrivate && destination.status === 'active',
        )
        setAllPackages(filteredDestinations)
        setDestination(data.destination)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setAllPackages([])
    fetchPackages()
  }, [id])

  loading && (
    <div id="preloader">
      <div id="status"></div>
    </div>
  )

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
              <h1 className="mb-3">
                {destination ? `${destination.name} Packages` : 'Loading....'}{' '}
              </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {destination ? `${destination.name}` : 'Loading....'}
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
                    Showing 1- {allPackages ? allPackages.length : 0} of{' '}
                    {(allPackages && allPackages.length) || 0} results
                  </p>
                </div>
                <div className="click-menu d-flex align-items-center justify-content-between">
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

              <div className="row">
                {allPackages &&
                  allPackages.length > 0 &&
                  allPackages.map((item, index) =>
                    item.offer ? (
                      <div key={index} className="col-lg-4 col-md-4 mb-4">
                        <Link to={`/hotelhotel${item._id}`}>
                          <div className="dealwrapper red">
                            <div className="ribbon-wrapper">
                              <div className="ribbon-tag">
                                {item.offer.type === 'percentage'
                                  ? `${item.offer.value}% Off`
                                  : `₹ ${item.offer.value} Off`}
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
                                  {item.destination.map((item) => `${item.name}, `) ?? ''}
                                </h5>
                                <h3 className="mb-1">
                                  <Link to={`/hotelhotel${item._id}`}>
                                    {truncateText(item.title ?? '', 10)}
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
                        </Link>
                      </div>
                    ) : (
                      <div key={index} className="col-lg-4 col-md-4 mb-4">
                        <Link to={`/hotel/package/${item._id}`}>
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
                                {item.destination.map((item) => `${item.name}, `) ?? ''}
                              </h5>
                              <h3 className="mb-1">
                                <Link to={`hotel${item._id}`}>
                                  {truncateText(item.title ?? '', 7)}
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
                              {/* <div className="entry-meta">
                              <div className="entry-author d-flex align-items-center">
                                <p className="mb-0">
                                  <span className="theme fw-bold fs-5">
                                    ₹
                                    {item.fixedDeparture.type === true
                                      ? item.fixedDeparture.tripleSharing.totalPrice
                                      : item.costOptions.totalPrice}{' '}
                                    /-
                                  </span>{' '}
                                  |{' '}
                                  {item.fixedDeparture.type === true
                                    ? 'Triple Sharing'
                                    : item.costOptions.type}
                                </p>
                              </div>
                            </div> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ),
                  )}
                {allPackages && allPackages.length === 0 && (
                  <div className="text-center">
                    <h3 className="text-center">No Data Found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section
        className="discount-action pt-0"
        style={{
          backgroundImage:
            'url(https://htmldesigntemplates.com/html/travelin/images/section-bg1.png)',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="call-banner rounded pt-10 pb-14">
            <div className="call-banner-inner w-75 mx-auto text-center px-5">
              <div className="trend-content-main">
                <div className="trend-content mb-5 pb-2 px-5">
                  <h5 className="mb-1 theme">Love Where Your're Going</h5>
                  <h2>
                    <a href="detail-fullwidth.html">
                      Explore Your Life, <span className="theme1"> Travel Where You Want!</span>
                    </a>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="video-button text-center position-relative">
                  <div className="call-button text-center">
                    <button
                      type="button"
                      className="play-btn js-video-button"
                      data-video-id="152879427"
                      data-channel="vimeo"
                    >
                      <i className="fa fa-play bg-blue"></i>
                    </button>
                  </div>
                  <div className="video-figure"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="white-overlay"></div>
        <div className="white-overlay"></div>
      </section> */}
      {/* <div className="section-shape  top-inherit bottom-0" style={{backgroundImage:'url(https://htmldesigntemplates.com/html/travelin/images/shape6.png)'}}></div> */}

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default HotelPackage
