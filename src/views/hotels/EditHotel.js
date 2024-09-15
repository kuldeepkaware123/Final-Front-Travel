import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const EditHotel = () => {
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()
    const { id } = useParams()
  
    const [hotelTitle, setHotelTitle] = useState('')
    const [hotelSubTitle, setHotelSubTitle] = useState('')
    const [hotelContent, setHotelContent] = useState('')
    const [hotelDescription, setHotelDescription] = useState('')
    const [hotelImage, setHotelImage] = useState(null)
    const [hotelImageBackground, setHotelImageBackground] = useState(null)
    const [hotelImageOther, setHotelImageOther] = useState(null)
  
    const [hotelData, setHotelData] = useState(null)
    const [ishotelImageUpdate, setIshotelImageUpdate] = useState(false)
    const [ishotelImageBackgroundUpdate, setIshotelImageBackgroundUpdate] = useState(false)
    const [ishotelImageOtherUpdate, setIshotelImageOtherUpdate] = useState(false)
    const [loading, setLoading] = useState(false) // Loading state
  
    const fetchHotelData = async (id) => {
      setLoading(true)
      try {
        let res = await MyAPI.GET(`/hotel/${id}`, token)
        let { message, error, success, data } = res.data || res
        if (success) {
          setHotelData(data)
          setHotelTitle(data.title)
          setHotelSubTitle(data.subTitle)
          setHotelContent(data.html)
          setHotelDescription(data.description)
        } else {
          MyError.error(message || error || 'Server Error Please try again later')
        }
      } catch (error) {
        MyError.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchHotelData(id)
    }, [id])
  
    const handleUpdateBHotel = async () => {
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
      if (ishotelImageOtherUpdate && (!hotelImageOther || hotelImageOther.length === 0)) {
        return MyError.warn('Hotel Image Other is required')
      }
  
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('title', hotelTitle)
        formData.append('subTitle', hotelSubTitle)
        formData.append('html', hotelContent)
        formData.append('description', hotelDescription)
        if (ishotelImageBackgroundUpdate) {
          formData.append('backgroundImage', hotelImageBackground)
        }
        if (ishotelImageOtherUpdate && hotelImageOther && hotelImageOther.length > 0) {
          hotelImageOther.forEach((item) => {
            formData.append('otherImages', item)
          })
        }
  
        let res = await MyAPI.PUT(`/hotel/${id}`, formData, token)
        let { success, message, error } = res.data || res
        if (success) {
          fetchHotelData(id)
          MyError.success(message)
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }
      } catch (error) {
        MyError.error(error.message)
      } finally {
        setLoading(false)
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
        <h3>Edit Hotel</h3>
      </center>
      <Row>
        {loading && (
          <Col md={12} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        )}
        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Hotel Title</Form.Label>
            <Form.Control
              value={hotelTitle}
              onChange={(e) => setHotelTitle(e.target.value)}
              type="text"
              className="input-border"
              placeholder="Enter Hotel Title"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Hotel Sub Title</Form.Label>
            <Form.Control
              value={hotelSubTitle}
              className="input-border"
              onChange={(e) => setHotelSubTitle(e.target.value)}
              type="text"
              placeholder="Enter Hotel Sub Title"
            />
          </Form.Group>
        </Col>

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Cover Image</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Update Image"
              checked={ishotelImageUpdate}
              onChange={() => setIshotelImageUpdate(!ishotelImageUpdate)}
            />
            {ishotelImageUpdate && (
              <Form.Control onChange={(e) => setHotelImage(e.target.files[0])} type="file" />
            )}
            {!ishotelImageUpdate && hotelData && hotelData.coverImage && (
              <Zoom>
                <img
                  src={hotelData.coverImage}
                  alt="Cover"
                  style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                />
              </Zoom>
            )}
          </Form.Group>
        </Col>

        <Col md={6} className="mt-3">
          <Form.Group>
            <Form.Label>Other Image</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Update Image"
              checked={ishotelImageOtherUpdate}
              onChange={() => setIshotelImageOtherUpdate(!ishotelImageOtherUpdate)}
            />
            {ishotelImageOtherUpdate && (
              <Form.Control
                multiple
                onChange={(e) => setHotelImageOther([...e.target.files])}
                type="file"
              />
            )}
            <div className="d-flex align-items-center justify-content-center gap-1">
              {!ishotelImageOtherUpdate &&
                hotelData &&
                hotelData.otherImages.length > 0 &&
                hotelData.otherImages.map((item, index) => (
                  <Zoom key={index}>
                    <img
                      src={item ?? ''}
                      alt="Other"
                      style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                    />
                  </Zoom>
                ))}
            </div>
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

        <Col md={12} className="mt-3">
          <ReactQuill
            value={hotelContent}
            onChange={(content) => setHotelContent(content)}
            modules={modules}
            formats={formats}
          />
        </Col>

        <Col md={12} className="mt-3 mb-3">
          <Button onClick={handleUpdateBHotel} variant="primary" size="sm" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Updating...</span>
              </>
            ) : (
              'Update Hotel'
            )}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default EditHotel