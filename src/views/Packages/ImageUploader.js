import React, { useState, useRef, useEffect } from 'react'
import { Form, Col, Row, Button, Card } from 'react-bootstrap'
import { BsXCircle } from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadImages } from '../../store'

const ImageUploader = () => {
  const dispatch = useDispatch()
  const storeImages = useSelector((state) => state.uploadImages)
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    dispatch(setUploadImages(images))
  }, [images])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([...images, ...files])
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setImages([...images, ...files])
  }

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const handleClickUpload = () => {
    fileInputRef.current.click()
  }

  return (
    <Form className="container mt-3">
      <Col className="m-0 p-0" md={12}>
        Gallery Images
      </Col>
      <div
        onClick={handleClickUpload}
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        className="d-flex align-items-center justify-content-center"
        style={{
          border: '2px dashed #506D77',
          padding: '20px',
          marginTop: '20px',
          borderRadius: '5px',
          minHeight: '30vh',
          textAlign: 'center',
          cursor: 'pointer', // make cursor pointer on hover
        }}
      >
        <span>Click here or Drag & Drop Images</span>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>

      <Row className="mt-3">
        {storeImages &&
          storeImages.map((image, index) => (
            <Col key={index} sm={4} md={3} className="mb-3 position-relative">
              <Card>
                <Card.Img
                  variant="top"
                  src={URL.createObjectURL(image)}
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                />
                <Button
                  size="sm"
                  variant="danger"
                  className="position-absolute"
                  style={{ top: '5px', right: '5px' }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <BsXCircle size={24} />
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </Form>
  )
}

export default ImageUploader
