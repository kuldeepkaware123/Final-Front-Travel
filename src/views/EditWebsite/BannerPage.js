import React, { useState, useEffect } from 'react'
import { Button, Form, ListGroup, Container, Row, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function BannerPage() {
  const token = useSelector((state) => state.token)
  const [banners, setBanners] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState('')

  const fetchBanner = async () => {
    try {
      let res = await MyAPI.GET('/admin/banner', token)
      let { success, message, error, banner } = res.data || res
      if (success) {
        setBanners(banner)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  const addBanner = async () => {
    setLoading(true)
    try {
      if (!selectedImage) {
        MyError.warn('Please Select Image.')
        setLoading(false)
        return
      }

      let formData = new FormData()
      formData.append('bannerImage', selectedImage)
      formData.append('externalLink', externalLink)

      let res = await MyAPI.FORM_DATA_POST('/admin/banner', formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchBanner()
        setSelectedImage(null)
        setImagePreview('')
        setExternalLink('')
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBanner = async (id) => {
    setDeleteLoading(id)
    try {
      let res = await MyAPI.DELETE(`/admin/banner/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        fetchBanner()
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setDeleteLoading('')
    }
  }

  const handleUpdateBanner = async (id, status) => {
    setLoading(true)
    try {
      let res = await MyAPI.PUT(`/admin/banner/${id}`, { isActive: status }, token)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
        fetchBanner()
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="p-3">
      <Row>
        <Col md={12}>
          <Row>
            <Col md={5}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="External Link"
                  className="input-border"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Control
                  type="file"
                  id="bannerImage"
                  label="Choose Image"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0])
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }}
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <Image src={imagePreview} alt="Preview" thumbnail />
                  </div>
                )}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button variant="primary" onClick={addBanner} disabled={loading}>
                {loading ? 'Adding...' : 'Add Banner'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h4>All Banners</h4>
          {banners.length === 0 && <p>No banners found.</p>}
          <ListGroup>
            {banners &&
              banners.length > 0 &&
              banners.map((banner) => (
                <ListGroup.Item key={banner._id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <Image src={banner.bannerImage} alt="Banner" thumbnail />
                    </Col>
                    <Col md={3}>&nbsp;</Col>
                    <Col md={1}>
                      <Form.Check
                        type="switch"
                        id={`custom-switch-${banner._id}`}
                        checked={banner.isActive}
                        onChange={() => handleUpdateBanner(banner._id, !banner.isActive)}
                        disabled={loading}
                      />
                    </Col>
                    <Col md={2} className="text-right">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteBanner(banner._id)}
                        disabled={deleteLoading === banner._id}
                      >
                        {deleteLoading === banner._id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </Col>
                  </Row>
                  <Col className="py-1">
                    Link : {banner.externalLink ?? 'External Link Not Found.'}
                  </Col>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default BannerPage
