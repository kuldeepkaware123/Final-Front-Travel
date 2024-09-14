/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'

import { Swiper, SwiperSlide } from 'swiper/react'
import { MyAPI, MyError } from '../MyAPI'
import { Link, useNavigate } from 'react-router-dom'
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles
// import "./SliderBanner.css"; // Import your custom styles

function SliderBanner() {
  const [allBanner, setAllBanner] = useState([])
  const navigate = useNavigate()
  const fetchBanner = async () => {
    try {
      let res = await MyAPI.GET(`/public/banner`)
      let { success, message, error, banner } = res.data || res
      console.log(res.data)
      if (success) {
        MyError.success(message)
        setAllBanner(banner)
        // fetchBanner()
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])
  return (
    <div className="container mt-3 px-3 SliderBanner-1 position-relative">
      <button
        className="custom-prev-slide position-absolute top-50 translate-middle-y d-none d-md-block"
        style={{
          zIndex: '142512001',
          left: '-10px',
          borderRadius: '50%',
          background: 'var(--primary-color)',
          padding: '10px',
        }}
      >
        <GrFormPrevious size={22} color="#fff" />
      </button>
      <button
        className="custom-next-slide position-absolute top-50 translate-middle-y d-none d-md-block"
        style={{
          zIndex: '142512001',
          right: '-10px',
          borderRadius: '50%',
          background: 'var(--primary-color)',
          padding: '10px',
        }}
      >
        <GrFormNext size={22} color="#fff" />
      </button>
      <Swiper
        pagination={{
          clickable: true,
          el: '.custom-pagination', // Custom pagination element
        }}
        navigation={{
          nextEl: '.custom-next-slide', // Custom next button
          prevEl: '.custom-prev-slide', // Custom prev button
        }}
        modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
      >
        {allBanner &&
          allBanner.length > 0 &&
          allBanner.map((item, index) => (
            <SwiperSlide>
              <Link
                to={item.externalLink}
                target="_blank"
                className="col-12 col-md-12 cursor-pointer"
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    minHeight: '20vh',
                  }}
                  src={item.bannerImage}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="custom-pagination d-flex align-items-center justify-content-center gap-2 mt-3"></div>
    </div>
  )
}

export default SliderBanner
