import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, InputGroup, Container, Row, Col, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function TripType() {
  const [tripTypes, setTripTypes] = useState([])
  const [newTripType, setNewTripType] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editTripType, setEditTripType] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const token = useSelector((state) => state.token)

  const getAllTripTypes = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/tripType', token)
      let { success, message, error, tripType } = res.data || res
      setLoading(false)
      if (success) {
        setTripTypes(tripType)
      } else {
        MyError.error(message || error || 'Server Error..')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    getAllTripTypes()
  }, [token])

  const handleAddTripType = async () => {
    if (!newTripType.trim()) {
      return MyError.warn('Please Enter Trip Type.')
    }

    try {
      setLoading(true)
      let res = await MyAPI.POST('/tripType', { name: newTripType }, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        setNewTripType('')
        getAllTripTypes() // Refresh trip types after adding
        MyError.success(message)
      } else {
        MyError.warn(message || error || 'Server Error..')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleDeleteTripType = async (index) => {
    const tripTypeId = tripTypes[index]._id // Assuming each tripType object has an _id
    try {
      let res = await MyAPI.DELETE(`/tripType/${tripTypeId}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        const updatedTripTypes = [...tripTypes]
        updatedTripTypes.splice(index, 1)
        setTripTypes(updatedTripTypes)
        MyError.success(message)
      } else {
        MyError.warn(message || error || 'Server Error..')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleEditTripType = (index) => {
    setEditingIndex(index)
    setEditTripType(tripTypes[index].name)
  }

  const handleSaveEdit = async (index) => {
    const tripTypeId = tripTypes[index]._id // Assuming each tripType object has an _id
    try {
      setLoading(true)
      let res = await MyAPI.PUT(`/tripType/${tripTypeId}`, { name: editTripType }, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        const updatedTripTypes = [...tripTypes]
        updatedTripTypes[index].name = editTripType
        setTripTypes(updatedTripTypes)
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

  const filteredTripTypes = tripTypes.filter((tripType) =>
    tripType.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Container className="p-3">
      <Row>
        <Col md={8}>
          <span>Trip Type</span>
        </Col>
        <Col md={4} className="text-end">
          <Form.Control
            type="text"
            className="input-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trip types"
          />
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col md={12}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              className="input-border"
              value={newTripType}
              onChange={(e) => setNewTripType(e.target.value)}
              placeholder="Add new trip type"
            />
            <Button variant="primary" onClick={!loading && handleAddTripType}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Add'}
            </Button>
          </InputGroup>
          <ListGroup>
            {filteredTripTypes &&
              filteredTripTypes.length > 0 &&
              filteredTripTypes.map((tripType, index) => (
                <ListGroup.Item key={index}>
                  {editingIndex === index ? (
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={editTripType}
                        onChange={(e) => setEditTripType(e.target.value)}
                      />
                      {loading ? (
                        <Button variant="success" disabled>
                          Saving...
                        </Button>
                      ) : (
                        <Button variant="success" onClick={() => handleSaveEdit(index)}>
                          Save
                        </Button>
                      )}
                    </InputGroup>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{tripType.name}</span>
                      <div>
                        <Button
                          variant="warning"
                          onClick={() => handleEditTripType(index)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteTripType(index)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            {filteredTripTypes && filteredTripTypes.length === 0 && !loading && (
              <ListGroup.Item>No trip types found</ListGroup.Item>
            )}
            {loading && <ListGroup.Item>Loading...</ListGroup.Item>}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default TripType
