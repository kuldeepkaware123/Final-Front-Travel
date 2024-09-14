import React, { useEffect, useState } from 'react'
import {
  Container,
  Alert,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Spinner,
  Modal,
} from 'react-bootstrap'
import { AiOutlineMessage } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { FaEye } from 'react-icons/fa'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

const PackageManager = () => {
  const { id } = useParams()

  const maxPackages = 3
  const navigate = useNavigate()
  const [receivedMessages, setReceivedMessages] = useState([
    {
      packageId: 2,
      message: 'Please change the destination to Tokyo.',
      dateTime: '2024-07-18 10:30 AM',
    },
  ])
  const [packages, setPackages] = useState([
    { id: 1, destination: 'Paris', createdAt: '2024-07-15' },
    { id: 2, destination: 'London', createdAt: '2024-07-16' },
  ])

  const handleAddPackage = () => {
    if (packages.length < maxPackages) {
      const newId = packages.length ? Math.max(...packages.map((pkg) => pkg.id)) + 1 : 1
      setPackages([
        ...packages,
        {
          destination: 'New Destination',
          id: newId,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ])
    }
  }

  const handleDelete = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id))
  }

  const handleEdit = (id) => {
    console.log(`Edit package with id: ${id}`)
  }

  const [userData, setUserData] = useState(null)
  const [enquiryData, setEnquiryData] = useState(null)
  const [packageData, setPackageData] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  const fetchEnquiryData = async (token, id) => {
    try {
      setLoading(true)
      let res = await MyAPI.GET(`/user/enquiry/${id}`, token)
      let { success, message, error, data } = res.data || res
      if (success) {
        let { user, Packages } = res.data.data
        setEnquiryData(data)
        setUserData(user)
        setPackageData(Packages)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deletePackage = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/package/${id}`, token)
      let { success, message, error } = res.data || res
      if (success) {
        fetchEnquiryData(token, id)
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
      console.log(res)
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (token && id) {
      fetchEnquiryData(token, id)
    }
  }, [token, id])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  function formatDateA(dateString) {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    const day = date.getUTCDate() // Get the day of the month
    const month = date.getUTCMonth() // Get the month (0-11)
    const year = date.getUTCFullYear() // Get the full year

    // Array of month names
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return `${day} ${monthNames[month]} ${year}`
  }

  const [showModal, setShowModal] = useState(false) // State for modal visibility
  const [message, setMessage] = useState('') // State for message input
  const [editId, setEditId] = useState('')

  const handleOpenModal = (id) => {
    setEditId(id)
    setShowModal(true)
  }

  // Handle closing the modal
  const handleCloseModal = () => {
    setMessage('')
    setShowModal(false)
  }

  // Handle form submission inside the modal
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        let res = await MyAPI.POST(
          '/user/notes',
          {
            packageId: editId,
            userNote: message,
          },
          token,
        )
        let { success, message: myMesg, error } = res.data || res
        console.log(res.data)
        if (success) {
          fetchEnquiryData(token, id)
          setEditId('')
          setMessage('')
          handleCloseModal()
          MyError.success('Message Sent Successfully.')
        } else {
          MyError.error(myMesg || error || 'Server Error pleas try again later.')
        }
      } catch (error) {
        MyError.error(error.message)
      }
    } else {
      MyError.warn('Please Enter Message.')
    }
  }

  return (
    <Container>
      <Col className="d-flex align-items-center justify-content-between">
        <h4 className="poppins">Enquiry Manager</h4>
      </Col>

      {/* Client details */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header style={{ background: '#244855' }} className="text-white">
              Client Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Title className="text-dark">
                    <strong>Name:</strong> {userData?.firstName} {userData?.lastName}{' '}
                    {loading && 'Loading...'}
                  </Card.Title>
                  <Card.Text className="text-dark">
                    {/* <strong>User ID:</strong> {userData?._id} {loading && 'Loading...'}
                    <br /> */}
                    <strong>Email:</strong> {userData?.email} {loading && 'Loading...'}
                    <br />
                    <strong>DOB:</strong> {formatDate(userData?.dateOfBirth)}{' '}
                    {loading && 'Loading...'}
                    <br />
                    {/* <strong>Registered Date:</strong> {clientDetails.registeredDate} */}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>Gender:</strong> {userData?.gender} {loading && 'Loading...'}
                    <br />
                    <strong>Phone:</strong> {userData?.phone} {loading && 'Loading...'}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Enquiry details */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header style={{ background: '#244855' }} className=" text-white">
              Enquiry Details
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>Destination:</strong> {enquiryData?.destination}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>Start Date:</strong> {formatDateA(enquiryData?.StartDate)}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>No. of Days:</strong> {enquiryData?.noOfDays} {loading && 'Loading...'}
                    <br />
                    <strong>No. of Adults:</strong> {enquiryData?.noOfAdults}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>No. of Children Above 6:</strong> {enquiryData?.noOfChildrenAbove6}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>No. of Children Below 6:</strong> {enquiryData?.noOfChildrenBelow6}{' '}
                    {loading && 'Loading...'}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>Travel by Flight or Train:</strong>{' '}
                    {enquiryData?.travelByFlightOrTrain ? 'Yes' : 'No'}
                    <br />
                    <strong>Accommodation Type:</strong> {enquiryData?.accomodationType}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>Additional Info:</strong> {enquiryData?.additionalInfo}{' '}
                    {loading && 'Loading...'}
                    <br />
                    <strong>Created At:</strong> {formatDate(enquiryData?.createdAt)}{' '}
                    {loading && 'Loading...'}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {!loading && packageData && packageData.length >= maxPackages && (
        <Alert className="py-1 px-3" variant="warning">
          Each inquiry can create a maximum of 3 packages.
        </Alert>
      )}

      <Table striped bordered hover responsive className="mb-3">
        <thead>
          <tr>
            <th className="text-white" style={{ background: '#244855' }}>
              S.No
            </th>
            <th className="text-white" style={{ background: '#244855' }}>
              Title
            </th>
            <th className="text-white" style={{ background: '#244855' }}>
              Destination
            </th>
            <th className="text-white" style={{ background: '#244855' }}>
              Trip Type
            </th>
            <th className="text-white" style={{ background: '#244855' }}>
              Price
            </th>
            <th className="text-white" style={{ background: '#244855' }}>
              Date
            </th>
            <th colSpan={2} className="text-white" style={{ background: '#244855' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {packageData &&
            packageData.length > 0 &&
            packageData.reverse().map((item, index) => (
              <tr key={index}>
                <td className="text-dark text-truncate">{index + 1}</td>
                <td className="text-dark text-truncate">{truncateText(item.title, 5)}</td>
                <td className="text-dark text-truncate">
                  {item.destination.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {i < item.destination.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </td>
                <td className="text-dark text-truncate">
                  {item.tripType.map((t, i) => (
                    <span key={i}>
                      {t.name}
                      {i < item.tripType.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </td>
                <td className="text-dark text-truncate">{item.costOptions.totalPrice}</td>
                <td className="text-dark text-truncate">
                  {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                </td>
                <td className="d-flex gap-1 text-dark text-truncate">
                  <Button variant="primary">
                    <AiOutlineMessage onClick={() => handleOpenModal(item._id)} size={22} />
                  </Button>
                </td>
                <td>
                  <Button variant="secondary">
                    <FaEye
                      onClick={() => navigate(`/package/private/${id}/${item._id}`)}
                      size={22}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          {loading && (
            <tr>
              <td colSpan={10} className="text-center">
                <Spinner size="sm" animation="border" role="status" />
              </td>
            </tr>
          )}
          {!loading && packageData && packageData.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center">
                <p className="text-muted">No packages found.</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for sending modification message */}
      <Modal className={showModal ? '' : 'd-none'} show={showModal} onHide={handleCloseModal}>
        <Modal.Header className="text-white" style={{ background: '#244855' }}>
          <Modal.Title>Send Modification Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-4">
        <Col md={12}>
          <h5 className="poppins">Modification Messages</h5>
          {packageData && packageData.length > 0 ? (
            packageData.map(
              (msg, index) =>
                msg.userNotes &&
                msg.userNotes.map((item) => (
                  <Card key={index} className="mb-3">
                    <Card.Header className="d-flex justify-content-between">
                      <div className="text-dark">Package Title: {truncateText(msg.title)}</div>
                      <div className="text-dark">{formatDateA(item.date)}</div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="text-dark">{item.message}</Card.Text>
                    </Card.Body>
                  </Card>
                )),
            )
          ) : (
            <Card className="mb-3">
              <Card.Body>
                <Card.Text className="text-dark">No messages</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PackageManager
