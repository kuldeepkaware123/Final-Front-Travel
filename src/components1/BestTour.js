/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import img1 from '../images/trending/trending2.jpg'
import img2 from '../images/trending/trending3.jpg'
import img3 from '../images/trending/trending4.jpg'
import img4 from '../images/trending/trending1.jpg'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { MyAPI, MyError, truncateText } from '../MyAPI'
import { Link } from 'react-router-dom'

function BestTour() {
  const [allPackages, setAllPackages] = useState([])
  const fetchAllPAckages = async () => {
    try {
      let res = await MyAPI.GET('/public/featuredPackages')
      let { success, message, error, packages } = res.data || res
      console.log('fetured', res.data)
      if (success) {
        setAllPackages(packages)
      } else {
        MyError.error(message || error || 'Server Error Please try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllPAckages()
  }, [])

  return (
    <>
      {/* <!-- best tour Starts --> */}
      <section className="trending pb-0">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-6 ">
            <div className="col-lg-7">
              <div className="section-title text-center text-lg-start">
                <h4 className="mb-1 theme1">Top Packages</h4>
                <h2 className="mb-1">
                  Best <span className="theme">Selling  Packages</span>
                </h2>
                <p>Travel Smart With Our Best Selling Escapes.</p>
              </div>
            </div>
            <div className="col-lg-5 d-flex align-items-center justify-content-end gap-3">
              <div className="px-4 py-1 border rounded-3 cursor-pointer custome-slide-btn custome-slide-btn-prev">
                {'<'}
              </div>
              <div className="px-4 py-1 border rounded-3 cursor-pointer custome-slide-btn custome-slide-btn-next">
                {'>'}
              </div>
            </div>
          </div>
          <div className="trend-box">
            {/* <div className="row item-slider"> */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
              slidesPerView={window.innerWidth > 768 ? 3 : 1}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 3000 }}
              navigation={{
                nextEl: '.custome-slide-btn-next', // Custom next button
                prevEl: '.custome-slide-btn-prev', // Custom prev button
              }}
            // navigation={true}
            >
              {allPackages &&
                allPackages.length > 0 &&
                allPackages.map((item) => (
                  <SwiperSlide>
                    <div className="col-lg-12 col-md-6 col-sm-6 mb-4">
                      <Link to={`/package/${item._id}`}>
                        <div className="trend-item rounded box-shadow">
                          <div className="trend-image position-relative">
                            <img
                              style={{ maxHeight: '60vh', height: '60vh' }}
                              src={item.galleryImages[0] || item.galleryImages[1]}
                              alt="image"
                              className=""
                            />
                            <div className="color-overlay"></div>
                          </div>
                          <div className="trend-content p-4 pt-5 position-relative">
                            <div className="trend-meta bg-theme white px-3 py-2 rounded">
                              <div className="entry-author">
                                <i className="icon-calendar"></i>
                                <span className="fw-bold">
                                  &nbsp; {item.nights}N / {item.days}D
                                </span>
                              </div>
                            </div>
                            <h5 className="theme mb-1">
                              <i className="flaticon-location-pin"></i> Croatia
                            </h5>
                            <h3 className="mb-1">
                              <Link to={`/package/${item._id}`}>{item.title}</Link>
                            </h3>
                            <p className=" border-b pb-1">{truncateText(item.description, 15)}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* </div> */}
          </div>
        </div>
      </section>
      {/* <!-- best tour Ends --> */}
    </>
  )
}

export default BestTour
