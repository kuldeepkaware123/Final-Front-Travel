import React, { useState } from 'react'
import { Button, Col, Form, Row, Spinner, Alert } from 'react-bootstrap'
import { MyAPI,MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPlace = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState([{ heading: '', description: '' }])
  const [aboutThePlace, setAboutThePlace] = useState('')
  const [whyVisit, setWhyVisit] = useState('')
  const [howToReach, setHowToReach] = useState('')
  const [ytLink, setYtLink] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()
  const token = useSelector((state) => state.token)

  // Handle content field changes
  const handleContentChange = (index, field, value) => {
    const newContent = [...content]
    newContent[index][field] = value
    setContent(newContent)
  }

  // Add a new content field (heading and description)
  const addContent = () => {
    setContent([...content, { heading: '', description: '' }])
  }

  // Remove a content field
  const removeContent = (index) => {
    const newContent = content.filter((_, i) => i !== index)
    setContent(newContent)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (
      !title ||
      !description ||
      content.length === 0 ||
      !aboutThePlace ||
      !whyVisit ||
      !howToReach ||
      !ytLink ||
      galleryImages.length === 0
    ) {
      setError('Please fill in all the required fields and upload at least one image.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('aboutThePlace', aboutThePlace)
    formData.append('whyVisit', whyVisit)
    formData.append('howToReach', howToReach)
    formData.append('ytLink', ytLink)
    galleryImages.forEach((image) => formData.append('galleryImages', image))

    // Send the content array directly, no need to stringify it
    content.forEach((item, index) => {
      formData.append(`content[${index}][heading]`, item.heading)
      formData.append(`content[${index}][description]`, item.description)
    })

    try {
      const response = await MyAPI.FORM_DATA_POST('/admin/place', formData, token)
      let { success, message, error } = response.data || response
      if (success) {
        navigate('/admin/place/all')
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }

      setLoading(false)
      setSuccess('Place created successfully!')
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || 'An error occurred while creating the place.')
    }
  }

  const handleImageChange = (e) => {
    setGalleryImages([...e.target.files])
  }

  return (
    <div className="add-place-form">
      <h4 className="text-center ">Add Place</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ytLink">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="url"
                value={ytLink}
                onChange={(e) => setYtLink(e.target.value)}
                placeholder="Enter YouTube link"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group controlId="aboutThePlace" className="mt-3">
          <Form.Label>About The Place</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={aboutThePlace}
            onChange={(e) => setAboutThePlace(e.target.value)}
            placeholder="Enter details about the place"
            required
          />
        </Form.Group>

        <Form.Group controlId="whyVisit" className="mt-3">
          <Form.Label>Why Visit</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={whyVisit}
            onChange={(e) => setWhyVisit(e.target.value)}
            placeholder="Why should people visit?"
            required
          />
        </Form.Group>

        <Form.Group controlId="howToReach" className="mt-3">
          <Form.Label>How to Reach</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={howToReach}
            onChange={(e) => setHowToReach(e.target.value)}
            placeholder="How to reach the place"
            required
          />
        </Form.Group>

        <Form.Group controlId="content" className="mt-3">
          <Form.Label>Content (Heading and Description)</Form.Label>
          {content.map((point, index) => (
            <div key={index} className="mb-3">
              <Row>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    value={point.heading}
                    onChange={(e) => handleContentChange(index, 'heading', e.target.value)}
                    placeholder={`Heading ${index + 1}`}
                    required
                  />
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    value={point.description}
                    onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                    placeholder={`Description ${index + 1}`}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    onClick={() => removeContent(index)}
                    disabled={content.length === 1}
                  >
                    -
                  </Button>
                  {index === content.length - 1 && (
                    <Button variant="success" className="ms-2" onClick={addContent}>
                      +
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="galleryImages" className="mt-3">
          <Form.Label>Gallery Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Add Place'}
        </Button>
      </Form>
    </div>
  )
}

export default AddPlace
