import React from 'react'
import { Container, Row, Col, Card, Button, Carousel, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components1/Header'
import Footer from '../components1/Footer'

const dummyData = {
  heroSection: {
    title: 'Welcome to Your Destination',
    description: 'Discover a world of adventure and natural beauty in this perfect vacation spot.',
  },
  youtubelink: 'https://www.youtube.com/embed/lF7ElMRywHo?si=hOSkZ2t9cuIrcwlO',
  pictureSections: [
    {
      heading: 'Heading 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/500x300',
    },
    {
      heading: 'Heading 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/500x300',
    },
  ],
  informationSections: [
    {
      heading: 'About the Destination',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      heading: 'Why Visit?',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ],
  howToReach: [
    { mode: 'By Air', info: 'Nearest airport is XYZ, 30 minutes away from the city.' },
    { mode: 'By Train', info: 'The closest railway station is 10 minutes from downtown.' },
    { mode: 'By Road', info: 'Well-connected by road to major cities nearby. ' },
  ],
  relatedPackages: ['Adventure Package', 'Relaxation Package', 'Cultural Tour'],
  nearestHotels: ['Hotel Paradise', 'Mountain Resort', 'City Lodge'],
}

const Placedetails = () => {
  return (
    <>
      <Header />
      <Container fluid className="p-0">
        {/* Hero Section */}
        <section
          className="hero-section text-center d-flex align-items-center justify-content-center"
          style={{
            height: '70vh',
            background: 'url(https://via.placeholder.com/1200x800) center/cover',
            color: 'white',
          }}
        >
          <div className="hero-content">
            <h1 className="display-4">{dummyData.heroSection.title}</h1>
            <p className="lead">{dummyData.heroSection.description}</p>
          </div>
        </section>

        {/* Picture + Text Sections */}
        <Container className="my-5">
          <Row>
            <div className="col-md-6">
              <img src={dummyData.pictureSections[0].image} />
            </div>
            <div className="col-md-6">
              <h2>{dummyData.pictureSections[0].heading}</h2>
              <p>{dummyData.pictureSections[0].text}</p>
            </div>
          </Row>
          <Row className="mt-5">
            <div className="col-md-6">
              <h2>{dummyData.pictureSections[1].heading}</h2>
              <p>{dummyData.pictureSections[1].text}</p>
            </div>
            <div className="col-md-6 text-end">
              <img src={dummyData.pictureSections[1].image} />
            </div>
          </Row>
        </Container>

        {/* Information Sections */}
        <Container className="my-5">
          <div>
            <h2>{dummyData.informationSections[0].heading}</h2>
            <p>{dummyData.informationSections[0].text}</p>
          </div>
          <div className='mt-5'>
            <h2>{dummyData.informationSections[1].heading}</h2>
            <p>{dummyData.informationSections[1].text}</p>
          </div>
        </Container>

        {/* Autoplay Video + How to Reach */}
        <Container className="my-5">
          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <div
                    style={{ height: '300px', backgroundColor: '#ddd' }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={dummyData.youtubelink}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboardWrite; encryptedMedia; gyroscope; pictureInPicture; webShare"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm" style={{ height: '332px' }}>
                <Card.Body>
                  <Card.Title className="text-dark fs-3 ">How to Reach</Card.Title>
                  <ul>
                    {dummyData.howToReach.map((reach, index) => (
                      <li key={index} className="fs-5 py-2">
                        <strong>{reach.mode}</strong>: {reach.info}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default Placedetails
