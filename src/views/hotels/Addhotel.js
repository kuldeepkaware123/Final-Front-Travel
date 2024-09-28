import React, { useEffect, useState } from 'react'
import { Button, Col, DropdownButton, Form, Row, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Editor from 'react-simple-wysiwyg'
import { IoAdd } from 'react-icons/io5'
import ImageUploader from '../Packages/ImageUploader'
import { MyAPI, MyError } from '../../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setHotelData } from '../../store'
import { IoMdClose } from 'react-icons/io'
const Addhotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)
  const storeUploadImages = useSelector((state) => state.uploadImages)
  const [currentStep, setcurrentStep] = useState('1')

  const [isEmbed, setIsEmbed] = useState(false)

  //check is embed
  useEffect(() => {
    const emn = location.pathname.includes('embed')
    setIsEmbed(emn)
  }, [])

  const [faqDetails, setFaqDetails] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('')
  const [termConditions, setTermConditions] = useState('')
  const [travelEsen, setTravelEsen] = useState('')

  const [AllTripType, setAllTripType] = useState([])
  const [AllTripTypeSelected, setAllTripTypeSelected] = useState([])
  const [AllDestinations, setAllDestinations] = useState([])
  const [AllDestinationsSelected, setAllDestinationsSelected] = useState([])
  const [AllHotelsSelected, setAllHotelsSelected] = useState([])
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

  const fetchTripType = async () => {
    try {
      let res = await MyAPI.GET('/tripType', token)
      let { success, message, error, tripType } = res.data || res
      if (success) {
        setAllTripType(tripType)
      } else {
        MyError.error(message || error || 'Server Error...')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchDestinations = async () => {
    try {
      let res = await MyAPI.GET('/destination', token)
      let { success, message, error, destination } = res.data || res
      if (success) {
        setAllDestinations(destination)
      } else {
        MyError.error(message || error || 'Server Error...')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const handleCheckboxChange = (item) => {
    if (AllTripTypeSelected.includes(item)) {
      setAllTripTypeSelected(AllTripTypeSelected.filter((tripType) => tripType !== item))
    } else {
      setAllTripTypeSelected([...AllTripTypeSelected, item])
    }
    console.log(AllTripTypeSelected)
  }
  const handleDestinationsChange = (item) => {
    if (AllDestinationsSelected.includes(item)) {
      setAllDestinationsSelected(AllDestinationsSelected.filter((tripType) => tripType !== item))
    } else {
      setAllDestinationsSelected([...AllDestinationsSelected, item])
    }
  }

  useEffect(() => {
    fetchTripType()
    fetchDestinations()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  const [dayActivities, setDayActivities] = useState([{ heading: '', description: '' }])

  //hotel logic
  const [numDays, setNumDays] = useState(1)
  const [numNights, setNumNights] = useState(1)

  useEffect(() => {
    if (numNights) {
      setNumDays(parseInt(numNights) + 1)
    }
  }, [numNights])

  useEffect(() => {
    if (numDays > numNights) {
      let act = []
      for (let i = 1; i <= numDays; i++) {
        act.push({ heading: '', description: '' })
      }
      setDayActivities(act)
    } else {
      let act = []
      for (let i = 1; i <= numNights; i++) {
        act.push({ heading: '', description: '' })
      }
      setDayActivities(act)
    }
  }, [numDays, numNights])

  // variables
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const Step1Validate = () => {
    if (!title) {
      MyError.warn('Please Enter Title')
      return
    }

    if (!AllDestinationsSelected || AllDestinationsSelected.length === 0) {
      MyError.warn('Please Select Destination')
      return
    }

    if (!AllTripTypeSelected || AllTripTypeSelected.length === 0) {
      MyError.warn('Please Select Trip Type')
      return
    }

    if (!description) {
      MyError.warn('Please Enter Description')
      return
    }

    if (!storeUploadImages || storeUploadImages.length === 0) {
      MyError.warn('Please Upload Images')
      return
    }

    dispatch(
      setHotelData({
        title,
        destination: AllDestinationsSelected,
        tripType: AllTripTypeSelected,
        description,
      }),
    )

    setcurrentStep('2')
  }

  const Step2Validate = () => {
    if (!dayActivities || dayActivities.length === 0) {
      return MyError.warn('Please Add Itinerary.')
    }

    if (!priceIncludes || priceIncludes.length === 0) {
      return MyError.warn('Please Add Price Includes.')
    }

    if (!priceExcludes || priceExcludes.length === 0) {
      return MyError.warn('Please Add Price Excludes.')
    }

    dispatch(
      setHotelData({
        days: numDays,
        nights: numNights,
        priceIncludes,
        priceExcludes,
      }),
    )

    setcurrentStep('3')
  }

  const Step3Validate = () => {
    dispatch(
      setHotelData({
        travelEsen,
        faqDetails,
        termConditions,
        paymentTerm,
      }),
    )
    addHotelToApi(travelEsen, faqDetails, termConditions, paymentTerm)
  }

  const hotelData = useSelector((state) => state.addHotel)

  const [showTravelEssentials, setShowTravelEssentials] = useState(true)
  const [showFAQs, setShowFAQs] = useState(true)
  const [showTermsConditions, setShowTermsConditions] = useState(true)
  const [showPaymentTerms, setShowPaymentTerms] = useState(true)

  const addHotelToApi = async (travelEsen, faqDetails, termConditions, paymentTerm) => {
    // Create new FormData instance
    const formData = new FormData()
    formData.append('title', hotelData.title)

    hotelData.destination.forEach((item, index) => {
      formData.append(`destination[${index}]`, item)
    })

    hotelData.tripType.forEach((item, index) => {
      formData.append(`tripType[${index}]`, item)
    })
    storeUploadImages.forEach((image, index) => {
      formData.append('galleryImages', image)
    })

    formData.append('description', hotelData.description)
    formData.append('days', hotelData.days)
    formData.append('nights', hotelData.nights)
    hotelData.priceIncludes.forEach((item, index) => {
      formData.append(`includes[${index}]`, item)
    })

    hotelData.priceExcludes.forEach((item, index) => {
      formData.append(`excludes[${index}]`, item)
    })

    if (showTravelEssentials) {
      formData.append('travelEssentials', travelEsen)
    } else {
      formData.append('travelEssentials', '<br>')
    }

    if (showFAQs) {
      formData.append('faqs', faqDetails)
    } else {
      formData.append('faqs', '<br>')
    }

    if (showPaymentTerms) {
      formData.append('paymentTerms', paymentTerm)
    } else {
      formData.append('paymentTerms', '<br>')
    }

    if (showTermsConditions) {
      formData.append('termsAndConditions', termConditions)
    } else {
      formData.append('termsAndConditions', '<br>')
    }

    // // Log FormData for debugging
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }
    setLoading(true)
    try {
      let res = await MyAPI.FORM_DATA_POST('/hotel', formData, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        if (isEmbed) {
          navigate(`/admin/inquiry/${id}`)
        } else {
          navigate('/admin/hotels/all')
        }
        MyError.success(message || 'Hotel added successfully')
      } else {
        MyError.error(message || error || 'Something wrong...')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const fetchFAQ = async () => {
    try {
      let res = await MyAPI.GET(`/faq`, token)
      let { message, success, error, faqs } = res.data || res
      // console.log(res.data)
      if (success) {
        if (faqs && faqs.length > 0) {
          setFaqDetails(faqs[0].html)
        }
      } else {
        MyError.warn(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchPaymentTerm = async () => {
    try {
      let res = await MyAPI.GET('/paymentTerm', token)
      let { success, message, error, paymentTerms } = res.data || res
      if (success) {
        if (paymentTerms && paymentTerms.length > 0) {
          setPaymentTerm(paymentTerms[0].html)
        }
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchTravelEssentials = async () => {
    try {
      let res = await MyAPI.GET('/travelEssentials', token)
      let { success, message, error, travelEssentials } = res.data || res
      // console.log(res.data)
      if (success) {
        if (travelEssentials && travelEssentials.length > 0) {
          setTravelEsen(travelEssentials[0].html)
        }
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  const fetchTearmAndCondition = async () => {
    try {
      let res = await MyAPI.GET('/t&c', token)
      let { success, message, error, termAndConditions } = res.data || res
      // console.log(res.data)
      if (success) {
        if (termAndConditions && termAndConditions.length > 0) {
          setTermConditions(termAndConditions[0].html)
        }
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchPaymentTerm()
    fetchTravelEssentials()
    fetchTearmAndCondition()
    fetchFAQ()
  }, [token])

  return (
    <>
      <center>
        <h4 className="poppins">Add Hotel</h4>
      </center>

      {currentStep === '1' && (
        <Row className="mt-3 mb-3">
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input-border small-font"
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mt-2">
            <Form.Group className="ps-2" controlId="formSelect">
              <Form.Label className="small-font">&nbsp;</Form.Label>
              <DropdownButton id="dropdown-checkbox" title="Select Trip Type" variant="secondary">
                {AllTripType &&
                  AllTripType.length > 0 &&
                  AllTripType.map((item, index) => (
                    <Form.Check
                      key={index}
                      checked={AllTripTypeSelected.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                      className="ms-2"
                      type="checkbox"
                      name="option1"
                      label={item.name}
                    />
                  ))}
                {AllTripType && AllTripType.length === 0 && 'Trip Type Not found'}
              </DropdownButton>
            </Form.Group>
          </Col>
          <Col md={3} className="mt-2">
            <Form.Group className="ps-2" controlId="formSelect">
              <Form.Label className="small-font">&nbsp;</Form.Label>
              <DropdownButton
                id="dropdown-checkbox"
                title="Select Destinations"
                variant="secondary"
              >
                {AllDestinations &&
                  AllDestinations.length > 0 &&
                  AllDestinations.map((item, index) => (
                    <Form.Check
                      key={index}
                      checked={AllDestinationsSelected.includes(item._id)}
                      onChange={() => handleDestinationsChange(item._id)}
                      className="ms-2"
                      type="checkbox"
                      name="option1"
                      label={item.name}
                    />
                  ))}
                {AllDestinations && AllDestinations.length === 0 && 'Destination Not found'}
              </DropdownButton>
            </Form.Group>
          </Col>
          <ImageUploader />
          <Col md={12} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Description</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="input-border small-font"
                as="textarea"
                rows={3}
                placeholder="Enter Description"
              />
            </Form.Group>
          </Col>
          <Col md={12} className="mt-2">
            <Button size="sm" onClick={Step1Validate} variant="primary">
              Next
            </Button>
          </Col>
        </Row>
      )}

      {currentStep === '2' && (
        <Row className="mt-3 mb-3">
          <hr className="mt-2 mb-2" />

          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Nights</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const value = e.target.value.trim()
                  setNumNights(value === '' ? '' : parseInt(value))
                }}
                value={numNights === '' ? '' : numNights}
                className="input-border"
                type="text"
                placeholder="Enter Nights"
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Days</Form.Label>
              <Form.Control
                onChange={(e) => setNumDays(e.target.value)}
                value={numDays}
                className="input-border"
                type="text"
                placeholder="Enter Days"
              />
            </Form.Group>
          </Col>

          <hr className="mt-2 mb-2" />

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
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handlepriceIncludesRemoveItem(index)}
                >
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
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handlePriceExcludesRemoveItem(index)}
                >
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

          <Col md={12} className="mt-2">
            <Button
              size="sm"
              className="me-2"
              onClick={() => setcurrentStep('1')}
              variant="primary"
            >
              Previous
            </Button>

            <Button size="sm" onClick={Step2Validate} variant="primary">
              Next
            </Button>
          </Col>
        </Row>
      )}

      {currentStep === '3' && (
        <>
          <Col className="mt-2 mb-2">
            <h6 className="poppins">
              <input
                type="checkbox"
                checked={showTravelEssentials}
                onChange={() => setShowTravelEssentials(!showTravelEssentials)}
              />{' '}
              &nbsp; Travel Essentials
            </h6>
          </Col>
          {showTravelEssentials && (
            <>
              <Col md={12}>
                <Editor
                  value={travelEsen}
                  onChange={(e) => setTravelEsen(e.target.value)}
                  containerProps={{
                    style: {
                      resize: 'vertical',
                      minHeight: '40vh',
                      marginInline: 'auto',
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Col>
            </>
          )}

          <Col className="mt-2 mb-2">
            <h6 className="poppins">
              {' '}
              <input
                type="checkbox"
                checked={showFAQs}
                onChange={() => setShowFAQs(!showFAQs)}
              />{' '}
              &nbsp;FAQs
            </h6>
          </Col>
          {showFAQs && (
            <>
              <Col md={12}>
                <Editor
                  value={faqDetails}
                  onChange={(e) => setFaqDetails(e.target.value)}
                  containerProps={{
                    style: {
                      resize: 'vertical',
                      minHeight: '40vh',
                      marginInline: 'auto',
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Col>
            </>
          )}

          <Col className="mt-2 mb-2">
            <h6 className="poppins">
              {' '}
              <input
                type="checkbox"
                checked={showTermsConditions}
                onChange={() => setShowTermsConditions(!showTermsConditions)}
              />{' '}
              &nbsp; Terms & Conditions
            </h6>
          </Col>
          {showTermsConditions && (
            <>
              <Col md={12}>
                <Editor
                  value={termConditions}
                  onChange={(e) => setTermConditions(e.target.value)}
                  containerProps={{
                    style: {
                      resize: 'vertical',
                      minHeight: '40vh',
                      marginInline: 'auto',
                      fontSize: '0.8rem',
                    },
                  }}
                />
              </Col>
            </>
          )}

          <Col className="mt-2 mb-2">
            <h6 className="poppins">
              <input
                type="checkbox"
                checked={showPaymentTerms}
                onChange={() => setShowPaymentTerms(!showPaymentTerms)}
              />{' '}
              &nbsp; Payment Terms
            </h6>
          </Col>
          {showPaymentTerms && (
            <>
              <Col md={12}>
                <Editor
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  containerProps={{
                    style: {
                      resize: 'vertical',
                      minHeight: '40vh',
                      marginInline: 'auto',
                    },
                  }}
                />
              </Col>
            </>
          )}

          <Col md={12} className="mt-2">
            <Button
              size="sm"
              className="me-2"
              onClick={() => setcurrentStep('2')}
              variant="primary"
            >
              Previous
            </Button>
            <Button onClick={!loading && Step3Validate} size="sm" variant="primary">
              {loading ? <Spinner animation="border" size="sm" /> : 'Publish Hotel'}
            </Button>
          </Col>
        </>
      )}
      <br />
      <br />
    </>
  )
}

export default Addhotel
