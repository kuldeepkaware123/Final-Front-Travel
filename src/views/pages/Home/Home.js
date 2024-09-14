import React from 'react'
import Header from '../../../components1/Header'
import Banner from '../../../components1/Banner'
import ExploreRJ from '../../../components1/ExploreRJ'
import Destination from '../../../components1/Destination'
import UpcomingCommunityTrip from '../../../components1/UpcomingCommunityTrip'
import SliderBanner from '../../../components1/SliderBanner'
import AboutUse from '../../../components1/AboutUse'
import Testimonials from '../../../components1/Testimonials'
import TopDeals from '../../../components1/TopDeals'
import ContactUs from '../../../components1/ContactUs'
import BestTour from '../../../components1/BestTour'
import Footer from '../../../components1/Footer'
import WhatsAppHelp from '../../../components1/WhatsAppHelp'

function Home() {
  return (
    <>
      <Header />

      <Banner />

      <ExploreRJ />

      <Destination />

      <UpcomingCommunityTrip />

      <br />
      <br />
      <br />
      <br />
      <br />
      <SliderBanner />

      <AboutUse />

      <Testimonials />

      <TopDeals />

      <ContactUs />

      {/* <KnowUs /> */}

      <BestTour />
      {/* <DiscountAction /> */}
      {/* <OfferPackage /> */}
      {/* <OurTeam /> */}

      {/* <OurPartner /> */}
      {/* <Articals /> */}
      <Footer />
      <WhatsAppHelp />
      {/* <!-- Back to top start --> */}
      <div id="back-to-top">
        <a href="#"></a>
      </div>
      {/* <!-- Back to top ends --> */}

      {/* <!-- search popup --> */}
      <div id="search1">
        <button type="button" className="close">
          ×
        </button>
        <form>
          <input type="search" value="" placeholder="type keyword(s) here" />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </>
  )
}

export default Home
