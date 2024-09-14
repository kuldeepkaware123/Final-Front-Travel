import React from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'

const CancellationAndRefundPage = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <center>
              {' '}
              <h3 className="poppins">Cancellation and Refund Policy</h3>
            </center>
            <ol>
              <li>
                Cancellation within 30 Days prior to the arrival date of the tour packages / Hotel
                Booking / Transportation: No retention charge.
              </li>
              <li>
                Cancellation within 15 Days prior to the arrival date of the tour packages / Hotel
                Booking / Transportation: 50% retention.
              </li>
              <li>
                Cancellation within 10 Days prior to the arrival date of the tour packages / Hotel
                Booking / Transportation or Non-Utilization of the same: 100% retention.
              </li>
              <li>
                If a rescheduling date request comes within 30 days from the trip date, the booking
                amount can neither be adjusted to your next date nor refunded.
              </li>
              <li>
                If a rescheduling date request comes prior to 60 days, it can be done without any
                cancellation charges in the case of domestic trips.
              </li>
              <li>
                Refunds, if applicable, will be processed within 14 business days of the
                cancellation confirmation. The refund amount will be subject to the cancellation
                policy and any applicable service fees (Rs 1000 per person).
              </li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CancellationAndRefundPage
