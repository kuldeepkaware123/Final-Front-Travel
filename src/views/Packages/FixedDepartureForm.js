/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { IoIosClose, IoMdClose } from 'react-icons/io'
import DatePicker, { Calendar } from 'react-multi-date-picker'
import { BsCalendar } from 'react-icons/bs'
import 'react-multi-date-picker/styles/colors/green.css'
import { IoAdd, IoClose } from 'react-icons/io5'
import { MyError } from '../../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setPackageData, setUpdatePackageData } from '../../store'

const FixedDepartureForm = ({ setcurrentStep }) => {
  const dispatch = useDispatch()

  const [fixedDeparture, setFixedDeparture] = useState('yes')
  const [groupSize, setGroupSize] = useState('')
  const [dates, setDates] = useState([])
  const [costOption, setCostOption] = useState('perPerson')
  const [datesCal, setDatesCal] = useState([])
  const [open, setOpen] = useState(false)
  const [partialPayment, setPartialPayment] = useState('')

  //double sharing price
  const [doubleFlightPrice, setDoubleFlightPrice] = useState('0')
  const [doubleLandPrice, setDoubleLandPrice] = useState('0')

  // Triple Sharing price
  const [tripleFlightPrice, setTripleFlightPrice] = useState('0')
  const [tripleLadPrice, setTripleLadPrice] = useState('0')

  // cost Option price
  const [costOptionFlightPrice, setCostOptionFlightPrice] = useState('0')
  const [costOptionLandPrice, setCostOptionLandPrice] = useState('0')

  const handleCalendarToggle = () => {
    setOpen(!open)
  }

  const [priceIncludes, setPriceIncludes] = useState([''])

  const handlepriceIncludesAddItem = () => {
    setPriceIncludes([...priceIncludes, ''])
  }

  const handlepriceIncludesChange = (index, event) => {
    const newPriceIncludes = [...priceIncludes]
    newPriceIncludes[index] = event.target.value
    setPriceIncludes(newPriceIncludes)
  }

  const handlepriceIncludesRemoveItem = (index) => {
    const newPriceIncludes = [...priceIncludes]
    newPriceIncludes.splice(index, 1)
    setPriceIncludes(newPriceIncludes)
  }

  const [priceExcludes, setPriceExcludes] = useState([''])

  const handlePriceExcludesAddItem = () => {
    setPriceExcludes([...priceExcludes, ''])
  }

  const handlePriceExcludesChange = (index, event) => {
    const newPriceExcludes = [...priceExcludes]
    newPriceExcludes[index] = event.target.value
    setPriceExcludes(newPriceExcludes)
  }

  const handlePriceExcludesRemoveItem = (index) => {
    const newPriceExcludes = [...priceExcludes]
    newPriceExcludes.splice(index, 1)
    setPriceExcludes(newPriceExcludes)
  }

  const [isEmbed, setIsEmbed] = useState(false)

  useEffect(() => {
    if (isEmbed) {
      setFixedDeparture('no')
    }
  }, [isEmbed])

  //check is embed
  useEffect(() => {
    const emn = location.hash.includes('embed')
    console.log('path name', emn, location.hash)
    setIsEmbed(emn)
  }, [])

  const [bookingDate, setBookingDate] = useState('')

  const Step3Validate = () => {
    if (fixedDeparture === 'no') {
      if (!costOptionLandPrice) {
        return MyError.warn('Please enter the cost of the land portion of the trip')
      }

      if (!costOptionFlightPrice && costOptionFlightPrice !== 0) {
        return MyError.warn('Please enter the cost of the flight portion of the trip')
      }
    } else {
      if (!groupSize) {
        return MyError.warn('Please enter the group size')
      }
      if (!doubleFlightPrice && !doubleLandPrice && !tripleFlightPrice && !tripleLadPrice) {
        return MyError.warn('Please enter the cost of the double or triple portion of the trip')
      }

      if (!datesCal || datesCal.length === 0) {
        return MyError.warn('Please enter the dates of the trip')
      }
    }

    if (!priceIncludes || priceIncludes.length === 0) {
      return MyError.warn(
        'Please enter at least one item that is included in the price of the package',
      )
    }

    if (!priceExcludes || priceExcludes.length === 0) {
      return MyError.warn(
        'Please enter at least one item that is excluded from the price of the package',
      )
    }

    if (!partialPayment) {
      return MyError.warn('Please Enter Partial Payment.')
    }

    if (isEmbed && !bookingDate) {
      return MyError.warn('Please select Trip Start Date.')
    }

    let data = {
      fixedDeparture,
      costOption,
      costOptionLandPrice,
      costOptionFlightPrice,
      groupSize,
      doubleFlightPrice,
      doubleLandPrice,
      tripleFlightPrice,
      tripleLadPrice,
      packageDates: datesCal,
      priceIncludes,
      priceExcludes,
      partialPayment,
    }

    if (bookingDate) {
      data.bookingDate = bookingDate
    }

    dispatch(setPackageData(data))

    setcurrentStep('4')
  }

  const storeUpdatePackageData = useSelector((state) => state.updatePackage)

  useEffect(() => {
    if (storeUpdatePackageData) {
      setFixedDeparture(storeUpdatePackageData.fixedDeparture || 0)
      setCostOption(storeUpdatePackageData.costOption || 0)
      setCostOptionFlightPrice(storeUpdatePackageData.costOptionFlightPrice || 0)
      setCostOptionLandPrice(storeUpdatePackageData.costOptionLandPrice || '0')
      setPriceExcludes(storeUpdatePackageData.priceExcludes ?? [])
      setPriceIncludes(storeUpdatePackageData.priceIncludes ?? [])
      setDatesCal(storeUpdatePackageData.packageDates ?? [])
      setPartialPayment(storeUpdatePackageData.partialPayment || 0)
    }

    if (storeUpdatePackageData) {
      setGroupSize(storeUpdatePackageData.groupSize)
      setDoubleFlightPrice(storeUpdatePackageData.doubleFlightPrice)
      setDoubleLandPrice(storeUpdatePackageData.doubleLandPrice)
      setTripleFlightPrice(storeUpdatePackageData.tripleFlightPrice)
      setTripleLadPrice(storeUpdatePackageData.tripleLadPrice)
      setPartialPayment(storeUpdatePackageData.partialPayment)
    }

    if (storeUpdatePackageData) {
      setBookingDate(
        storeUpdatePackageData.bookingDate
          ? new Date(storeUpdatePackageData.bookingDate).toISOString().split('T')[0]
          : '2024-08-23',
      )
    } else {
      alert('Booking Date Else')
    }
  }, [storeUpdatePackageData])

  return (
    <>
      <Container fluid className="m-0 p-0">
        {!isEmbed && (
          <>
            <h5 className="poppins">Fixed Departure</h5>
            <Form.Group>
              <Form.Label className="small-font">Fixed Departure</Form.Label>
              <div className="d-flex gap-2">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="fixedDeparture"
                  value="yes"
                  checked={fixedDeparture === 'yes'}
                  onChange={() => setFixedDeparture('yes')}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="fixedDeparture"
                  value="no"
                  checked={fixedDeparture === 'no'}
                  onChange={() => setFixedDeparture('no')}
                />
              </div>
            </Form.Group>
          </>
        )}

        {fixedDeparture === 'yes' && (
          <>
            <Form.Group>
              <Form.Label className="small-font">Group Size</Form.Label>
              <Form.Control
                type="number"
                className="input-border small-font"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                placeholder="Enter group size"
              />
            </Form.Group>
            <Col className="mt-2 mb-2">Double Sharing</Col>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Flight price </Form.Label>
                  <Form.Control
                    type="text"
                    value={doubleFlightPrice}
                    onChange={(e) => setDoubleFlightPrice(e.target.value)}
                    className="input-border small-font"
                    placeholder="Enter Flight price"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Land package price </Form.Label>
                  <Form.Control
                    type="text"
                    className="input-border small-font"
                    placeholder="Enter Land package price"
                    value={doubleLandPrice}
                    onChange={(e) => setDoubleLandPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Total price </Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    className="border-0 fw-bold"
                    placeholder="Enter Total Price"
                    value={
                      !isNaN(parseInt(doubleFlightPrice)) && !isNaN(parseInt(doubleLandPrice))
                        ? parseInt(doubleFlightPrice) + parseInt(doubleLandPrice)
                        : '00'
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Col className="mt-2 mb-2">Triple Sharing</Col>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Flight price </Form.Label>
                  <Form.Control
                    type="text"
                    className="input-border small-font"
                    placeholder="Enter Flight price"
                    value={tripleFlightPrice}
                    onChange={(e) => setTripleFlightPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Land package price </Form.Label>
                  <Form.Control
                    type="text"
                    className="input-border small-font"
                    placeholder="Enter Land package price"
                    value={tripleLadPrice}
                    onChange={(e) => setTripleLadPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Total price </Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    className="border-0 fw-bold"
                    placeholder="Enter Total Price"
                    value={
                      !isNaN(parseInt(tripleFlightPrice)) && !isNaN(parseInt(tripleLadPrice))
                        ? parseInt(tripleFlightPrice) + parseInt(tripleLadPrice)
                        : '00'
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Col className="mt-2 mb-2 d-flex align-items-center justify-content-between">
              <h5>Dates</h5>
              <div className="position-relative">
                <Button variant={open ? 'danger' : 'primary'} onClick={handleCalendarToggle}>
                  {open ? <IoClose size={24} /> : <BsCalendar size={18} />}
                </Button>
                {open && (
                  <div style={{ position: 'absolute', zIndex: 1000, right: 0, bottom: '100%' }}>
                    <Calendar
                      multiple
                      value={datesCal}
                      onChange={setDatesCal}
                      format="YYYY-MM-DD"
                      className="black input-border mt-2"
                      onClose={() => setOpen(false)}
                    />
                  </div>
                )}
              </div>
            </Col>

            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {datesCal.map((date, index) => (
                <p className="px-2 py-1 border rounded-2 input-border" key={index}>
                  {!storeUpdatePackageData && date.format('YYYY-MM-DD')}
                  {storeUpdatePackageData && date.toString()}
                </p>
              ))}
            </div>
          </>
        )}

        {fixedDeparture === 'no' && (
          <>
            <Form.Group>
              <Form.Label className="small-font">Cost Option</Form.Label>
              <Form.Check
                type="radio"
                label="Cost per Person"
                name="costOption"
                value="perPerson"
                checked={costOption === 'perPerson'}
                onChange={() => setCostOption('perPerson')}
              />
              <Form.Check
                type="radio"
                label="Total Cost"
                name="costOption"
                value="total"
                checked={costOption === 'total'}
                onChange={() => setCostOption('total')}
              />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Flight price </Form.Label>
                  <Form.Control
                    type="text"
                    className="input-border small-font"
                    placeholder="Enter Flight price"
                    value={costOptionFlightPrice}
                    onChange={(e) => setCostOptionFlightPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Land package price </Form.Label>
                  <Form.Control
                    type="text"
                    className="input-border small-font"
                    placeholder="Enter Land package price"
                    value={costOptionLandPrice}
                    onChange={(e) => setCostOptionLandPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small-font"> Total price </Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    className="border-0 fw-bold"
                    placeholder="Enter Total Price"
                    value={
                      !isNaN(parseFloat(costOptionFlightPrice)) &&
                      !isNaN(parseFloat(costOptionLandPrice))
                        ? parseFloat(costOptionFlightPrice) + parseFloat(costOptionLandPrice)
                        : '00'
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <hr className="mt-2 mb-2" />

      <Form.Group>
        <Form.Label className="small-font">Partial Payment</Form.Label>
        <Form.Control
          type="number"
          className="input-border small-font"
          value={partialPayment}
          onChange={(e) => setPartialPayment(e.target.value)}
          placeholder="Enter partial payment without % symbol"
        />
      </Form.Group>

      <hr className="mt-2 mb-2" />

      {isEmbed && (
        <>
          <Form.Group>
            <Form.Label className="small-font">Trip Start Date</Form.Label>
            <Form.Control
              type="date"
              className="input-border small-font"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              placeholder="Enter partial payment without % symbol"
            />
          </Form.Group>

          <hr className="mt-2 mb-2" />
        </>
      )}

      <Col md={12} className="mt-2">
        {' '}
        <h6 className="poppins">Price Includes</h6>{' '}
      </Col>

      {priceIncludes.map((priceInclude, index) => (
        <Row className="mt-2">
          <Col md={11}>
            <Form.Group key={index}>
              <Form.Control
                type="text"
                className="input-border small-font"
                placeholder="Enter Price Includes"
                value={priceInclude}
                onChange={(e) => handlepriceIncludesChange(index, e)}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button size="sm" variant="danger" onClick={() => handlepriceIncludesRemoveItem(index)}>
              <IoMdClose size={22} />
            </Button>
          </Col>
        </Row>
      ))}

      <Col className="mt-2">
        <Button
          size="sm"
          className="text-center"
          variant="primary"
          onClick={handlepriceIncludesAddItem}
        >
          <IoAdd size={22} /> Add
        </Button>
      </Col>
      <hr className="mt-2 mb-2" />
      <Col md={12} className="mt-2">
        <h6 className="poppins">Price Excludes</h6>{' '}
      </Col>
      {priceExcludes.map((priceExcludes, index) => (
        <Row className="mt-2">
          <Col md={11}>
            <Form.Group key={index}>
              <Form.Control
                type="text"
                className="input-border small-font"
                placeholder="Enter Price Excludes"
                value={priceExcludes}
                onChange={(e) => handlePriceExcludesChange(index, e)}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button size="sm" variant="danger" onClick={() => handlePriceExcludesRemoveItem(index)}>
              <IoMdClose size={22} />
            </Button>
          </Col>
        </Row>
      ))}

      <Col className="mt-2">
        <Button
          size="sm"
          className="text-center"
          variant="primary"
          onClick={handlePriceExcludesAddItem}
        >
          <IoAdd size={22} /> Add
        </Button>
      </Col>

      <hr className="mt-2 mb-2" />

      <Col md={12} className="mt-2">
        <Button size="sm" className="me-2" onClick={() => setcurrentStep('2')} variant="primary">
          Previous
        </Button>
        <Button size="sm" onClick={Step3Validate} variant="primary">
          Next
        </Button>
      </Col>
    </>
  )
}

export default FixedDepartureForm
