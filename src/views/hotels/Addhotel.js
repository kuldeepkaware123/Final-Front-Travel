import React, { useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Addhotel = () => {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()

  const [hotelTitle, setHotelTitle] = useState('')
  const [hotelSubTitle, setHotelSubTitle] = useState('')
  const [hotelContent, setHotelContent] = useState('')
  const [hotelDescription, setHotelDescription] = useState('')
  const [hotelImage, setHotelImage] = useState(null)
  const [hotelImageBackground, setHotelImageBackground] = useState(null)
  const [hotelImageOther, setHotelImageOther] = useState(null)
  const [loading, setLoading] = useState(false) // Added loading state

  const handleAddBlod = async () => {
    if (!hotelTitle) {
      return MyError.warn('Hotel Title is required')
    }
    if (!hotelSubTitle) {
      return MyError.warn('Hotel Sub Title is required')
    }
    if (!hotelContent) {
      return MyError.warn('Hotel Content is required')
    }
    if (!hotelDescription) {
      return MyError.warn('Hotel Description is required')
    }
    if (!hotelImageOther || hotelImageOther.length === 0) {
      return MyError.warn('Hotel Image Other is required')
    }

    setLoading(true) // Start loading
    try {
      const formData = new FormData()
      formData.append('title', hotelTitle)
      formData.append('subTitle', hotelSubTitle)
      formData.append('html', hotelContent)
      formData.append('description', hotelDescription)
      formData.append('coverImage', hotelImage)

      if (hotelImageOther && hotelImageOther.length > 0) {
        hotelImageOther.forEach((item) => {
          formData.append('otherImages', item)
        })
      }

      let res = await MyAPI.FORM_DATA_POST('/hotel', formData, token)

      let { success, message, error } = res.data || res
      if (success) {
        navigate('/admin/hotels/all')
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false) // End loading
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
  return (
    <>
      <center>
        <h3>Add Hotel</h3>
      </center>
      <Row>
        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Hotel Title</Form.Label>
            <Form.Control
              value={hotelTitle}
              onChange={(e) => setHotelTitle(e.target.value)}
              type="text"
              placeholder="Enter Hotel Title"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Hotel Sub Title</Form.Label>
            <Form.Control
              value={hotelSubTitle}
              onChange={(e) => setHotelSubTitle(e.target.value)}
              type="text"
              placeholder="Enter Hotel Sub Title"
            />
          </Form.Group>
        </Col>

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Cover Image</Form.Label>
            <Form.Control onChange={(e) => setHotelImage(e.target.files[0])} type="file" />
          </Form.Group>
        </Col>

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Other Image</Form.Label>
            <Form.Control
              multiple
              onChange={(e) => setHotelImageOther([...e.target.files])}
              type="file"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Enter Description..."
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-4">
          <ReactQuill
            value={hotelContent}
            onChange={setHotelContent}
            modules={modules}
            formats={formats}
            style={{ marginInline: 'auto', borderColor: 'transparent' }} // Adjusted minHeight here
          />
        </Col>
        <Col md={12} className="mt-3 mb-3">
          <Button onClick={!loading && handleAddBlod} variant="primary" size="sm">
            {loading ? <Spinner animation="border" size="sm" /> : 'Add Hotel'}
          </Button>
        </Col>
      </Row>
      {/* )} */}
    </>
  )
}

export default Addhotel