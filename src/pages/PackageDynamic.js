/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useRef, useState } from 'react'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import Footer from '../components1/Footer'
import Header from '../components1/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'
import { MdOutlineRateReview, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { BiTrip } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'

import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa'
import './model.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { SlLocationPin } from 'react-icons/sl'
import Timeline from './Timeline'
import EnquiryForm from './EnquiryForm'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import EnquiryButton from '../components1/EnquiryButton'
import RecomndedTrip from '../components1/RecomndedTrip'
import { setBookingData, setIsBookingClicked, setUpdatePackageData } from '../store'
import { IoClose } from 'react-icons/io5'
import ItenaryPage from '../components1/ItenaryPage'
import RecmmendedHotels from '../components1/RecmmendedHotels'

function PackageDynamic() {
  const [packageData, setPackageData] = useState(null)
  const [allReview, setAllReview] = useState([])
  const userId = useSelector((state) => state.userId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(() => {
    let path = location.hash.includes('private')
    setIsPrivate(path)
  }, [])

  const [loading, setLoading] = useState(false)

  const fetchPackage = async (id) => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/admin/package/${id}`)
      let { success, message, error, packageExist } = res.data || res
      console.log(res.data)
      if (success) {
        if (!packageExist.isPrivate) {
          setPackageData(packageExist)
        } else {
          MyError.error('Package Not Found.')
          navigate('/')
        }
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchPrivatePackage = async (id) => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/admin/package/${id}`)
      let { success, message, error, packageExist } = res.data || res
      console.log(res.data)
      if (success) {
        setPackageData(packageExist)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchPackageReview = async () => {
    try {
      let res = await MyAPI.GET(`/reviews/${id}`)
      let { success, message, error, data } = res.data || res
      console.log('All reviews', res.data)
      if (success) {
        setAllReview(data.reviews.reverse())
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const [testimonial, setTestimonials] = useState([])

  const fetchTestimonials = async () => {
    try {
      let res = await MyAPI.GET('/public/testimonials')
      let { success, message, error, data } = res.data || res
      if (success) {
        setTestimonials(data)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (isPrivate) {
      console.log('private')
      fetchPrivatePackage(id)
    } else {
      console.log('public')
      fetchPackage(id)
    }
  }, [id])

  const [activeTab, setActiveTab] = useState('overview')

  const handleTabClick = (tab) => {
    if (tab === 'booking') {
      setActiveTab(tab)
      dispatch(setIsBookingClicked(true))
    } else {
      setActiveTab(tab)
    }
  }

  const BookingClick = () => {
    setActiveTab('booking')
    dispatch(setIsBookingClicked(true))
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: 'smooth',
    })
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [startDate, setStartDate] = useState(null)

  useEffect(() => {
    if (startDate) {
      // Create a new date object and add one day to the selected date
      const adjustedDate = new Date(startDate)
      adjustedDate.setDate(adjustedDate.getDate() + 1)

      // Dispatch the adjusted date
      dispatch(
        setBookingData({
          startDate: adjustedDate.toISOString().split('T')[0],
        }),
      )
    }
  }, [startDate])

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Update the state based on window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [activeKey, setActiveKey] = useState('0') // Default to first item

  const handleToggle = (index) => {
    setActiveKey(activeKey === index ? null : index) // Toggle open/close
  }

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState('')

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  function formattedDate(date) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return `${months[monthIndex]} ${day} ${year}`
  }

  const [fixedOption, setFixedOption] = useState('tripleSharing')
  const [groupSize, setGroupSize] = useState(1)

  const decrementGroupSize = () => {
    if (groupSize > 0) {
      setGroupSize(groupSize - 1)
    }
  }

  const incrementGroupSize = () => {
    setGroupSize(groupSize + 1)
  }

  const handleBooking = (isSingle) => {
    dispatch(
      setBookingData({
        editUrl: `/package/${packageData && packageData._id}`,
        redirectBack: '/user/checkout',
        groupSize,
        fixedOption,
        isSingle,
        packageId: packageData && packageData._id,
      }),
    )
    navigate('/login')
  }

  loading && (
    <div id="preloader">
      <div id="status"></div>
    </div>
  )

  const childRef = useRef()

  const handleDownload = () => {
    if (childRef.current) {
      childRef.current.handleDownloadPDF()
    }
  }

  const [btnLoading, setBtnLoading] = useState(false)

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
                {packageData &&
                  packageData.destination?.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.name}
                      {index < packageData.destination.length - 1 && (
                        <div className="mt-2">
                          <br />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
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
                    {packageData && packageData.destination?.map((item) => `${item.name}, `)}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      <section className="trending pt-6 pb-0 overflow-hidden">
        <div className="container">
          <div className="single-content">
            <div id="highlight">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div
                    className="single-image rounded-3 overflow-hidden"
                    style={{ width: '100%', minHeight: 'auto', maxHeight: '90vh' }}
                  >
                    <img
                      loading="lazy"
                      src={packageData && packageData.galleryImages[0]}
                      alt="image"
                      style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                      className="rounded-3 shadow"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="single-full-title border-b mb-2 pb-2">
                    <div className="single-title text-start">
                      <h2 className="mb-1">
                        {/* {packageData && packageData.destination?.map((item) => item.name)} */}
                        {packageData && packageData.title}
                      </h2>
                      <p className="text-dark mb-0">
                        From &nbsp;
                        {packageData &&
                          packageData.fixedDeparture.type === false &&
                          (packageData.offer ? (
                            <>
                              <span className="text-muted text-truncate text-decoration-line-through">
                                ₹{packageData.costOptions.totalPrice}
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <b>
                                  ₹
                                  {calculateDiscountedPrice(
                                    packageData.offer.type,
                                    packageData.costOptions.totalPrice,
                                    packageData.offer.value,
                                  )}{' '}
                                </b>
                                /-
                              </span>
                            </>
                          ) : (
                            <span className="text-muted">
                              ₹{packageData.costOptions.totalPrice} /-
                            </span>
                          ))}
                        {packageData &&
                          packageData.fixedDeparture.type === true &&
                          (packageData.offer ? (
                            <>
                              <span className="text-muted text-truncate text-decoration-line-through">
                                ₹{packageData.fixedDeparture.tripleSharing.totalPrice}
                              </span>
                              &nbsp; &nbsp;
                              <span>
                                <b>
                                  ₹
                                  {calculateDiscountedPrice(
                                    packageData.offer.type,
                                    packageData.fixedDeparture.tripleSharing.totalPrice,
                                    packageData.offer.value,
                                  )}{' '}
                                </b>
                                /-
                              </span>
                            </>
                          ) : (
                            <span className="text-muted">
                              ₹{packageData.fixedDeparture.tripleSharing.totalPrice} /-
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <BiTrip size={20} /> &nbsp; Trip Type : &nbsp;
                          {packageData && packageData.tripType?.map((item) => `${item.name},`)}
                        </td>
                        <td>
                          <i className="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration :
                          &nbsp;
                          {packageData && packageData.days}D / {packageData && packageData.nights}N
                        </td>
                      </tr>
                      <tr>
                        {/* {packageData && packageData.fixedDeparture.type === false && (
                          <td>
                            <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Group Size
                            :{' '}
                            {packageData.fixedDeparture.groupSize
                              ? packageData.fixedDeparture.groupSize
                              : 'not'}
                          </td>
                        )} */}
                        {packageData && packageData.fixedDeparture.type === true && (
                          <td>
                            <i className="fa fa-group pink mr-1" aria-hidden="true"></i> Group Size
                            :{' '}
                            {packageData.fixedDeparture.groupSize
                              ? packageData.fixedDeparture.groupSize
                              : 0}
                          </td>
                        )}
                        {testimonial && testimonial.length > 0 && (
                          <td>
                            <MdOutlineRateReview size={20} /> &nbsp; Reviews :{' '}
                            {testimonial.length || 0}
                          </td>
                        )}
                        {packageData &&
                          packageData.reviews &&
                          packageData.fixedDeparture.type !== true && (
                            <td>
                              <SlLocationPin size={20} /> &nbsp; Location :{' '}
                              {packageData && packageData.destination?.map((item) => item.name)}
                            </td>
                          )}
                      </tr>
                      <tr>
                        {packageData &&
                          packageData.reviews &&
                          packageData.fixedDeparture.type === true && (
                            <td>
                              <SlLocationPin size={20} /> &nbsp; Location :{' '}
                              {packageData && packageData.destination?.map((item) => item.name)}
                            </td>
                          )}
                      </tr>
                    </tbody>
                  </table>
                  <Row className="mt-3">
                    <Col md={12} className="d-flex align-items-center gap-2 flex-wrap">
                      {!localStorage.getItem('isAdmin') && (
                        <Button
                          onClick={BookingClick}
                          style={{ background: '#244855', borderColor: '#244855' }}
                          className="text-truncate"
                        >
                          Book Now
                        </Button>
                      )}
                      <Button
                        onClick={handleDownload}
                        disabled={btnLoading}
                        style={{ background: '#244855', borderColor: '#244855' }}
                        className="text-truncate"
                      >
                        {btnLoading ? (
                          <Spinner variant="secondary" size="sm" />
                        ) : (
                          'Download Itinerary'
                        )}
                      </Button>
                      {/* <p onClick={handleShow} className="ms-3 cursor-pointer">
                        <FaQuestionCircle /> &nbsp; Trip Enquiry
                      </p> */}
                    </Col>
                  </Row>
                </div>
              </div>

              <EnquiryForm show={show} setShow={setShow} />

              <div>
                <div className="border-none py-3 mt-2 d-flex align-items-center justify-content-start gap-2 overflow-x-auto">
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'overview' ? '#244855' : 'transparent',
                      color: activeTab === 'overview' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('overview')}
                  >
                    Overview
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-outline' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-outline' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-outline')}
                  >
                    Trip Outline
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-includes' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-includes' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-includes')}
                  >
                    Trip Includes
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'trip-excludes' ? '#244855' : 'transparent',
                      color: activeTab === 'trip-excludes' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('trip-excludes')}
                  >
                    Trip Excludes
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'gallery' ? '#244855' : 'transparent',
                      color: activeTab === 'gallery' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('gallery')}
                  >
                    Gallery
                  </Button>
                  <Button
                    className={`outline-none`}
                    style={{
                      background: activeTab === 'terms-policy' ? '#244855' : 'transparent',
                      color: activeTab === 'terms-policy' ? '#fff' : '#244855',
                      borderColor: '#244855',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleTabClick('terms-policy')}
                  >
                    Term & Conditions
                  </Button>
                  {!localStorage.getItem('isAdmin') && (
                    <Button
                      className={`outline-none`}
                      style={{
                        background: activeTab === 'booking' ? '#244855' : 'transparent',
                        color: activeTab === 'booking' ? '#fff' : '#244855',
                        borderColor: '#244855',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() => handleTabClick('booking')}
                    >
                      Booking
                    </Button>
                  )}
                </div>
                <div className="tab-content mt-1 mb-4">
                  {activeTab === 'overview' && <div>{packageData && packageData.description}</div>}
                  {activeTab === 'trip-outline' && (
                    <div>
                      {isMobile ? (
                        <Accordion activeKey={activeKey}>
                          {packageData &&
                            packageData.itineraries &&
                            packageData.itineraries.map((item, index) => (
                              <Card key={item._id}>
                                <Accordion.Header onClick={() => handleToggle(index.toString())}>
                                  Day {index + 1} - {item.heading || 'Heading Not Found.'}
                                </Accordion.Header>
                                <Accordion.Collapse eventKey={index.toString()}>
                                  <Card.Body className="text-dark border-top">
                                    {item.activity || 'Activity Not Found.'}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            ))}
                        </Accordion>
                      ) : (
                        <Timeline events={packageData.itineraries} />
                      )}
                    </div>
                  )}
                  {activeTab === 'trip-includes' && (
                    <div>
                      <ul>
                        {packageData &&
                          packageData.includes.length > 0 &&
                          packageData.includes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <TiTick size={22} color="green" /> &nbsp;
                              {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'trip-excludes' && (
                    <div>
                      {' '}
                      <ul>
                        {packageData &&
                          packageData.excludes.length > 0 &&
                          packageData.excludes.map((item, index) => (
                            <li key={index} className="d-block pb-1">
                              <IoClose size={22} color="red" /> &nbsp;
                              {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'gallery' && (
                    <div className="gallery">
                      {packageData.galleryImages &&
                        packageData.galleryImages.length > 0 &&
                        packageData.galleryImages.map((image, index) => (
                          <div className="gallery-item" key={index}>
                            <Zoom>
                              <img
                                src={image}
                                alt={`Image Not Found.`}
                                style={{ cursor: 'pointer' }}
                              />
                            </Zoom>
                          </div>
                        ))}
                    </div>
                  )}
                  {lightboxOpen && (
                    <Lightbox
                      mainSrc={lightboxIndex}
                      onCloseRequest={closeLightbox}
                      enableZoom={true} // Optional: Enable zooming
                    />
                  )}
                  <style jsx>{`
                    .gallery {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 1rem;
                    }
                    .gallery-item img {
                      width: 100%;
                      height: auto;
                      object-fit: cover;
                      aspect-ratio: 1;
                    }
                  `}</style>
                  {activeTab === 'terms-policy' && (
                    <>
                      {packageData &&
                        packageData.termsAndConditions &&
                        packageData.termsAndConditions !== '<br>' && (
                          <div className="border-bottom mb-2">
                            <h5 className="text-uppercase poppins mid-font">
                              Terms and Conditions
                            </h5>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  packageData && packageData.termsAndConditions
                                    ? packageData.termsAndConditions
                                    : 'No Terms and Conditions',
                              }}
                            />
                          </div>
                        )}
                      {packageData &&
                        packageData.paymentTerms &&
                        packageData.paymentTerms !== '<br>' && (
                          <div className="border-bottom mb-2">
                            <h5 className="text-uppercase poppins mid-font">Payment Terms</h5>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  packageData && packageData.paymentTerms
                                    ? packageData.paymentTerms
                                    : 'No Terms and Conditions',
                              }}
                            />
                          </div>
                        )}
                      {packageData &&
                        packageData.travelEssentials &&
                        packageData.travelEssentials !== '<br>' && (
                          <div className="border-bottom mb-2">
                            <h5 className="text-uppercase poppins mid-font">Travel Essentials</h5>
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  packageData && packageData.travelEssentials
                                    ? packageData.travelEssentials
                                    : 'No Terms and Conditions',
                              }}
                            />
                          </div>
                        )}
                      {packageData && packageData.faqs && packageData.faqs !== '<br>' && (
                        <div className="border-bottom mb-2">
                          <h5 className="text-uppercase poppins mid-font">faqs</h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                packageData && packageData.faqs
                                  ? packageData.faqs
                                  : 'No Terms and Conditions',
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'booking' && (
                    <div className="border-bottom mb-2">
                      <Row className="py-2 border-bottom">
                        <Col md={10}>
                          Select Date and Pricing Options for this trip in the Trip Options setting.
                        </Col>
                        <Col md={2}>
                          <Button variant="danger">
                            {' '}
                            <MdOutlineSettingsBackupRestore size={22} />
                            &nbsp; Clear
                          </Button>
                        </Col>
                      </Row>
                      <div className="d-flex align-items-center py-3">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              Select a Date to view available pricings and other options.
                            </Tooltip>
                          }
                        >
                          <Button
                            style={{ background: '#244855' }}
                            className="d-flex align-items-center border-0"
                            onClick={() => document.getElementById('datePicker').click()}
                          >
                            {startDate ? formattedDate(startDate) : 'Select a Date'}
                            <FaCalendarAlt className="ms-2" />
                          </Button>
                        </OverlayTrigger>
                        <DatePicker
                          id="datePicker"
                          selected={startDate}
                          minDate={new Date()}
                          onChange={(date) => setStartDate(date)}
                          customInput={<input type="text" className="d-none" />}
                          popperClassName="custom-datepicker"
                          popperProps={{
                            modifiers: [
                              {
                                name: 'zIndex',
                                options: {
                                  zIndex: 9999, // Adjust the zIndex value as needed
                                },
                              },
                            ],
                          }}
                        />
                      </div>
                      {startDate && !localStorage.getItem('isAdmin') && (
                        <Container>
                          <Row>
                            <Col
                              md={12}
                              style={{ background: '#244855' }}
                              className="px-3 py-5 rounded-2"
                            >
                              {packageData &&
                              packageData.fixedDeparture &&
                              packageData.fixedDeparture.type === true ? (
                                <>
                                  <h5 className="text-white">Fixed Departure</h5>
                                  <div>
                                    <label>
                                      <input
                                        type="radio"
                                        name="sharingOption"
                                        value="tripleSharing"
                                        checked={fixedOption === 'tripleSharing'}
                                        onChange={(e) => setFixedOption(e.target.value)}
                                      />
                                      &nbsp; Triple Sharing
                                    </label>
                                  </div>
                                  <div>
                                    <label>
                                      <input
                                        type="radio"
                                        name="sharingOption"
                                        value="doubleSharing"
                                        checked={fixedOption === 'doubleSharing'}
                                        onChange={(e) => setFixedOption(e.target.value)}
                                      />
                                      &nbsp; Double Sharing
                                    </label>
                                  </div>
                                  <Col
                                    md={12}
                                    className="py-1 px-2 border border-white mt-2 rounded-2 shadow"
                                  >
                                    <div className="d-flex justify-content-between">
                                      <div className="text-white">
                                        {fixedOption === 'tripleSharing'
                                          ? 'Triple Sharing'
                                          : 'Double Sharing'}
                                      </div>
                                      <div className="text-white">
                                        <b className="text-white">
                                          ₹{' '}
                                          {packageData && packageData.offer
                                            ? calculateDiscountedPrice(
                                                packageData.offer.type,
                                                fixedOption === 'tripleSharing'
                                                  ? packageData &&
                                                      packageData.fixedDeparture.tripleSharing
                                                        .totalPrice
                                                  : packageData &&
                                                      packageData.fixedDeparture.doubleSharing
                                                        .totalPrice,
                                                packageData.offer.value,
                                              )
                                            : fixedOption === 'tripleSharing'
                                              ? packageData &&
                                                packageData.fixedDeparture.tripleSharing.totalPrice
                                              : packageData &&
                                                packageData.fixedDeparture.doubleSharing.totalPrice}
                                        </b>{' '}
                                        <sub>/ Group</sub> &nbsp;
                                        <Button
                                          className="rounded-0"
                                          onClick={decrementGroupSize}
                                          size="sm"
                                        >
                                          <i className="fa fa-minus" />
                                        </Button>
                                        <Button className="bg-transparent rounded-0 px-3" size="sm">
                                          {groupSize ?? 0}
                                        </Button>
                                        <Button
                                          onClick={incrementGroupSize}
                                          className=" rounded-0"
                                          size="sm"
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      </div>
                                    </div>
                                  </Col>
                                </>
                              ) : (
                                <>
                                  <h5 className="text-white">Cost Options</h5>
                                  <Col
                                    md={12}
                                    className="py-1 px-2 border border-white mt-2 rounded-2 shadow"
                                  >
                                    <div className="d-flex justify-content-between">
                                      <div className="text-white">Select Options</div>
                                      <div className="text-white">
                                        <b className="text-white">
                                          ₹{' '}
                                          {packageData && packageData.offer
                                            ? calculateDiscountedPrice(
                                                packageData.offer.type,
                                                packageData.costOptions.totalPrice,
                                                packageData.offer.value,
                                              )
                                            : packageData.costOptions.totalPrice}
                                        </b>{' '}
                                        <sub>
                                          /{' '}
                                          {packageData &&
                                          packageData.costOptions.type === 'total cost'
                                            ? 'Per Couple'
                                            : 'Per Person'}
                                        </sub>{' '}
                                        &nbsp;
                                        <Button
                                          className="rounded-0"
                                          onClick={decrementGroupSize}
                                          size="sm"
                                        >
                                          <i className="fa fa-minus" />
                                        </Button>
                                        <Button className="bg-transparent rounded-0 px-3" size="sm">
                                          {groupSize ?? 0}
                                        </Button>
                                        <Button
                                          onClick={incrementGroupSize}
                                          className=" rounded-0"
                                          size="sm"
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      </div>
                                    </div>
                                  </Col>
                                </>
                              )}
                            </Col>
                            {packageData && packageData.fixedDeparture.type === true && (
                              <Col
                                md={12}
                                style={{ background: '#244855' }}
                                className="px-3 py-2 rounded-2 mt-1 d-flex align-items-center justify-content-between flex-wrap"
                              >
                                <span className="d-flex align-items-center">
                                  <b className="text-white">Pricing :</b>&nbsp;
                                  {fixedOption === 'tripleSharing'
                                    ? 'Triple Sharing'
                                    : 'Double Sharing'}
                                </span>
                                <spa className="d-flex align-items-center">
                                  <b className="text-white">Trip Date :</b>&nbsp;
                                  {startDate ? formattedDate(startDate) : 'Date  Not Selected.'}
                                </spa>
                                <span className="d-flex align-items-center justify-content-center">
                                  <b className="text-white">
                                    ₹{' '}
                                    {packageData && packageData.offer
                                      ? parseInt(
                                          calculateDiscountedPrice(
                                            packageData.offer.type,
                                            parseInt(
                                              fixedOption === 'tripleSharing'
                                                ? packageData &&
                                                    packageData.fixedDeparture.tripleSharing
                                                      .totalPrice
                                                : packageData &&
                                                    packageData.fixedDeparture.doubleSharing
                                                      .totalPrice,
                                            ),
                                            packageData.offer.value,
                                          ),
                                        ) * groupSize
                                      : parseInt(
                                          fixedOption === 'tripleSharing'
                                            ? packageData &&
                                                packageData.fixedDeparture.tripleSharing.totalPrice
                                            : packageData &&
                                                packageData.fixedDeparture.doubleSharing.totalPrice,
                                        ) * groupSize}
                                    /-
                                  </b>{' '}
                                  &nbsp;
                                </span>
                                <Button
                                  onClick={() =>
                                    handleBooking(packageData && packageData.fixedDeparture.type)
                                  }
                                >
                                  Book Now
                                </Button>
                              </Col>
                            )}
                            {packageData && packageData.fixedDeparture.type === false && (
                              <Col
                                md={12}
                                style={{ background: '#244855' }}
                                className="px-3 py-2 rounded-2 mt-1 d-flex align-items-center justify-content-between flex-wrap"
                              >
                                <spa className="d-flex align-items-center">
                                  <b className="text-white">Trip Date :</b>&nbsp;
                                  {startDate ? formattedDate(startDate) : 'Date  Not Selected.'}
                                </spa>
                                <span className="d-flex align-items-center justify-content-center">
                                  <b className="text-white">
                                    ₹{' '}
                                    {packageData && packageData.offer
                                      ? calculateDiscountedPrice(
                                          packageData.offer.type,
                                          parseInt(
                                            packageData && packageData.costOptions.totalPrice,
                                          ),
                                          packageData.offer.value,
                                        ) * groupSize
                                      : parseInt(
                                          packageData && packageData.costOptions.totalPrice,
                                        ) * groupSize}
                                    /-
                                  </b>{' '}
                                  &nbsp;
                                </span>
                                <Button
                                  onClick={() =>
                                    handleBooking(packageData && packageData.fixedDeparture.type)
                                  }
                                >
                                  Book Now
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </Container>
                      )}
                      {startDate && localStorage.getItem('isAdmin') && (
                        //show warning admin can not be book feature
                        <div className="alert alert-danger px-3 py-1" role="alert">
                          Admin cannot book this package.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <RecomndedTrip
              destinationId={(packageData && packageData.destination[0]._id) || null}
            />

            <RecmmendedHotels hotels={packageData && packageData.hotels} />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppHelp />
      {packageData && packageData?.galleryImages && (
        <ItenaryPage
          loading={btnLoading}
          setLoading={setBtnLoading}
          ref={childRef}
          packageData={(packageData && packageData) || {}}
        />
      )}
    </>
  )
}

export default PackageDynamic
