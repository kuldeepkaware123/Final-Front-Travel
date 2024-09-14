/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'

import topDestinationImg1 from '../images/my-img/img_3.avif'
import topDestinationImg2 from '../images/my-img/img_4.jpg'
import topDestinationImg3 from '../images/my-img/img_5.jpg'
import topDestinationImg4 from '../images/my-img/img_6.jpg'
import topDestinationImg5 from '../images/my-img/img_7.jpg'
import { MyAPI, MyError } from '../MyAPI'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Destination() {
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
    <section className="trending pb-5 pt-5" >
      <div className="container">
        <div className="section-title mb-6 w-50 mx-auto text-center">
          <h4 className="mb-1 theme1">Top Destinations</h4>
          <h2 className="mb-1">
            Explore <span className="theme">India</span>
          </h2>
          <p>The Land of Sacred Traditions & Vibrant Festivals</p>
        </div>
        <div className="row align-items-start">
          {AllDestinations && AllDestinations.length < 4 && (
            <div className="col-lg-12">
              <div className="row">
                {AllDestinations &&
                  AllDestinations.length > 0 &&
                  AllDestinations.map(
                    (item, index) =>
                      item.packages &&
                      item.packages.length > 0 && (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-4 mb-4">
                          <Link to={`/${item._id}`}>
                            <div className="trend-item1">
                              <div className="trend-image position-relative rounded">
                                <img
                                  style={{ maxHeight: '60vh' }}
                                  src={item.destinationImage}
                                  alt="image"
                                />
                                <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                                  <div className="trend-content-title">
                                    <Link to={`/${item._id}`}>
                                      <h3 className="mb-0 white">
                                        {item.name || 'Name Not Found.'}
                                      </h3>
                                    </Link>
                                  </div>
                                  <span className="white bg-theme p-1 px-2 rounded">
                                    {/* {item.packages.length || 0} */}
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
                                      0}
                                    Tours
                                  </span>
                                </div>
                                <div className="color-overlay"></div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ),
                  )}
              </div>
            </div>
          )}
          {AllDestinations && AllDestinations.length >= 4 && (
            <>
              <div className="col-lg-5 mb-4">
                <Link
                  to={`/${AllDestinations && AllDestinations.length > 0 && AllDestinations[0]._id}`}
                >
                  <div className="trend-item1">
                    <div className="trend-image position-relative rounded">
                      <img
                        src={
                          AllDestinations &&
                          AllDestinations.length > 0 &&
                          AllDestinations[0].destinationImage
                        }
                        style={{
                          height: '106vh',
                          objectFit: 'cover',
                        }}
                        alt="image"
                      />
                      <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                        <div className="trend-content-title">
                          <Link
                            to={`/${AllDestinations && AllDestinations.length > 0 && AllDestinations[0]._id}`}
                          >
                            <h3 className="mb-0 white">
                              {(AllDestinations &&
                                AllDestinations.length > 0 &&
                                AllDestinations[0].name) ||
                                'Name Not Found'}
                            </h3>
                          </Link>
                        </div>
                        <span className="white bg-theme p-1 px-2 rounded">
                          {AllDestinations &&
                            AllDestinations.length > 0 &&
                            (() => {
                              let len = 0
                              AllDestinations[0].packages.forEach((pa) => {
                                if (!pa.isPrivate) {
                                  len += 1
                                }
                              })
                              return len
                            })()}{' '}
                          Tours
                        </span>
                      </div>
                      <div className="color-overlay"></div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-7">
                <div className="row">
                  {AllDestinations &&
                    AllDestinations.length > 1 &&
                    AllDestinations.map(
                      (item, index) =>
                        item.packages &&
                        item.packages.length > 0 &&
                        index !== 0 &&
                        index < 4 && (
                          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
                            <Link key={index} to={`/${item._id}`}>
                              <div className="trend-item1">
                                <div className="trend-image position-relative rounded">
                                  <img
                                    style={{ height: '50vh', maxHeight: '50vh' }}
                                    src={item.destinationImage}
                                    alt="image"
                                  />
                                  <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                                    <div className="trend-content-title">
                                      <Link to={`/${item._id}`}>
                                        <h3 className="mb-0 white">
                                          {item.name || 'Name Not Found.'}
                                        </h3>
                                      </Link>
                                    </div>
                                    <span className="white bg-theme p-1 px-2 rounded">
                                      {item.packages && item.packages.length > 0
                                        ? (() => {
                                          let len = 0
                                          item.packages.forEach((pa) => {
                                            if (!pa.isPrivate) {
                                              len += 1
                                            }
                                          })
                                          return len
                                        })()
                                        : '0'}
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
                </div>
                <div className="col-12">
                  <Link
                    to={'/explore/india'}
                    className="white bg-theme border-0 rounded-3 px-3 py-1"
                  >
                    View more
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Destination
