import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Pagination, Row, Spinner, Table } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyAPI, MyError } from '../../MyAPI'

function AllCar() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const token = useSelector((state) => state.token)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (token) {
      try {
        setLoading(true)
        let res = await MyAPI.GET('/admin/car', token)
        let { success, message, error, cars } = res.data || res
        setLoading(false)
        if (success) {
          setCars(cars)
          filterCars(cars, searchQuery)
        } else {
          MyError.error(message || error)
        }
      } catch (error) {
        setLoading(false)
        MyError.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [token])

  useEffect(() => {
    filterCars(cars, searchQuery)
  }, [searchQuery, cars])

  const filterCars = (cars, query) => {
    const filtered = cars.filter(
      (item) =>
        item.carName.toLowerCase().includes(query.toLowerCase()) ||
        item.carModel.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredCars(filtered)
  }

  const handleDelete = async (id) => {
    try {
      let res = await MyAPI.DELETE(`/admin/car/${id}`, token)
      let { success, error, message } = res.data || res
      if (success) {
        fetchData()
        MyError.success(message)
      } else {
        MyError.error(message || error)
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      let formData = new FormData()
      formData.append('status', status)
      let res = await MyAPI.PUT(`/admin/car/${id}`, formData, token)
      let { success, error, message } = res.data || res
      if (success) {
        fetchData()
      } else {
        MyError.error(message || error)
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Control
              className="input-border"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered responsive hover className="text-dark">
        <thead>
          <tr>
            <th className="text-white" style={{ background: '#212631' }}>
              S.No
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Car Name
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Car Model
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Car Capacity
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Car Price
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Status
            </th>
            <th className="text-white" style={{ background: '#212631' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedCars && paginatedCars.length > 0
            ? paginatedCars.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-dark">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="text-dark">{item.carName}</td>
                  <td className="text-dark">{item.carModel}</td>
                  <td className="text-dark">{item.carCapacity}</td>
                  <td className="text-dark">{item.carPrice}</td>
                  <td className="text-dark">
                    <Form.Check
                      type="switch"
                      onChange={() =>
                        updateStatus(item._id, item.status === 'inactive' ? 'active' : 'inactive')
                      }
                      checked={item.status !== 'inactive'}
                      id="custom-switch"
                    />
                  </td>
                  <td className="d-flex gap-2 text-dark">
                    <Button
                      onClick={() => navigate(`/admin/car/${item._id}/edit`)}
                      variant="warning"
                      className="mr-2"
                    >
                      <CiEdit size={22} />
                    </Button>
                    <Button onClick={() => handleDelete(item._id)} variant="danger">
                      <MdDelete size={22} />
                    </Button>
                  </td>
                </tr>
              ))
            : !loading && (
                <tr>
                  <td colSpan={7} className="text-center text-dark">
                    No Data Found
                  </td>
                </tr>
              )}
          {loading && (
            <tr>
              <td colSpan={7} className="text-center text-dark">
                <Spinner animation="border" size="sm" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!loading && paginatedCars && paginatedCars.length > 0 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(filteredCars.length / itemsPerPage)).keys()].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredCars.length / itemsPerPage)}
            />
          </Pagination>
        </div>
      )}
    </>
  )
}

export default AllCar
