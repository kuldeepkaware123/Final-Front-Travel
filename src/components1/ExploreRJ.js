/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import video from '../images/rj_tour/9f47f490-e2ef079b.mp4'
import img_1 from '../images/rj_tour/img_1.webp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { MyAPI, MyError } from '../MyAPI'
import { Link } from 'react-router-dom'
function ExploreRJ() {
  const [destination, setDestination] = useState([])
  const fetchDestinations = async (id) => {
    try {
      let res = await MyAPI.GET(`/public/rajasthaniPackages`)
      let { success, message, error, packages } = res.data || res
      if (success) {
        setDestination(packages)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  return (
    <div className="container w-100 mt-5 position-relative">
      <div className="container position-relative w-100 h-100 rounded-4 p-0 m-0 overflow-hidden">
        <video
          style={{ width: '100%', height: '100%', borderRadius: '12px' }}
          src={video}
          loop
          autoPlay
          muted
        />
        <div
          className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-start justify-content-center ps-4 flex-column"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
            borderRadius: '15px',
          }}
        >
          <h2 className="text-white m-0 font-monospace">
            Discover{' '}
            <span className="" style={{ color: '#FBE9D0' }}>
              Rajasthan
            </span>
          </h2>
          <p className="text-white">A Simpany of colors, culture, & camel's. </p>
          <button
            style={{ backgroundColor: 'var(--tertiary-color)' }}
            className="px-4 py-1 rounded-3 text-white mt-4 mb-4"
          >
            Explore
          </button>
        </div>
      </div>
      {/* <div
        className="container w-100 h-75 position-absolute px-5"
        style={{ height: '40vh', top: '80%', left: '50%', transform: 'translate(-50%, -5%)' }}
      >
        <Swiper
          pagination={true}
          modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          //   navigation={{ nextEl, prevEl }}
          slidesPerView={window.innerWidth > 768 ? 4 : 1}
          slideFullyVisibleClass={true}
        >
          {destination &&
            destination.length > 0 &&
            destination.map((item, index) => (
              <SwiperSlide>
                <Link to={`/package/${item._id}`}>
                  <div className="col-12 border border-5 border-white col-md-12 col-lg-12 rounded-3 position-relative overflow-hidden m-0 p-0">
                    <img
                      src={item.galleryImages[0] || item.galleryImages[1]}
                      className="rounded-3"
                      style={{
                        width: '100%',
                        height: '60vh',
                        maxHeight: '60vh',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-end gap-3 justify-content-center">
                      <div>
                        <h4 className="text-white text-center">
                          {item.title.split(' ').slice(0, 5).join(' ')}...
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div> */}
    </div>
  )
}

export default ExploreRJ
