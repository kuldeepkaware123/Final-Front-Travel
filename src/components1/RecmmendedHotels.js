import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { truncateText } from '../MyAPI'
import { Link } from 'react-router-dom'

const RecmmendedHotels = ({ hotels }) => {
  return (
    <>
      <section className="trending pb-0">
        <div className="container m-0 p-0">
          <div className="row align-items-center justify-content-between mb-6 ">
            <div className="col-lg-7">
              <div className="section-title text-center text-lg-start">
                <h5 className="mb-1 theme1">Related Hotels</h5>
                <h3 className="mb-1">
                  Recommended <span className="theme">Hotels</span>
                </h3>
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore.
                </p> */}
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
            >
              {hotels &&
                hotels?.length > 0 &&
                hotels?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="col-lg-12 col-md-6 col-sm-6 mb-4">
                      <div className="trend-item rounded box-shadow">
                        <div className="trend-image position-relative">
                          <img
                            style={{ maxHeight: '40vh', height: '40vh' }}
                            src={item?.galleryImages[0]}
                            alt="image"
                            className=""
                          />
                          <div className="color-overlay"></div>
                        </div>
                        <div className="trend-content p-4 pt-5 position-relative">
                          
                          <h3 className="mb-1">
                            <Link to={`/hotel/package/${item?._id}`}>{item?.title}</Link>
                          </h3>
                          <p className=" border-b pb-1">{truncateText(item?.description, 15)}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default RecmmendedHotels
