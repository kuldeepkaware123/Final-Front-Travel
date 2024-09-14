/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
// import img1 from "../images/travel2.png";
import img1 from '../images/my-img/img_8.png'
import img2 from '../images/testimonial/img1.jpg'
import img3 from '../images/testimonial/img1.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { MyAPI, MyError } from '../MyAPI'
// import { MdOutlineNavigateNext } from "react-icons/md";

function Testimonials() {
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

  return (
    <section className="testimonial pt-9 testimonial-home-bg-img">
      <div className="container">
        <div className="section-title mb-6 text-center w-75 mx-auto">
          <h4 className="mb-1 theme1">Our Testimonails</h4>
          <h2 className="mb-1">
            What are <span className="theme">Clients</span> Say's
          </h2>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p> */}
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5 pe-4">
            <div className="testimonial-image">
              <img src={img1} alt="" />
            </div>
          </div>
          <div className="col-lg-7 ps-4">
            <div className="row review-slider">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
                slidesPerView={1}
                loop={true}
                grabCursor={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{
                  nextEl: '.custom-next-slide-1', // Custom next button
                  prevEl: '.custom-prev-slide-1', // Custom prev button
                }}
              >
                {testimonial &&
                  testimonial.length > 0 &&
                  testimonial.map((item, index) => (
                    <SwiperSlide>
                      <div className="col-sm-4 col-md-12 item">
                        <div className="testimonial-item1 rounded">
                          <div className="author-info d-flex align-items-center mb-4">
                            <img
                              src={
                                item.image ||
                                'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
                              }
                              style={{ objectFit: 'cover' }}
                              alt=""
                            />
                            <div className="author-title ms-3">
                              <h5 className="m-0 theme">{item.name}</h5>
                              <span>{item.position}</span>
                            </div>
                          </div>
                          <div className="details">
                            <p className="m-0">
                              <i className="fa fa-quote-left me-2 fs-1"></i>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                {/* <SwiperSlide>
                  <div className="col-sm-4 col-md-12 item">
                    <div className="testimonial-item1 rounded">
                      <div className="author-info d-flex align-items-center mb-4">
                        <img src={img2} alt="" />
                        <div className="author-title ms-3">
                          <h5 className="m-0 theme">Jared Erondu</h5>
                          <span>Supervisor</span>
                        </div>
                      </div>
                      <div className="details">
                        <p className="m-0">
                          <i className="fa fa-quote-left me-2 fs-1"></i>Lorem Ipsum is simply dummy
                          text of the printing andypesetting industry. Lorem ipsum a simple Lorem
                          Ipsum has been the industry's standard dummy hic et quidem. Dignissimos
                          maxime velit unde inventore quasi vero dolorem.
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide> */}
              </Swiper>
            </div>
            <div className="mt-5 d-flex align-content-center justify-content-start gap-3">
              <span className="custom-prev-slide-1 d-flex align-items-center justify-content-center border rounded-circle cursor-pointer custome-slide-btn-1">
                {' '}
                {'<'}{' '}
              </span>
              <span className="custom-next-slide-1 d-flex align-items-center justify-content-center border rounded-circle cursor-pointer custome-slide-btn-1">
                {' '}
                {'>'}{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
