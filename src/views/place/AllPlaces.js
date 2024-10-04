import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import { MyAPI ,MyError } from '../../MyAPI';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    setLoading(true);
    setError('');

    try {

      const response = await MyAPI.GET('/admin/places', token)

      setPlaces(response.data.data)

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch places. Please try again later.');
    }
  };
  useEffect(() => {

    fetchPlaces();
  }, [token]);

  const handleDelete = async (placeId) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      setLoading(true);
      try {
        const res = await MyAPI.DELETE(`/admin/place/${placeId}`, token);

        let { success, message, error } = res.data || res
        if (success) {
          fetchPlaces();
          MyError.success(message)
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to delete the place. Please try again later.');
      }
    }
  };

  const handleShow = (place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPlace(null);
  };

  return (
    <div className="all-places">
      <h1>All Places</h1>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {places.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>YouTube Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place._id}>
                <td>{place.title}</td>
                <td>{place.ytLink}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleShow(place)}
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/edit-place/${place._id}`)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(place._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && <p>No places found.</p>
      )}

      {/* Modal for viewing place details */}
      <Modal show={showModal} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedPlace && (
            <>
              <h5>Description</h5>
              <p>{selectedPlace.description}</p>

              <h5>About The Place</h5>
              <p>{selectedPlace.aboutThePlace}</p>

              <h5>Why Visit</h5>
              <p>{selectedPlace.whyVisit}</p>

              <h5>How to Reach</h5>
              <p>{selectedPlace.howToReach}</p>

              <h5>YouTube Link</h5>
              <p>
                <a href={selectedPlace.ytLink} target="_blank" rel="noopener noreferrer">
                  {selectedPlace.ytLink}
                </a>
              </p>

              <h5>Gallery Images</h5>
              <div className="gallery">
                {selectedPlace.galleryImages.map((image, index) => (
                  <img key={index} src={image} alt={`Gallery ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
                ))}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllPlaces;
