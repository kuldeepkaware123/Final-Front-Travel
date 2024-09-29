import React, { useEffect, useState } from 'react'
import { Button, Col, Container, DropdownButton, Form, Image, Row, Spinner } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Editor from 'react-simple-wysiwyg'
import { IoAdd } from 'react-icons/io5'
import ImageUploader from '../Packages/ImageUploader'
import { MyAPI, MyError } from '../../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setHotelData, setUpdateHotelData } from '../../store'

const EditHotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const [serverHotel, setServerHotel] = useState(null)

  const fetchHotelById = async (id) => {
    try {
      setLoading(true)
      let res = await MyAPI.GET(`/hotel/${id}`, token)

      let { success, message, error, data } = res.data || res
      setLoading(false)
      setServerHotel(data)
      if (success) {
      } else {
        MyError.error(message || error || 'Api Error.')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    fetchHotelById(id)
  }, [id])

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

  useEffect(() => {
    if (serverHotel) {
      let data = {
        title: serverHotel.title,
        days: serverHotel.days,
        nights: serverHotel.nights,
        pricePerPerson: serverHotel.pricePerPerson,
        description: serverHotel.description,
        destination: serverHotel.destination,
        images: serverHotel.galleryImages,
        status: serverHotel.status,
        paymentTerm: serverHotel.paymentTerms,
        faqDetails: serverHotel.faqs,
        travelEsen: serverHotel.travelEssentials,
        termConditions: serverHotel.termsAndConditions,
        priceIncludes: serverHotel.includes,
        priceExcludes: serverHotel.excludes,
        tripType: serverHotel.tripType,
      }

      dispatch(setUpdateHotelData(data))
    }
  }, [serverHotel])

  const token = useSelector((state) => state.token)
  const storeUploadImages = useSelector((state) => state.uploadImages)
  const [currentStep, setcurrentStep] = useState('1')

  const [faqDetails, setFaqDetails] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('')
  const [termConditions, setTermConditions] = useState('')
  const [travelEsen, setTravelEsen] = useState('')
  const [pricePerPerson, setPricePerPerson] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  //hotel logic
  const [numDays, setNumDays] = useState(1)
  const [numNights, setNumNights] = useState(1)

  // variables
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  //image uploader
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn)
  }

  const [AllTripType, setAllTripType] = useState([])
  const [AllTripTypeSelected, setAllTripTypeSelected] = useState([])
  const [AllDestinations, setAllDestinations] = useState([])
  const [AllDestinationsSelected, setAllDestinationsSelected] = useState([])

  const fetchTripType = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/tripType', token)
      let { success, message, error, tripType } = res.data || res
      setLoading(false)
      if (success) {
        setAllTripType(tripType)
      } else {
        MyError.error(message || error || 'Server Error...')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const fetchDestinations = async () => {
    try {
      setLoading(true)
      let res = await MyAPI.GET('/destination', token)
      let { success, message, error, destination } = res.data || res

      setLoading(false)
      if (success) {
        setAllDestinations(destination)
      } else {
        MyError.error(message || error || 'Server Error...')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  const handleCheckboxChange = (item) => {
    if (AllTripTypeSelected.includes(item)) {
      setAllTripTypeSelected(
        AllTripTypeSelected.filter((tripType) => tripType !== item || item._id),
      )
    } else {
      setAllTripTypeSelected([...AllTripTypeSelected, item || item._id])
    }
  }
  console.log(AllTripTypeSelected)
  const handleDestinationsChange = (item) => {
    if (AllDestinationsSelected.includes(item)) {
      setAllDestinationsSelected(
        AllDestinationsSelected.filter((tripType) => tripType !== item || item._id),
      )
    } else {
      setAllDestinationsSelected([...AllDestinationsSelected, item || item._id])
    }
    console.log(AllDestinationsSelected)
  }

  useEffect(() => {
    fetchTripType()
    fetchDestinations()
  }, [])

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

    if (isSwitchOn && (!storeUploadImages || storeUploadImages.length === 0)) {
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
    dispatch(
      setHotelData({
        days: numDays,
        nights: numNights,
        priceIncludes,
        priceExcludes,
        pricePerPerson,
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
  const storeUpdatePackageData = useSelector((state) => state.updateHotel)

  useEffect(() => {
    if (storeUpdatePackageData) {
      setTitle(storeUpdatePackageData?.title)
      setDescription(storeUpdatePackageData?.description)
      // setDestination(storeUpdatePackageData.destination)
      setNumDays(storeUpdatePackageData.days)
      setNumNights(storeUpdatePackageData.nights)
      setPricePerPerson(storeUpdatePackageData.pricePerPerson)

      var all_destination = []
      storeUpdatePackageData?.destination?.forEach((item) => {
        all_destination.push(item._id)
      })
      setAllDestinationsSelected(all_destination)

      var all_trip_type = []
      storeUpdatePackageData?.tripType?.forEach((item) => {
        all_trip_type.push(item._id)
      })
      setAllTripTypeSelected(all_trip_type)

      setPriceIncludes(storeUpdatePackageData.priceIncludes)
      setPriceExcludes(storeUpdatePackageData.priceExcludes)

      setTravelEsen(storeUpdatePackageData.travelEsen)
      setFaqDetails(storeUpdatePackageData.faqDetails)
      setTermConditions(storeUpdatePackageData.termConditions)
      setPaymentTerm(storeUpdatePackageData.paymentTerm)
    }

    // console.log('storeUpdatePackageData', storeUpdatePackageData)
  }, [storeUpdatePackageData])

  const [showTravelEssentials, setShowTravelEssentials] = useState(true)
  const [showFAQs, setShowFAQs] = useState(true)
  const [showTermsConditions, setShowTermsConditions] = useState(true)
  const [showPaymentTerms, setShowPaymentTerms] = useState(true)

  const addHotelToApi = async (travelEsen, faqDetails, termConditions, paymentTerm) => {
    const formData = new FormData()
    formData.append('title', hotelData.title)
    formData.append('description', hotelData.description)
    formData.append('days', hotelData.days)
    formData.append('nights', hotelData.nights)
    formData.append('pricePerPerson', hotelData.pricePerPerson)

    AllDestinationsSelected.forEach((item, index) => {
      formData.append(`destination[${index}]`, item)
    })

    AllTripTypeSelected.forEach((item, index) => {
      formData.append(`tripType[${index}]`, item)
    })

    if (storeUploadImages && storeUploadImages.length > 0) {
      storeUploadImages.forEach((image, index) => {
        formData.append('galleryImages', image)
      })
    }

    priceIncludes.forEach((item, index) => {
      formData.append(`includes[${index}]`, item)
    })

    priceExcludes.forEach((item, index) => {
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

    try {
      setLoading(true)
      let res = await MyAPI.PUT(`/hotel/${id}`, formData, token)
      let { success, message, error } = res.data || res

      console.log(res)

      setLoading(false)
      if (success) {
        navigate('/admin/hotels/all')

        MyError.success(message || 'Package Updated successfully')
      } else {
        MyError.error(message || error || 'Something wrong...')
      }
    } catch (error) {
      setLoading(false)
      MyError.error(error.message)
    }
  }

  return (
    <>
      <center>
        {' '}
        <h4 className="poppins">Edit Hotel</h4>{' '}
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
          <Col className="mt-2">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Show Image Uploader"
              checked={isSwitchOn}
              onChange={handleSwitchChange}
            />
          </Col>
          {isSwitchOn ? (
            <ImageUploader />
          ) : (
            <div className="small-images d-flex align-items-center justify-content-start gap-2">
              {storeUpdatePackageData &&
                storeUpdatePackageData.images &&
                storeUpdatePackageData.images.length > 0 &&
                storeUpdatePackageData.images.map((item, index) => (
                  <img
                    src={item}
                    width="230px"
                    className="border border-2 rounded-2"
                    alt="img"
                    key={index}
                  />
                ))}
            </div>
          )}
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
                  setNumNights(value === '' ? '' : value)
                }}
                value={numNights === '' ? '' : numNights}
                className="input-border"
                type="number"
                placeholder="Enter Nights"
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Days</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const value = e.target.value.trim()
                  setNumDays(value === '' ? '' : value)
                }}
                value={numDays === '' ? '' : numDays}
                className="input-border"
                type="number"
                placeholder="Enter Days"
              />
            </Form.Group>
          </Col>

          <Col md={12} className="mt-2">
            <Form.Group>
              <Form.Label className="small-font">Enter Price (per person)</Form.Label>
              <Form.Control
                onChange={(e) => setPricePerPerson(e.target.value)}
                value={pricePerPerson}
                className="input-border"
                type="number"
                placeholder="Enter Price (per person)"
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
              {loading ? <Spinner animation="border" size="sm" /> : 'Update Hotel'}
            </Button>
          </Col>
        </>
      )}
      <br />
      <br />
    </>
  )
}

export default EditHotel
