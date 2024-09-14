import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './timeline.css'

const Timeline = ({ events }) => {
  return (
    <Container className="timeline-container mb-4 border-bottom">
      <center>
        <h2 className="mb-3">Itineraries</h2>
      </center>
      {events &&
        events.map((event, index) => (
          <Row key={index} className="timeline-row">
            {index < events.length && (
              <Col md={12} className="text-center m-0">
                <div className="timeline-connector">
                  <div className="timeline-circle"></div>
                  {/* <div className="timeline-line h-100"></div> */}
                </div>
              </Col>
            )}
            {(index + 1) % 2 === 0 ? (
              <>
                <Col md={6} className="m-0 text-end">
                  <h3 className="timeline-title">Day {index + 1}</h3>
                </Col>
                <Col md={6} className="text-right border-start border-dark border-2 m-0">
                  <h5 className="timeline-title">{event.heading ?? 'No Heading'}</h5>
                  <p className="timeline-description">{event.activity ?? 'No Activity'}</p>
                </Col>
              </>
            ) : (
              <>
                <Col md={6} className="border-end border-dark border-2  text-end m-0">
                  <h5 className="timeline-title">{event.heading ?? 'No Heading'}</h5>
                  <p className="timeline-description">{event.activity ?? 'No Activity'}</p>
                </Col>
                <Col md={6} className="border-start border-dark border-2 m-0 text-start">
                  <h3 className="timeline-title">Day {index + 1}</h3>
                </Col>
              </>
            )}
          </Row>
        ))}
    </Container>
  )
}

export default Timeline
