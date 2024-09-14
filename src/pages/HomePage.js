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

      <Testimonials />

      <TopDeals />


      <Footer />
      <WhatsAppHelp />

    </>
  )
}

export default HomePage
