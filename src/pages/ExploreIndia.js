import React, { useEffect, useState } from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import { MyAPI, MyError } from '../MyAPI'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import EnquiryButton from '../components1/EnquiryButton'

function ExploreIndia() {
  const [AllDestinations, setAllDestinations] = useState([])

  const fetchAllDestinations = async () => {
    try {
      let res = await MyAPI.GET('/public/destinations')
      let { success, message, error, data } = res.data || res
      if (success) {
        let temp = []
        data.forEach((item) => {
          item.packages.length > 0 && temp.push(item)
        })
        setAllDestinations(temp)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllDestinations()
  }, [])

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
              <h1 className="mb-3">Explore India</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      {' '}
                      <span style={{ color: 'var(--secondary-color)' }}>Home</span>{' '}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Explore India
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
      <Container>
        <div className="list-results d-flex align-items-center justify-content-between">
          <div className="list-results-sort">
            <p className="m-0">
              Showing 1-5 of {AllDestinations && AllDestinations.length} results
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
        <div className="row mt-5">
          {AllDestinations &&
            AllDestinations.length > 0 &&
            AllDestinations.map(
              (item, index) =>
                item.packages &&
                item.packages.length > 0 && (
                  <div key={index} className="col-lg-3 col-md-3 col-sm-3 mb-4 rounded-3">
                    <Link to={`/${item._id}`}>
                      <div className="trend-item1">
                        <div className="trend-image position-relative rounded">
                          <img
                            style={{
                              height: '50vh',
                              maxHeight: '50vh',
                              width: '100%',
                              borderRadius: '10px',
                            }}
                            src={item.destinationImage}
                            alt="image"
                          />
                          <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-1">
                            <div className="trend-content-title">
                              <Link to={`/${item._id}`}>
                                <h3 className="mb-0 white">{item.name || 'Name Not Found.'}</h3>
                              </Link>
                            </div>
                            <span className="white bg-theme p-1 px-2 rounded">
                              {(item &&
                                item.packages &&
                                item.packages.length > 0 &&
                                (() => {
                                  let len = 0
                                  item.packages.forEach((pa) => {
                                    if (!pa.isPrivate) {
                                      len += 1
                                    }
                                  })
                                  return len
                                })()) ||
                                0}{' '}
                              &nbsp; Tours
                            </span>
                          </div>
                          <div className="color-overlay"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ),
            )}
          {AllDestinations && AllDestinations.length === 0 && <h5>No Data Found.</h5>}
        </div>
      </Container>
      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default ExploreIndia
