import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Image, Card, Spinner } from 'react-bootstrap'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const token = useSelector((state) => state.token)
  const [profilePic, setProfilePic] = useState(null)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: '',
    phone: '',
  })

  console.log(token);
  

  const fetchProfile = async (token) => {
    try {
      let res = await MyAPI.GET('/user/profile', token)
      let { success, message, error, user } = res.data || res

      console.log(res);
      
      if (success) {
        setProfile(user)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfile(token)
    }
  }, [token])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0])
    setProfile({ ...profile, profilePicture: URL.createObjectURL(e.target.files[0]) })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    // Save profile logic here
    let payload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
    }

    //new form data
    let formData = new FormData()
    if (profilePic) {
      formData.append('profileImage', profilePic)
      // payload.profilePicture = profilePic
    }
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key])
    })

    try {
      let res = await MyAPI.PUT('/user/profile', formData, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchProfile(token)
        setIsEditing(false)
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12} className="mx-auto">
          <Card className="p-4 mt-3 mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Profile</h3>
                <Button size="sm" onClick={toggleEdit}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="text-center mb-3">
                <Image
                  style={{ width: '100px', height: '100px', objectPosition: 'top' }}
                  src={profile.profileImage || 'https://via.placeholder.com/150'}
                  roundedCircle
                  fluid
                />
                {isEditing && (
                  <Form.Group className="mt-3">
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>
                )}
              </div>

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={profile?.dateOfBirth?.substring(0, 10)}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" name="phone" value={profile.phone} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                {isEditing && (
                  <div className="text-center">
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EditProfile
