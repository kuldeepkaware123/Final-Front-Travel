import React from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PaymentsPage = () => {
  return (
    <>
      <Header />

      <div className="container d-flex align-items-center px-5 justify-content-center">
        <Container className="shadow mt-5 mb-5 rounded-3 px-3 py-3">
          <Row>
            <Col md={6}>
              <div className="px-3 py-3 rounded-3" style={{ background: '#FBFBFB' }}>
                <div>
                  <span className="poppins bg-dark rounded-5 px-3 text-white py-1">
                    Payment Methods
                  </span>
                </div>
                <br />
                <p>
                  <strong className="text-dark">A/C No</strong>50200086657577{' '}
                </p>
                <p>
                  <strong className="text-dark">A/C Name</strong> Purulia Travels PRIVATE LIMITED
                </p>
                <p>
                  <strong className="text-dark">A/C IFSC</strong> HDFC0006646
                </p>
                <p>
                  <strong className="text-dark">A/C Branch</strong> SITABARI TONK ROAD
                </p>
              </div>
              <div className="px-3 py-3 rounded-3 mt-3" style={{ background: '#FBFBFB' }}>
                <div>
                  <span className="poppins bg-dark rounded-5 px-3 text-white py-1">
                    UPI Payment
                  </span>
                </div>
                <br />
                <p>
                  <strong className="text-dark">UPI us at (Google Pay / BHIM / PhonePe) : </strong>
                  PuruliaRoutes@hdfcbank || PuruliaRoutes@ybl{' '}
                </p>
                <p>
                  <strong className="text-dark">UPI Name :</strong> Purulia Travels PRIVATE LIMITED
                </p>
              </div>
              <div className="px-3 py-3 rounded-3 mt-3" style={{ background: '#FBFBFB' }}>
                <div>
                  <span className="poppins bg-dark rounded-5 px-3 text-white py-1">
                    Razorpay Link
                  </span>
                </div>
                <br />
                <p>
                  <strong className="text-dark">Razorpay :</strong>
                  <Link target="_blank" to="https://razorpay.me/@PuruliaRoutes">
                    https://razorpay.me/@PuruliaRoutes
                  </Link>
                </p>
                <p>
                  <strong className="text-danger">Note</strong> A payment getaway charge 3% will be
                  levied on using above given payment link.
                </p>
              </div>
            </Col>
            <Col className="d-flex align-content-center justify-content-center" md={6}>
              <div
                className="px-3 py-3 rounded-3"
                style={{ background: '#FFEFEF', maxWidth: '320px' }}
              >
                <h3 className="text-danger">Note</h3>
                <ol>
                  <li>
                    To ensure your payment is securely processed, please make payments only to the
                    official bank details provided on our website.
                  </li>
                  <li>
                    Do not make payments to any other account. We will not be responsible for any
                    losses incurred if payments are made to unauthorized bank accounts.
                  </li>
                  <li>
                    If you have any questions or concerns, please contact us on - +91 70014 24500
                  </li>
                  <li>
                    A payment getaway charge 3% will be levied on using above given payment link.
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  )
}

export default PaymentsPage
