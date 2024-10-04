import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components1/Header';
import Footer from '../components1/Footer';
import { MyAPI, MyError } from '../MyAPI';
import { useParams } from 'react-router-dom';

const Placedetails = () => {
  const [places, setPlaces] = useState(null); // Initialize as null to handle loading state
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchAllPlaces = async () => {
    setLoading(true);
    try {
      let res = await MyAPI.GET(`/public/place/${id}`);
      let { success, message, error, data } = res.data || res;

      if (success) {
        setPlaces(data);
      } else {
        MyError.error(message || error || 'Server Error. Please try again later.');
      }
    } catch (error) {
      MyError.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  if (!places) {
    return <div>No data available</div>; // Handle no data case
  }

  return (
    <>
      <Header />
      <Container fluid className="p-0">
        {/* Hero Section */}
        <section
          className="hero-section text-center d-flex align-items-center justify-content-center"
          style={{
            height: '70vh',
            background: `url(${places.galleryImages[0]}) center/cover`,
            color: 'white',
          }}
        >
          <div className="hero-content">
            <h1 className="display-4">{places.title}</h1>
            <p className="lead">{places.description}</p>
          </div>
        </section>

        {/* Picture + Text Sections */}
        <Container className="my-5">
          {places.content.map((section, index) => (
            <Row key={section._id} className={index % 2 === 0 ? 'mb-5' : 'mb-5 flex-row-reverse'}>
              <Col md={6}>
                <h2>{section.heading}</h2>
                <p>{section.description}</p>
              </Col>
              <Col md={6}>
                <img src={places.galleryImages[index % places.galleryImages.length]} alt={section.heading} className="img-fluid" />
              </Col>
            </Row>
          ))}
        </Container>

        {/* Information Sections */}
        <Container className="my-5">
          <div>
            <h2>About the Destination</h2>
            <p>{places.aboutThePlace}</p>
          </div>
          <div className="mt-5">
            <h2>Why Visit?</h2>
            <p>{places.whyVisit}</p>
          </div>
        </Container>

        {/* Autoplay Video + How to Reach */}
        <Container className="my-5">
          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <div style={{ height: '300px', backgroundColor: '#ddd' }} className="d-flex align-items-center justify-content-center">
                    <iframe
                      width="100%"
                      height="100%"
                      src={places.ytLink.replace('watch?v=', 'embed/')}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm" style={{ height: '332px' }}>
                <Card.Body>
                  <Card.Title className="text-dark fs-3">How to Reach</Card.Title>
                  <ul>
                    {places.howToReach.split('.').map((reach, index) => (
                      <li key={index} className="fs-5 py-2">
                        {reach.trim() && <span>{reach.trim()}.</span>}
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
  );
};

export default Placedetails;
