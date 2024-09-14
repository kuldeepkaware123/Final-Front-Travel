/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { Link } from 'react-router-dom'
import { MyAPI, MyError } from '../MyAPI'
import EnquiryButton from '../components1/EnquiryButton'
import EnquiryForm from './EnquiryForm'

function CarRentel() {
  const [cars, setCars] = useState([])
  const [showEnquiry, setShowEnquiry] = useState(false)

  const fetchAllCars = async () => {
    try {
      let res = await MyAPI.GET('/activeCars')
      let { success, message, error, data } = res.data || res
      if (success) {
        setCars(data)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllCars()
  }, [])

  return (
    <>
      <Header />
      {/*  */}

      <EnquiryForm show={showEnquiry} setShow={setShowEnquiry} />

      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1562911791-c7a97b729ec5?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          objectPosition: 'bottom',
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
              <h1 className="mb-3"> Car Rental</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    car rental
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
                    Showing 1-{cars && cars.length > 0 ? cars.length : '0'} of{' '}
                    {cars && cars.length > 0 ? cars.length : '0'} results
                  </p>
                </div>
                <div className="click-menu d-flex align-items-center justify-content-between">
                  <div className="sortby d-flex align-items-center justify-content-between ml-2">
                    <select className="niceSelect">
                      <option value="1">Sort By</option>
                      <option value="2">Average rating</option>
                      <option value="3">Price: low to high</option>
                      <option value="4">Price: high to low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* <div className="col-lg-4 col-md-4 mb-4">
                  <div className="trend-item rounded box-shadow">
                    <div className="trend-image position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="image"
                        className=""
                      />
                      <div className="color-overlay"></div>
                    </div>
                    <div className="trend-content p-4 pt-5 position-relative">
                      <div className="trend-meta bg-theme white px-3 py-2 rounded">
                        <div className="entry-author">
                          <i className="fa-solid fa-cart-shopping"></i>
                          <span className="fw-bold"> &nbsp; Book Now</span>
                        </div>
                      </div>
                      <h3 className="mb-1">
                        <Link to="/package/:id">Tesla</Link>
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
                      <div className="entry-meta">
                        <div className="entry-author d-flex align-items-center">
                          <p className="mb-0">
                            <span className="theme fw-bold fs-5"> $170.00</span> | Per hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {cars &&
                  cars.length > 0 &&
                  cars.map((car, index) => (
                    <div className="col-lg-4 col-md-4 mb-4">
                      <div className="trend-item rounded box-shadow">
                        <div className="trend-image position-relative">
                          <img loading="lazy" src={car.carImages[0]} alt="image" className="" />
                          <div className="color-overlay"></div>
                        </div>
                        <div className="trend-content p-4 pt-5 position-relative">
                          <div className="trend-meta bg-theme white px-3 py-2 rounded">
                            <div
                              onClick={() => setShowEnquiry(true)}
                              className="entry-author cursor-pointer"
                            >
                              <i className="fa-solid fa-cart-shopping"></i>
                              <span className="fw-bold"> &nbsp; Enquiry</span>
                            </div>
                          </div>
                          <h3 className="mb-1">
                            <Link to={`/car/${car._id}`}>
                              {car.carName} ( {car.carModel} )
                            </Link>
                          </h3>
                          {/* <div className="rating-main d-flex align-items-center pb-2">
                            <div className="rating">
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                            </div>
                            <span className="ms-2">(12)</span>
                          </div> */}
                          <div className="entry-meta">
                            <div className="entry-author d-flex align-items-center">
                              <p className="mb-0">
                                <span className="theme fw-bold fs-5"> ${car.carPrice}</span> | Per
                                hours
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* <div className="col-lg-12">
                  <div className="text-center">
                    <Link to="#" className="nir-btn">
                      Load More <i className="fa fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="col-lg-4 ps-lg-4">
              <div className="sidebar-sticky">
                <div className="list-sidebar">
                  <div className="sidebar-item mb-4">
                    <h3 className="">Car Company</h3>
                    <ul className="sidebar-category1">
                      <li>
                        <input type="checkbox" checked /> Tesla Model S{' '}
                        <span className="float-end">92</span>
                      </li>
                      <li>
                        <input type="checkbox" /> BMW 3 Series <span className="float-end">22</span>
                      </li>
                      <li>
                        <input type="checkbox" /> Mercedes-Benz S-Class{' '}
                        <span className="float-end">35</span>
                      </li>
                      <li>
                        <input type="checkbox" /> Porsche 911 <span className="float-end">41</span>
                      </li>
                      <li>
                        <input type="checkbox" /> Toyota Camry <span className="float-end">11</span>
                      </li>
                    </ul>
                  </div>

                  <div className="sidebar-item mb-4">
                    <h3 className="">Car Capacity</h3>
                    <ul className="sidebar-category1">
                      <li>
                        <input type="checkbox" checked /> 4 Seats{' '}
                        <span className="float-end">92</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 5 Seats <span className="float-end">22</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 8 Seats <span className="float-end">35</span>
                      </li>
                    </ul>
                  </div>

                  <div className="sidebar-item mb-4">
                    <h3 className="">Duration Type</h3>
                    <ul className="sidebar-category1">
                      <li>
                        <input type="checkbox" checked /> up to 1 hour{' '}
                        <span className="float-end">92</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 1 to 2 hour <span className="float-end">22</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 2 to 4 hour <span className="float-end">35</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 4 to 8 hour <span className="float-end">41</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 8 to 1 Day <span className="float-end">11</span>
                      </li>
                      <li>
                        <input type="checkbox" /> 1 Day to 2 Days{' '}
                        <span className="float-end">61</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default CarRentel
