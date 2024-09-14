import React, { useEffect, useState } from 'react'
import { Container, Alert, Table, Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { MyAPI, MyError, truncateText } from '../../MyAPI'
import { FaDownload, FaEye } from 'react-icons/fa'
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
      let res = await MyAPI.GET(`/admin/enquiry/${id}`, token)
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
    // Parse the date string
    const date = new Date(dateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return formatDateToDDMMYYYY(dateString)
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

    return `${String(day).padStart(2, '0')} ${monthNames[month]} ${year}`
  }

  function formatDateToDDMMYYYY(dateString) {
    // Create a new Date object from the input date string
    const date = new Date(dateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    // Get day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0') // Ensure two digits for day
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Ensure two digits for month (months are 0-indexed)
    const year = date.getUTCFullYear() // Get full year

    // Return the formatted date as "dd mm yyyy"
    return `${day}/${month}/${year}`
  }

  return (
    <Container>
      <Col className="d-flex align-items-center justify-content-between">
        <h4 className="poppins">Package Manager</h4>
        <div className="d-flex align-items-center justify-content-end gap-2">
          <Button
            onClick={() => navigate(`/admin/enquiry/edit/${id}`)}
            variant="secondary"
            className="mb-3"
          >
            <CiEdit size={22} />
          </Button>
          <Button
            disabled={!loading && packageData && packageData.length === 3}
            variant="primary"
            onClick={() => navigate(`/admin/package/embed/${id}`)}
            className="mb-3"
          >
            Add Package
          </Button>
        </div>
      </Col>

      {/* Client details */}
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header className="bg-dark text-white">Client Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Title className="text-dark">
                    <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
                  </Card.Title>
                  <Card.Text className="text-dark">
                    <strong>User ID:</strong> {userData?._id}
                    <br />
                    <strong>Email:</strong> {userData?.email}
                    <br />
                    {/* <strong>Registered Date:</strong> {clientDetails.registeredDate} */}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>DOB:</strong> {formatDate(userData?.dateOfBirth)}
                    <br />
                    <strong>Gender:</strong> {userData?.gender}
                    <br />
                    <strong>Phone:</strong> {userData?.phone}
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
            <Card.Header className="bg-dark text-white">Enquiry Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>Destination:</strong> {enquiryData?.destination}
                    <br />
                    <strong>Start Date:</strong>
                    {formatDateA(enquiryData?.StartDate)}
                    <br />
                    <strong>No. of Days:</strong> {enquiryData?.noOfDays}
                    <br />
                    <strong>No. of Adults:</strong> {enquiryData?.noOfAdults}
                    <br />
                    <strong>No. of Children Above 6:</strong> {enquiryData?.noOfChildrenAbove6}
                    <br />
                    <strong>No. of Children Below 6:</strong> {enquiryData?.noOfChildrenBelow6}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text className="text-dark">
                    <strong>Travel by Flight or Train:</strong>{' '}
                    {enquiryData?.travelByFlightOrTrain ? 'Yes' : 'No'}
                    <br />
                    <strong>Accommodation Type:</strong> {enquiryData?.accomodationType}
                    <br />
                    <strong>Additional Info:</strong> {enquiryData?.additionalInfo}
                    <br />
                    <strong>Created At:</strong> {formatDate(enquiryData?.createdAt)}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {!loading && packageData && packageData.length >= maxPackages && (
        <Alert className="py-1 px-3" variant="warning">
          Each Enquiry can create a maximum of 3 packages.
        </Alert>
      )}

      <Table striped bordered hover responsive className="mb-3">
        <thead>
          <tr>
            <th className="text-white" style={{ background: '#212631' }}>
              S.No
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Title
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Destination
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Trip Type
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Price
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Date
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
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
                <td className="d-flex gap-2 text-dark text-truncate">
                  <Button
                    onClick={() => navigate(`/admin/packages/edit/embed/${item._id}/${id}`)}
                    variant="primary"
                  >
                    <CiEdit size={22} />
                  </Button>
                  <Button variant="secondary">
                    <FaDownload
                      // onClick={() => navigate(`/package/private/${item._id}`)}
                      size={18}
                    />
                  </Button>
                  <Button variant="warning">
                    <FaEye
                      onClick={() => navigate(`/package/private/${id}/${item._id}`)}
                      size={22}
                    />
                  </Button>
                  <Button onClick={() => deletePackage(item._id)} variant="danger">
                    <MdDelete size={22} />
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
