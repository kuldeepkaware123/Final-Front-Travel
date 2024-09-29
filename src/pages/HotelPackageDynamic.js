import React, { useEffect, useState } from 'react'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import Footer from '../components1/Footer'
import Header from '../components1/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'
import { BiTrip } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import './model.css'

import 'react-datepicker/dist/react-datepicker.css'
import { SlLocationPin } from 'react-icons/sl'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import RecomndedTrip from '../components1/RecomndedTrip'

function HotelPackageDynamic() {
  const [packageData, setPackageData] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const isUser = localStorage.getItem('isUser')
  const userId = localStorage.getItem('userId')
  const token = useSelector((state) => state.token)

  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleShowBookingModal = () => {
    setShowBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setShowBookingModal(false)
  }

  const [loading, setLoading] = useState(false)

  const fetchPackage = async (id) => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/hotel/${id}`)
      let { success, message, error, data } = res.data || res
      // console.log(res.data)
      if (success) {
        setPackageData(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackage(id)
  }, [id])

  const [totalBookingPrice, setTotalBookingPrice] = useState(0)
  const [totalPeople, setTotalPeople] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    let price = packageData && packageData.pricePerPerson

    if (totalPeople > 0 && totalDays > 0) {
      setTotalBookingPrice(price * totalPeople * totalDays)
    }

    if (totalPeople <= 0) {
      setTotalBookingPrice(0)
    }

    if (totalDays <= 0) {
      setTotalBookingPrice(0)
    }
  }, [totalPeople, totalDays])

  const [activeTab, setActiveTab] = useState('overview')

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

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState('')

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const BookingClick = () => {
    if (isUser) {
      handleShowBookingModal()
    } else {
      navigate('/login')
    }
  }

  const handleBooking = async () => {
    if (totalPeople <= 0) {
      MyError.error('Please Enter Number of People')
      return
    }
    if (startDate === '') {
      MyError.error('Please Enter Start Date')
      return
    }
    if (totalPeople > 0 && startDate !== '') {
      let data = {
        hotel: id,
        user: userId,
        bookingStartDate: startDate,
        totalDays: totalDays,
        bookingPrice: totalBookingPrice,
        totalPeople: totalPeople,
      }

      try {
        const res = await MyAPI.POST(`/hotel-booking/${id}/${userId}`, data, token)

        let { success, message, error } = res.data || res

        if (success) {
          MyError.success(message)
          handleCloseBookingModal()
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }
      } catch (error) {
        console.log(error)
      }
    }
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
                    </div>
                    <div className="tab-content mt-1 mb-4">
                      {activeTab === 'overview' && (
                        <div>{packageData && packageData.description}</div>
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

                <div
                  className="col-12 col-lg-4 mt-2  py-3 border-2 rounded-3 shadow-sm "
                  style={{ maxHeight: '150px' }}
                >
                  <div className="d-flex gap-3">
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
          </div>
        </div>
      </section>

      <Modal show={showBookingModal} onHide={handleCloseBookingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="date">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    placeholder="Enter Your Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="form-group">
                  <label htmlFor="people">People</label>
                  <input
                    type="number"
                    className="form-control"
                    id="people"
                    placeholder="Enter Number of People"
                    value={totalPeople}
                    onChange={(e) => setTotalPeople(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="form-group">
                  <label htmlFor="people">Days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="people"
                    placeholder="Enter Number of Days"
                    value={totalDays}
                    onChange={(e) => setTotalDays(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="form-group">
                  <label htmlFor="price">Total Price (per person)</label>
                  <input
                    type="number"
                    className="form-control"
                    disabled
                    value={totalBookingPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBookingModal}>
            Close
          </Button>
          <Button onClick={handleBooking} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default HotelPackageDynamic
