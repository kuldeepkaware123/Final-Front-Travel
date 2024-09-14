import React, { useState, useEffect } from 'react'
import { Button, Form, ListGroup, InputGroup, Container, Row, Col, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MyAPI, MyError } from '../../MyAPI' // Assuming this is where your API functions are defined
import { useSelector } from 'react-redux'

function CreateDestination() {
  const [destinations, setDestinations] = useState([])
  const [newDestination, setNewDestination] = useState('')
  const [newImage, setNewImage] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editDestination, setEditDestination] = useState('')
  const [editImage, setEditImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const token = useSelector((state) => state.token)

  useEffect(() => {
    getAllDestinations()
  }, [token])

  const getAllDestinations = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/destination', token) // Adjust endpoint as per your API
      let { success, message, error, destination } = res.data || res
      setLoading(false)
      if (success) {
        setDestinations(destination || []) // Ensure destinations is initialized to an empty array if null
      } else {
        MyError.error(message || error || 'Server Error..')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleAddDestination = async () => {
    if (!newDestination.trim() || !newImage) {
      return MyError.warn('Please Enter Destination and Select Image.')
    }

    const formData = new FormData()
    formData.append('name', newDestination)
    formData.append('destinationImage', newImage)

    try {
      setLoading(true)
      let res = await MyAPI.FORM_DATA_POST('/destination', formData, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        setNewDestination('')
        setNewImage(null)
        getAllDestinations() // Refresh destinations after adding
        MyError.success(message)
      } else {
        MyError.warn(message || error || 'Server Error..')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleDeleteDestination = async (index) => {
    const destinationId = destinations[index]._id // Assuming each destination object has an _id
    try {
      let res = await MyAPI.DELETE(`/destination/${destinationId}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        const updatedDestinations = [...destinations]
        updatedDestinations.splice(index, 1)
        setDestinations(updatedDestinations)
        MyError.success(message)
      } else {
        MyError.warn(message || error || 'Server Error..')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleEditDestination = (index) => {
    setEditingIndex(index)
    setEditDestination(destinations[index].name)
    setEditImage(null)
  }

  const handleSaveEdit = async (index) => {
    const destinationId = destinations[index]._id // Assuming each destination object has an _id
    const formData = new FormData()
    formData.append('name', editDestination)
    if (editImage) {
      formData.append('destinationImage', editImage)
    }

    try {
      setLoading(true)
      let res = await MyAPI.PUT(`/destination/${destinationId}`, formData, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        getAllDestinations()
        const updatedDestinations = [...destinations]
        updatedDestinations[index].name = editDestination
        if (editImage) {
          updatedDestinations[index].image = URL.createObjectURL(editImage)
        }
        setDestinations(updatedDestinations)
        setEditingIndex(null)
        MyError.success(message)
      } else {
        MyError.warn(message || error || 'Server Error..')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const filteredDestinations =
    destinations.length > 0
      ? destinations.filter((destination) =>
          destination.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : []

  return (
    <Container className="p-3">
      <Row>
        <Col md={8}>
          <span>Destinations</span>
        </Col>
        <Col md={4} className="text-end">
          <Form.Control
            type="text"
            className="input-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations"
          />
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col md={12}>
          <InputGroup className="mb-3 d-flex align-items-center input-border rounded-3 px-3">
            <Form.Control
              type="text"
              className="border-0"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              placeholder="Add new destination"
            />
            <Form.Control
              type="file"
              className="border-0"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <Button variant="primary" onClick={!loading && handleAddDestination}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Add'}
            </Button>
          </InputGroup>
          {/* {filteredDestinations.length === 0 && <p>No destinations found.</p>} */}
          <ListGroup>
            {filteredDestinations &&
              filteredDestinations.length > 0 &&
              filteredDestinations.map((destination, index) => (
                <ListGroup.Item key={index}>
                  {editingIndex === index ? (
                    <InputGroup className="d-flex align-items-center justify-content-between">
                      <Form.Control
                        type="text"
                        value={editDestination}
                        onChange={(e) => setEditDestination(e.target.value)}
                      />
                      <Form.Control type="file" onChange={(e) => setEditImage(e.target.files[0])} />
                      {loading ? (
                        <Button variant="success">Saving...</Button>
                      ) : (
                        <Button variant="success" onClick={() => handleSaveEdit(index)}>
                          Save
                        </Button>
                      )}
                    </InputGroup>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={destination.destinationImage}
                          alt={destination.name}
                          style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span>{destination.name}</span>
                      </div>
                      <div>
                        <Button
                          variant="warning"
                          onClick={() => handleEditDestination(index)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteDestination(index)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            {!loading && filteredDestinations && filteredDestinations.length === 0 && (
              <ListGroup.Item>
                <p>No destinations found.</p>
              </ListGroup.Item>
            )}
            {loading && (
              <ListGroup.Item>
                <p>Loading...</p>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateDestination
