import React from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'

const TermAndConditionPage = () => {
  return (
    <>
      <Header />

      <section className="section-padding bg-light-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center">
                <h2 className="section-title">Terms and Conditions</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="terms-conditions">
                <ol>
                  <li>
                    The above itinerary is a suggested Tour Plan. The Company is responsible for
                    only those services which are charged to the guest. All other services which are
                    not paid by the guest to the Company are suggested services, and the Company is
                    not bound to provide that service or pay the cost for the same.
                  </li>
                  <li>
                    Full payment of the trip cost must be completed before the trip begins. Pending
                    payments may eventually lead to the cancellation of the trip.
                  </li>
                  <li>
                    Check-in and check-out timing of the hotel will be according to the timing of
                    the respective hotels.
                  </li>
                  <li>
                    The Company is not responsible for compensating any loss or additional cost
                    incurred by the guest while taking the tour.
                  </li>
                  <li>
                    The Company is not responsible nor liable for any damage, loss, or injury caused
                    to any passenger while taking the tour.
                  </li>
                  <li>
                    Dollar rates are applicable only to foreign nationals and Indians possessing
                    foreign passports, while the INR package rates will be applicable to Indian
                    nationals.
                  </li>
                  <li>
                    The air conditioning will be switched off in the hills. Also, during the trip,
                    it shall be the Driver’s discretion to put off the AC as and when required,
                    considering the travelers’ safety and ease of travel along uneven and dangerous
                    routes.
                  </li>
                  <li>
                    Travelers must take care of their luggage and belongings. The management shall
                    not be responsible for any damage or any missing items during the tour.
                  </li>
                  <li>
                    Numerous factors such as weather and road conditions, the physical ability of
                    participants, etc., may bring alteration in the itinerary. We reserve the right
                    to make necessary changes in the schedule in the interest of safety, comfort,
                    and general well-being.
                  </li>
                  <li>
                    In case of injury or illness occurring to a participant during the tour,
                    external evacuation or transport services may need to be engaged to safeguard
                    the health of the participant. In such a case, any additional cost arising from
                    making such arrangements will have to be borne by the concerned participant or
                    the participant's family.
                  </li>
                  <li>All disputes are subject to Jaipur jurisdiction only.</li>
                  <li>
                    Any claim related to the package must be brought to the notice of the Company
                    within a week.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TermAndConditionPage
