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

function HotelPackageDynamic() {
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
              <h1 className="mb-3 fs-1">{packageData && packageData.title}</h1>
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
                  <ul className="list-unstyled d-flex gap-3 ">
                    <li className="d-flex  mb-2">
                      <div className="mr-3">
                        <BiTrip size={20} /> &nbsp; Trip Type : &nbsp;
                        {packageData && packageData.tripType?.map((item) => `${item.name},`)}
                      </div>
                    </li>
                    <li className="d-flex  mb-2">
                      <div>
                        <i className="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration :
                        &nbsp;
                        {packageData && packageData.days}D / {packageData && packageData.nights}N
                      </div>
                    </li>

                    <li className="d-flex  mb-2">
                      {packageData &&
                        packageData.reviews &&
                        packageData.fixedDeparture.type !== true && (
                          <div>
                            <SlLocationPin size={20} /> &nbsp; Location :{' '}
                            {packageData && packageData.destination?.map((item) => item.name)}
                          </div>
                        )}
                      {/* {testimonial && testimonial.length > 0 && (
                        <div className="mr-3">
                          <MdOutlineRateReview size={20} /> &nbsp; Reviews :{' '}
                          {testimonial.length || 0}
                        </div>
                      )} */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="single-image rounded-3 overflow-hidden">
                    <img
                      loading="lazy"
                      src={packageData && packageData.galleryImages[0]}
                      alt="image"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      className="rounded-3 shadow w-100"
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="gallery">
                    {packageData &&
                      packageData.galleryImages &&
                      packageData.galleryImages.length > 0 &&
                      packageData.galleryImages.map((image) => (
                        <div className="gallery-item" key={image}>
                          <Zoom>
                            <img
                              src={image}
                              alt="Image Not Found."
                              style={{ cursor: 'pointer', width: '95%' }}
                              className="rounded-3"
                            />
                          </Zoom>
                        </div>
                      ))}
                  </div>

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
                </div>
              </div>

              <EnquiryForm show={show} setShow={setShow} />

              <div className="row mt-4">
                <div className="col-12 col-lg-8">
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
                          background: activeTab === 'trip-includes' ? '#244855' : 'transparent',
                          color: activeTab === 'trip-includes' ? '#fff' : '#244855',
                          borderColor: '#244855',
                          whiteSpace: 'nowrap',
                        }}
                        onClick={() => handleTabClick('trip-includes')}
                      >
                        Hotels Includes
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
                      {/* {!localStorage.getItem('isAdmin') && (
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
                      )} */}
                    </div>
                    <div className="tab-content mt-1 mb-4">
                      {activeTab === 'overview' && (
                        <div>{packageData && packageData.description}</div>
                      )}
                      {/* {activeTab === 'trip-outline' && (
                        <div>
                          {isMobile ? (
                            <Accordion activeKey={activeKey}>
                              {packageData &&
                                packageData.itineraries &&
                                packageData.itineraries.map((item, index) => (
                                  <Card key={item._id}>
                                    <Accordion.Header
                                      onClick={() => handleToggle(index.toString())}
                                    >
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
                      )} */}
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
                                <h5 className="text-uppercase poppins mid-font">
                                  Travel Essentials
                                </h5>
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
                      
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4 mt-2  py-3 border-2 rounded-3 shadow-sm "
                style={{maxHeight:"150px"}}
                >
                <p className="text-dark mb-3">
                        From &nbsp;
                        {packageData &&
                          packageData.fixedDeparture.type === false &&
                          (packageData.offer ? (
                            <>
                              <span className="fw-bold  text-truncate text-decoration-line-through">
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
                            <span className="fw-bold ">
                              ₹{packageData.costOptions.totalPrice} /-
                            </span>
                          ))}
                        {packageData &&
                          packageData.fixedDeparture.type === true &&
                          (packageData.offer ? (
                            <>
                              <span className="fw-bold  text-truncate text-decoration-line-through">
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
                            <span className="fw-bold ">
                              ₹{packageData.fixedDeparture.tripleSharing.totalPrice} /-
                            </span>
                          ))}
                      </p>

                  <div className='d-flex gap-3'>
                  {!localStorage.getItem('isAdmin') && (
                    <Button
                      onClick={BookingClick}
                      style={{ background: '#244855', borderColor: '#244855' }}
                      className="text-truncate"
                    >
                      Book Now
                    </Button>
                  )}
                 
                  </div>
                
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

export default HotelPackageDynamic
