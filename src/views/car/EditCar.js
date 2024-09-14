import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { MyAPI, MyError } from '../../MyAPI'
import { useParams, useNavigate } from 'react-router-dom'

function EditCar() {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const { carId } = useParams()

  const [loading, setLoading] = useState(false)

  const [carName, setCarName] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carCapacity, setCarCapacity] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [carImage, setCarImage] = useState(null)
  const [carImgUri, setCarImageUri] = useState('')
  const [showImageInput, setShowImageInput] = useState(false) // Toggle state for image input

  const fetchData = async () => {
    try {
      const res = await MyAPI.GET(`/admin/car/${carId}`, token)
      const { success, car, error, message } = res.data || res
      if (success) {
        setCarName(car.carName)
        setCarModel(car.carModel)
        setCarCapacity(car.carCapacity)
        setCarPrice(car.carPrice)
        setCarImageUri(car.carImages[0])
      } else {
        MyError.error(message || error)
      }
    } catch (error) {
      MyError.error('Failed to fetch car details')
    }
  }

  useEffect(() => {
    fetchData()
  }, [carId, token])

  const handleImageToggle = () => {
    setShowImageInput(!showImageInput)
  }

  const handleEditCar = async () => {
    if (!carName) {
      MyError.warn('Enter Car Name.')
      return
    }
    if (!carModel) {
      MyError.warn('Enter Car Model.')
      return
    }
    if (!carCapacity) {
      MyError.warn('Enter Car Capacity.')
      return
    }
    if (!carPrice) {
      MyError.warn('Enter Car Price.')
      return
    }
    if (!carImage && showImageInput) {
      MyError.warn('Please Select Car Image.')
      return
    }
    try {
      //new form data
      const formData = new FormData()
      formData.append('carName', carName)
      formData.append('carModel', carModel)
      formData.append('carCapacity', carCapacity)
      formData.append('carPrice', carPrice)
      if (carImage) {
        formData.append('carImages', carImage)
      }

      setLoading(true)

      let res = await MyAPI.PUT(`/admin/car/${carId}`, formData, token)
      setLoading(false)
      let { success, error, message } = res.data || res
      if (success) {
        fetchData()
        MyError.success(message)
      } else {
        MyError.error(message)
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  return (
    <>
      <center>
        <h3>Edit Car</h3>
      </center>
      <Row className="mb-3">
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              onChange={(e) => setCarName(e.target.value)}
              value={carName}
              className="input-border"
              type="text"
              placeholder="Enter Car Name"
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Car Model</Form.Label>
            <Form.Control
              onChange={(e) => setCarModel(e.target.value)}
              value={carModel}
              className="input-border"
              type="text"
              placeholder="Enter Car Model"
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Car Capacity</Form.Label>
            <Form.Control
              onChange={(e) => setCarCapacity(e.target.value)}
              value={carCapacity}
              className="input-border"
              type="text"
              placeholder="Enter Car Capacity"
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Car Price</Form.Label>
            <Form.Control
              onChange={(e) => setCarPrice(e.target.value)}
              value={carPrice}
              className="input-border"
              type="text"
              placeholder="Enter Car Price"
            />
          </Form.Group>
        </Col>
        {showImageInput ? (
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label>Car Image</Form.Label>
              <Form.Control
                onChange={(e) => setCarImage(e.target.files[0])}
                className="input-border"
                type="file"
                placeholder="Upload Car Image"
              />
            </Form.Group>
          </Col>
        ) : (
          <Col md={6} className="mt-2">
            <img src={carImgUri} alt="Car Image" style={{ maxWidth: '100px' }} />
          </Col>
        )}
        <Col md={12} className="mt-2">
          <Button variant="secondary" onClick={handleImageToggle} className="mr-2">
            {showImageInput ? 'Show Current Image' : 'Upload Image'}
          </Button>
          <Button onClick={!loading && handleEditCar} className="ms-3" variant="primary">
            {loading ? <Spinner size="sm" animation="border" role="status" /> : 'Edit Car'}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default EditCar
