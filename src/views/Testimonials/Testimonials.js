import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Table,
  FormControl,
  Pagination,
  Modal,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

const Testimonials = () => {
  const token = useSelector((state) => state.token)
  const [testimonials, setTestimonials] = useState([])
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [position, setPosition] = useState('')
  const [description, setText] = useState('')
  const [isFeatured, setActive] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [loadingId, setLoadingId] = useState(null) // Added loading state for actions
  const itemsPerPage = 10

  const fetchTestimonials = async () => {
    try {
      let res = await MyAPI.GET('/admin/testimonial', token)
      let { success, message, error, data } = res.data || res
      if (success) {
        setTestimonials(data)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const changeStatus = async (id) => {
    setLoadingId(id) // Set loading state
    try {
      let res = await MyAPI.PUT(`/admin/testimonial/featured/${id}`, {}, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchTestimonials()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoadingId(null) // Reset loading state
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async () => {
    if (isEditing) {
      if (!name || !position || !description) {
        return MyError.warn('All fields are required')
      }

      let data = new FormData()
      data.append('name', name)
      if (image) {
        data.append('image', image)
      }
      data.append('position', position)
      data.append('description', description)

      try {
        let res = await MyAPI.PUT(`/admin/testimonial/${editingId}`, data, token)
        let { success, message, error } = res.data || res
        if (success) {
          MyError.success(message)
          fetchTestimonials()
          setEditingId('')
          setName('')
          setImage(null)
          setPosition('')
          setText('')
          setActive(true)
          setIsEditing(false)
          setShowModal(false)
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }
      } catch (error) {
        MyError.error(error.message)
      }
    } else {
      if (!name || !image || !position || !description) {
        return MyError.warn('All fields are required')
      }

      let data = new FormData()
      data.append('name', name)
      data.append('image', image)
      data.append('position', position)
      data.append('description', description)

      try {
        let res = await MyAPI.FORM_DATA_POST('/admin/testimonial', data, token)
        let { success, message, error } = res.data || res
        if (success) {
          MyError.success(message)
          fetchTestimonials()
          setName('')
          setImage(null)
          setPosition('')
          setText('')
          setActive(true)
          setIsEditing(false)
          setShowModal(false)
        } else {
          MyError.error(message || error || 'Server Error Please try again later.')
        }
      } catch (error) {
        MyError.error(error.message)
      }
    }
  }

  const handleEdit = (id) => {
    const testimonial = testimonials.find((t) => t._id === id)
    setEditingId(id)
    setName(testimonial.name)
    setImage(null)
    setPosition(testimonial.position)
    setText(testimonial.description)
    setActive(testimonial.isFeatured)
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    setLoadingId(id) // Set loading state
    try {
      let res = await MyAPI.DELETE(`/admin/testimonial/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchTestimonials()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please Try again later')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoadingId(null) // Reset loading state
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = testimonial.name.toLowerCase().includes(search.toLowerCase())
    const matchesActiveFilter =
      activeFilter === 'all' ? true : testimonial.isFeatured === (activeFilter === 'isFeatured')
    return matchesSearch && matchesActiveFilter
  })

  const indexOfLastTestimonial = currentPage * itemsPerPage
  const indexOfFirstTestimonial = indexOfLastTestimonial - itemsPerPage
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial,
  )

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setName('')
    setImage(null)
    setPosition('')
    setText('')
    setActive(true)
    setIsEditing(false)
    setShowModal(false)
  }

  return (
    <div className="container mt-5">
      <Row className="mb-3">
        <Col md={3}>
          <Button variant="primary" onClick={handleShowModal}>
            <IoIosAdd size={22} />
          </Button>
        </Col>
        <Col md={3}>&nbsp;</Col>
        <Col md={3}>&nbsp;</Col>
        <Col md={3}>
          <FormControl
            className="input-border"
            placeholder="Search by name, position, or description"
            value={search}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      {currentTestimonials.length === 0 ? (
        <div>No data found</div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th className="text-dark">Name</th>
              <th className="text-dark">Image</th>
              <th className="text-dark">Position</th>
              <th className="text-dark">Text</th>
              <th className="text-dark">Active</th>
              <th className="text-dark">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTestimonials.map(({ _id, name, image, position, description, isFeatured }) => (
              <tr key={_id}>
                <td className="text-dark">{name}</td>
                <td>
                  <img src={image} alt={name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td className="text-dark">{position}</td>
                <td className="text-dark">{description}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id={`isFeatured-switch-${_id}`}
                    checked={isFeatured}
                    onClick={() => changeStatus(_id)}
                    disabled={loadingId === _id} // Disable switch while loading
                  />
                  {loadingId === _id && <Spinner animation="border" size="sm" />}
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(_id)}
                    disabled={loadingId === _id}
                  >
                    {loadingId === _id ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <CiEdit size={18} />
                    )}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(_id)}
                    className="ml-2 ms-2"
                    disabled={loadingId === _id}
                  >
                    {loadingId === _id ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <MdDelete size={18} />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Pagination className="mb-4 mt-2">
        {Array.from(
          { length: Math.ceil(filteredTestimonials.length / itemsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ),
        )}
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit' : 'Add'} Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="mt-2" md={4}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="mt-2" md={4}>
              <Form.Group controlId="formPosition">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="mt-2" md={4}>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} required />
              </Form.Group>
            </Col>
            <Col className="mt-2" md={12}>
              <Form.Group controlId="formActive">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={isFeatured}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </Form.Group>
            </Col>
            <Form.Group controlId="formText">
              <Form.Label>Enter Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Comment..."
                value={description}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </Form.Group>
            <Col className="mt-2" md={12}>
              <Button onClick={handleSubmit} variant="primary" type="submit" disabled={loadingId}>
                {isEditing ? 'Update' : 'Add'} Testimonial
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Testimonials
