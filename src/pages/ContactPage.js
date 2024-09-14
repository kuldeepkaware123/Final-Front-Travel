import React from 'react'
import Header from '../components1/Header'
import Footer from '../components1/Footer'
import { Col, Container, Row } from 'react-bootstrap'

const ContactPage = () => {
  return (
    <>
      <Header />

      <Container className="border p-3 my-4 shadow rounded-4">
        <Row>
          <Col md={6}>
            <h2>Contact Us</h2>
            <p>
              We are here to help you with all your queries and concerns. Please feel free to
              contact us.
            </p>
            <p>
              <strong>Address:</strong> 123, XYZ Road, Jaipur, Rajasthan, India
            </p>
            <p>
              <strong>Email:</strong> test@test.com
            </p>
            <p>
              <strong>Phone:</strong> +91 1234567890
            </p>
          </Col>
          <Col md={6}>
            <h2>Send Us a Message</h2>
            <form>
              <div className="form-group">
                <label for="name">Name:</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label for="message">Message:</label>
                <textarea className="form-control" id="message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  )
}

export default ContactPage
