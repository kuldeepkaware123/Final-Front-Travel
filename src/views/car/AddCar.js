/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function AddCar() {
  let token = useSelector((state) => state.token)

  const [loading, setLoading] = useState(false)

  const [carName, setCarName] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carCapacity, setCarCapacity] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [carImage, setCarImage] = useState(null)

  const handleCarAdd = async () => {
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
    if (!carImage) {
      MyError.warn('Please Select Car Image.')
      return
    }

    const formData = new FormData()
    formData.append('carName', carName)
    formData.append('carModel', carModel)
    formData.append('carCapacity', carCapacity)
    formData.append('carPrice', carPrice)
    formData.append('carImages', carImage)

    setLoading(true)
    let res = await MyAPI.FORM_DATA_POST('/admin/car', formData, token)
    let { data, success, message, error } = res.data || res
    setLoading(false)

    if (success) {
      MyError.success(message)
      setCarName('')
      setCarModel('')
      setCarPrice('')
      setCarCapacity('')
      setCarImage(null)
    } else {
      MyError.error(message || error)
    }
  }
  return (
    <>
      <center>
        {' '}
        <h3>Add Car</h3>{' '}
      </center>
      <Row>
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
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Price Title</Form.Label>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Enter Car Price Title"
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mt-2">
          <Form.Group>
            <Form.Label>Car Image</Form.Label>
            <Form.Control
              onChange={(e) => setCarImage(e.target.files[0])}
              className="input-border"
              type="file"
              placeholder="Enter Car Price Title"
            />
          </Form.Group>
        </Col>
        <Col md={12} className="mt-2">
          <Button onClick={!loading && handleCarAdd} variant="primary">
            {loading ? <Spinner size="sm" animation="border" role="status"></Spinner> : 'Add Car'}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddCar
