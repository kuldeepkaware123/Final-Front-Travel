/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

import BestTour from '../components1/BestTour'
import TopDeals from '../components1/TopDeals'
import DiscountAction from '../components1/DiscountAction'
import OfferPackage from '../components1/OfferPackage'
import OurTeam from '../components1/OurTeam'
import Testimonials from '../components1/Testimonials'
import OurPartner from '../components1/OurPartner'
import Articals from '../components1/Articals'
import Footer from '../components1/Footer'
import Header from '../components1/Header'
import Banner from '../components1/Banner'
import AboutUse from '../components1/AboutUse'
import Destination from '../components1/Destination'
import KnowUs from '../components1/KnowUs'
import Preloader from '../components1/Preloader'
import ExploreRJ from '../components1/ExploreRJ'
import UpcomingCommunityTrip from '../components1/UpcomingCommunityTrip'
import SliderBanner from '../components1/SliderBanner'
import ContactUs from '../components1/ContactUs'
import WhatsAppHelp from '../components1/WhatsAppHelp'
import EnquiryForm from './EnquiryForm'
import EnquiryButton from '../components1/EnquiryButton'
import EnquiryFormTimer from './EnquiryFormTimer'

function HomePage() {
  const [enquiryForm, setEnquiryForm] = useState(true)
  return (
    <>
      {/* <!-- Preloader --> */}
      {/* <div id="preloader">
        <div id="status"></div>
      </div> */}
      {/* <Preloader /> */}
      {/* <!-- Preloader Ends --> */}

      {/* <EnquiryForm setShow={setEnquiryForm} show={enquiryForm} /> */}

      {/* <EnquiryFormTimer key={1} /> */}

      <Header />

      <Banner />

      {/* <ExploreRJ /> */}

      <Destination />

      <SliderBanner />

      <BestTour />

      {/* <UpcomingCommunityTrip /> */}

      <AboutUse />

      {/* <Testimonials /> */}
      <section className="testimonial pt-9 testimonial-home-bg-img">
        <div className="container">
          <div className="section-title mb-6 text-center w-75 mx-auto">
            <h4 className="mb-1 theme1">Our Locations</h4>
            <h2 className="mb-1">Locations of Purulia</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore.
            </p>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58617.356363972154!2d86.32118831459422!3d23.330819627946482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f67d8536b0f1fd%3A0xdc1033bd1a93d07b!2sPurulia%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1726488335593!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen
              className="w-100 h-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>
        </div>
      </section>

      <TopDeals />

      <Footer />
      <WhatsAppHelp />
    </>
  )
}

export default HomePage
