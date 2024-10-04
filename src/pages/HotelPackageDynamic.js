import React, { useEffect, useState } from 'react'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import Footer from '../components1/Footer'
import Header from '../components1/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError, RZ_API_KEY } from '../MyAPI'
import { BiTrip } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'
import useRazorpay from 'react-razorpay'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Row, Col, Tooltip, Container, OverlayTrigger } from 'react-bootstrap'
import './model.css'

import 'react-datepicker/dist/react-datepicker.css'
import { SlLocationPin } from 'react-icons/sl'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import RecomndedTrip from '../components1/RecomndedTrip'
import { MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { FaCalendarAlt } from 'react-icons/fa'
import DatePicker from 'react-datepicker'

function HotelPackageDynamic() {
  const [packageData, setPackageData] = useState(null)
  const [groupSize, setGroupSize] = useState(1)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const isUser = localStorage.getItem('isUser')
  const userId = localStorage.getItem('userId')
  const token = useSelector((state) => state.token)
  const [Razorpay] = useRazorpay()

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
      setActiveTab('booking')
    } else {
      navigate('/login')
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

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const incrementGroupSize = () => {
    setGroupSize(groupSize + 1)
  }

  const decrementGroupSize = () => {
    if (groupSize > 1) {
      setGroupSize(groupSize - 1)
    }
  }
  const handleBookNow = async () => {
    try {
      // Step 1: Call backend API to create the hotel checkout and get the order ID
      const response = await MyAPI.POST(
        '/user/hotel/checkout',
        {
          hotelId: id,
          price: packageData.pricePerPerson * groupSize,
          quantity: groupSize,
        },
        token,
      );

      // Step 2: Validate backend response and extract Razorpay order ID
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from server: Data not found');
      }

      const { rz_order_id } = response.data.data; // Razorpay order ID
      if (!rz_order_id) {
        throw new Error('Invalid response from server: Razorpay order ID not found');
      }

      // Step 3: Define Razorpay payment options
      const options = {
        key: "rzp_test_ndeT7XXWVEnCM1", // Your Razorpay API Key
        amount: 1500, // Convert to paise (currency subunits)
        currency: 'INR',
        name: 'Purulia Travels',
        description: 'Hotel booking payment',
        order_id: "order_Hffsdjfhjdsf", // Replace with rz_order_id from backend
        handler: function (response) {
          console.log('Payment Success:', response);
          alert('Payment Success!'); // Show a success message to the user

          // Step 4: Handle payment success (you can add an API call to verify payment or update order status)
          // Example:
          // await MyAPI.POST('/user/hotel/payment/verify', { payment_id: response.razorpay_payment_id }, token);
        },
        prefill: {
          name: 'Rohit Kumar',
          email: 'rohit5542514@gmail.com',
          contact: '8878719466',
        },
        theme: {
          color: '#244855',
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed by the user');
          },
        },
      };

      // Step 5: Initialize Razorpay payment and open the payment modal
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      // Step 6: Handle errors (either from backend API or Razorpay initialization)
      console.log('Error creating order or opening payment option:', error);

      // You can show a user-friendly message or trigger an alert here
      alert('There was an issue with your booking. Please try again.');
    }
  };


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

                      {/* <Button
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
                      </Button> */}
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
                      {activeTab === 'overview' && (
                        <div>{packageData && packageData.description}</div>
                      )}
                      {activeTab === 'booking' && (
                        <div className="border-bottom mb-2">
                          <Row className="py-2 border-bottom">
                            <Col md={10}>
                              Select Date and Pricing Options for this trip in the Trip Options
                              setting.
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
                            <>
                              <Container>
                                <Row>
                                  <Col
                                    md={12}
                                    style={{ background: '#244855' }}
                                    className="px-3 py-5 rounded-2"
                                  >
                                    <h5 className="text-white">Cost Options</h5>
                                    <Col
                                      md={12}
                                      className="py-1 px-2 border border-white mt-2 rounded-2 shadow"
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div className="text-white">Select Options</div>
                                        <div className="text-white">
                                          <b className="text-white">
                                            ₹ {packageData && packageData.pricePerPerson}
                                          </b>
                                          <sub> / Person </sub>

                                          <Button
                                            className="rounded-0"
                                            onClick={decrementGroupSize}
                                            size="sm"
                                          >
                                            <i className="fa fa-minus" />
                                          </Button>
                                          <Button
                                            className="bg-transparent rounded-0 px-3"
                                            size="sm"
                                          >
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
                                  </Col>
                                </Row>
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
                                            parseInt(packageData && packageData.pricePerPerson),
                                            packageData.offer.value,
                                          ) * groupSize
                                        : parseInt(packageData && packageData.pricePerPerson) *
                                          groupSize}
                                      /-
                                    </b>{' '}
                                    &nbsp;
                                  </span>
                                  <Button onClick={handleBookNow}>Book Now</Button>
                                </Col>
                              </Container>
                            </>
                          )}
                          {startDate && localStorage.getItem('isAdmin') && (
                            //show warning admin can not be book feature
                            <div className="alert alert-danger px-3 py-1" role="alert">
                              Admin cannot book this package.
                            </div>
                          )}
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
                        style={{ background: '#244855', borderColor: '#244855' }}
                        className="text-truncate"
                        onClick={BookingClick}
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

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default HotelPackageDynamic
