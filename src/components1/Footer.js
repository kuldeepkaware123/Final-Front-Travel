import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

// import img1 from "../images/logo-white.png";
// import img1 from '../images/my-img/logo-removebg-preview.png'
// import img1 from '../assets/Logo/White/PuruliaRoutes-logo-White-rgb.svg'
import img2 from '../images/insta/ins-3.jpg'
import img3 from '../images/insta/ins-4.jpg'
import img4 from '../images/insta/ins-5.jpg'
import img5 from '../images/insta/ins-1.jpg'
import img6 from '../images/insta/ins-7.jpg'
import img7 from '../images/insta/ins-8.jpg'
import img8 from '../images/insta/ins-2.jpg'
import img9 from '../images/insta/ins-6.jpg'
import img10 from '../images/insta/ins-9.jpg'
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="pt-10 pb-4 footer-bg-img-1">


      <div className="footer-upper pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4 pe-4">
              <div className="footer-about">

                <h3 className="white">About Us</h3>
                {/* <img style={{ width: '65px', height: '100%' }} src={img1} alt="" /> */}
                <p className="mt-3 mb-3 white">
                  Welcome to Purulia Travels where your travel dreams come to life. Our Company is
                  dedicated to Offering exceptional travel experiences that are tailored to your
                  unique preferences We make your Journey memorable and stress free.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="footer-links">
                <h3 className="white">Quick link</h3>
                <ul>
                  <li>
                    <Link to="/payments">Payments</Link>
                  </li>
                  <li>
                    <Link to="/term&condition">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/cancellationAndRefund">Cancellation & Refund</Link>
                  </li>
                  <li>
                    <Link to="/privacyPolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 mb-4">
              <h3 className="white">Address</h3>
              <ul>
                <li className="white">
                  <strong>Address:</strong> Purulia Travels Pvt. Ltd. Purulia, West Bengal, India
                </li>
                <li className="white">
                  <strong>Mobile No.:</strong> +91 70014 24500
                </li>
                <li className="white">
                  <strong>Email:</strong> Info@PuruliaRoutes.com
                </li>
                <br />
                <li className="white">
                  <strong>Website:</strong> www.PuruliaRoutes.com
                </li>
              </ul>
            </div>
            <Col

              className="d-flex align-items-start justify-content-center flex-column gap-3"
            >

            </Col>
          </div>
        </div>
      </div>



      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-inner rounded p-3 d-md-flex align-items-center justify-content-between">
            <div className="copyright-text">
              <p className="m-0 white">2024 Purulia Travels. All rights reserved.</p>
            </div>
            <div className="social-links">
              <ul>
                <li>
                  <Link href="#">
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="particles-js"></div>
    </footer>
  )
}

export default Footer
