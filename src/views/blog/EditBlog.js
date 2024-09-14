import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function EditBlog() {
  const token = useSelector((state) => state.token)
  const navigate = useNavigate()
  const { id } = useParams()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogSubTitle, setBlogSubTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState(null)
  const [blogImageBackground, setBlogImageBackground] = useState(null)
  const [blogImageOther, setBlogImageOther] = useState(null)

  const [blogData, setBlogData] = useState(null)
  const [isBlogImageUpdate, setIsBlogImageUpdate] = useState(false)
  const [isBlogImageBackgroundUpdate, setIsBlogImageBackgroundUpdate] = useState(false)
  const [isBlogImageOtherUpdate, setIsBlogImageOtherUpdate] = useState(false)
  const [loading, setLoading] = useState(false) // Loading state

  const fetchBlogData = async (id) => {
    setLoading(true)
    try {
      let res = await MyAPI.GET(`/blog/${id}`, token)
      let { message, error, success, data } = res.data || res
      if (success) {
        setBlogData(data)
        setBlogTitle(data.title)
        setBlogSubTitle(data.subTitle)
        setBlogContent(data.html)
        setBlogDescription(data.description)
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
    fetchBlogData(id)
  }, [id])

  const handleUpdateBlog = async () => {
    if (!blogTitle) {
      return MyError.warn('Blog Title is required')
    }
    if (!blogSubTitle) {
      return MyError.warn('Blog Sub Title is required')
    }
    if (!blogContent) {
      return MyError.warn('Blog Content is required')
    }
    if (!blogDescription) {
      return MyError.warn('Blog Description is required')
    }
    if (isBlogImageOtherUpdate && (!blogImageOther || blogImageOther.length === 0)) {
      return MyError.warn('Blog Image Other is required')
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', blogTitle)
      formData.append('subTitle', blogSubTitle)
      formData.append('html', blogContent)
      formData.append('description', blogDescription)
      if (isBlogImageBackgroundUpdate) {
        formData.append('backgroundImage', blogImageBackground)
      }
      if (isBlogImageOtherUpdate && blogImageOther && blogImageOther.length > 0) {
        blogImageOther.forEach((item) => {
          formData.append('otherImages', item)
        })
      }

      let res = await MyAPI.PUT(`/blog/${id}`, formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchBlogData(id)
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
        <h3>Edit Blog</h3>
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
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              className="input-border"
              placeholder="Enter Blog Title"
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Form.Group>
            <Form.Label>Blog Sub Title</Form.Label>
            <Form.Control
              value={blogSubTitle}
              className="input-border"
              onChange={(e) => setBlogSubTitle(e.target.value)}
              type="text"
              placeholder="Enter Blog Sub Title"
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
              checked={isBlogImageUpdate}
              onChange={() => setIsBlogImageUpdate(!isBlogImageUpdate)}
            />
            {isBlogImageUpdate && (
              <Form.Control onChange={(e) => setBlogImage(e.target.files[0])} type="file" />
            )}
            {!isBlogImageUpdate && blogData && blogData.coverImage && (
              <Zoom>
                <img
                  src={blogData.coverImage}
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
              checked={isBlogImageOtherUpdate}
              onChange={() => setIsBlogImageOtherUpdate(!isBlogImageOtherUpdate)}
            />
            {isBlogImageOtherUpdate && (
              <Form.Control
                multiple
                onChange={(e) => setBlogImageOther([...e.target.files])}
                type="file"
              />
            )}
            <div className="d-flex align-items-center justify-content-center gap-1">
              {!isBlogImageOtherUpdate &&
                blogData &&
                blogData.otherImages.length > 0 &&
                blogData.otherImages.map((item, index) => (
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
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Enter Description..."
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <ReactQuill
            value={blogContent}
            onChange={(content) => setBlogContent(content)}
            modules={modules}
            formats={formats}
          />
        </Col>

        <Col md={12} className="mt-3 mb-3">
          <Button onClick={handleUpdateBlog} variant="primary" size="sm" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Updating...</span>
              </>
            ) : (
              'Update Blog'
            )}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default EditBlog
