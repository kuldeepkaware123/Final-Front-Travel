/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, DropdownButton, Form, Image, Row, Spinner } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FixedDepartureForm from './FixedDepartureForm'
import Editor from 'react-simple-wysiwyg'
import { IoAdd } from 'react-icons/io5'
import { IoCloseOutline } from 'react-icons/io5'
import SelectMultipleOptions from './SelectMultipleOptions'
import ImageUploader from './ImageUploader'
import { MyAPI, MyError } from '../../MyAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setPackageData, setUpdatePackageData } from '../../store'

function EditPackages() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, enqId } = useParams()
  const [loading, setLoading] = useState(false)
  const [isEmbed, setIsEmbed] = useState(false)

  // check path include embed
  useEffect(() => {
    let e = location.pathname.includes('embed')
    setIsEmbed(e)
  }, [])

  const [serverPackage, setServerPackage] = useState(null)

  useEffect(() => {
    fetPackageById(id)
  }, [id])

  const fetPackageById = async (id) => {
    try {
      setLoading(true)
      let res = await MyAPI.GET(`/admin/package/${id}`, token)
      let { success, message, error, packageExist } = res.data || res
      setLoading(false)
      setServerPackage(packageExist)
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
    if (serverPackage) {
      let hotels = []
      let itineraries = []

      serverPackage.hotels.forEach((item, index) => {
        hotels.push({
          name: item.name,
          id: item._id,
          city: item.city,
          star: item.rating,
          description: item.description,
          nights: item.nights.split(','),
        })
      })

      serverPackage.itineraries.forEach((item, index) => {
        itineraries.push({
          id: item._id,
          heading: item.heading,
          description: item.activity,
        })
      })

      let costOptions = {}

      if (serverPackage.costOptions) {
        costOptions = {
          ...costOptions,
          costOption: serverPackage.costOptions.type === 'cost per person' ? 'perPerson' : 'total',
          costOptionLandPrice: serverPackage.costOptions.landPackagePrice,
          costOptionFlightPrice: serverPackage.costOptions.flightPrice,
        }
      }

      if (serverPackage.fixedDeparture) {
        costOptions = {
          ...costOptions,
          groupSize: serverPackage.fixedDeparture.groupSize ?? null,
          doubleFlightPrice: serverPackage.fixedDeparture.doubleSharing?.flightPrice ?? null,
          doubleLandPrice: serverPackage.fixedDeparture.doubleSharing?.landPackagePrice ?? null,
          tripleFlightPrice: serverPackage.fixedDeparture.tripleSharing?.flightPrice ?? null,
          tripleLadPrice: serverPackage.fixedDeparture.tripleSharing?.landPackagePrice ?? null,
          packageDates:
            serverPackage.fixedDeparture.dates?.map((date) => {
              const d = new Date(date)
              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            }) ?? [],
          fixedDeparture: serverPackage.fixedDeparture.type ? 'yes' : 'no',
        }
      }

      let data = {
        title: serverPackage.title,
        cabDescription: serverPackage.cabs,
        days: serverPackage.days,
        nights: serverPackage.nights,
        description: serverPackage.description,
        destination: serverPackage.destination,
        images: serverPackage.galleryImages,
        hotels,
        status: serverPackage.status,
        paymentTerm: serverPackage.paymentTerms,
        faqDetails: serverPackage.faqs,
        travelEsen: serverPackage.travelEssentials,
        termConditions: serverPackage.termsAndConditions,
        flightDescription: serverPackage.flightTrain,
        priceIncludes: serverPackage.includes,
        priceExcludes: serverPackage.excludes,
        dayActivities: itineraries,
        partialPayment: serverPackage.partialPayment,
        tripType: serverPackage.tripType,
        ...costOptions,
      }

      if (isEmbed && serverPackage.bookingDate) {
        data.bookingDate = serverPackage.bookingDate
      }

      dispatch(setUpdatePackageData(data))
    }
  }, [serverPackage])

  const token = useSelector((state) => state.token)
  const storeUploadImages = useSelector((state) => state.uploadImages)
  const [currentStep, setcurrentStep] = useState('1')

  const [faqDetails, setFaqDetails] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('')
  const [termConditions, setTermConditions] = useState('')
  const [travelEsen, setTravelEsen] = useState('')

  const [isFlightOpen, setIsFlightOpen] = useState(false)
  const [isCabsOpen, setIsCabsOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  const [dayActivities, setDayActivities] = useState([{ heading: '', description: '' }])

  const handleAddDayActivity = () => {
    setDayActivities([...dayActivities, { heading: '', description: '' }])
  }

  const handleDayActivityChange = (index, field, value) => {
    const newDayActivities = [...dayActivities]
    newDayActivities[index] = {
      ...newDayActivities[index],
      [field]: value,
    }
    setDayActivities(newDayActivities)
  }

  const handleRemoveDayActivity = (index) => {
    const newDayActivities = [...dayActivities]
    newDayActivities.splice(index, 1)
    setDayActivities(newDayActivities)
  }

  //hotel logic
  const [numDays, setNumDays] = useState(1)
  const [numNights, setNumNights] = useState(1)
  const [hotels, setHotels] = useState([])

  const handleHotelChange = (index, event) => {
    const newHotels = [...hotels]
    newHotels[index][event.target.name] = event.target.value
    setHotels(newHotels)
  }

  const handleNightsChange = (index, night) => {
    const newHotels = [...hotels]
    const currentNights = newHotels[index].nights
    if (currentNights.includes(night)) {
      newHotels[index].nights = currentNights.filter((n) => n !== night)
    } else {
      newHotels[index].nights = [...currentNights, night]
    }
    setHotels(newHotels)
  }

  const handleAddHotel = () => {
    setHotels([...hotels, { name: '', nights: [], star: '', city: '', description: '' }])
  }

  const handleRemoveHotel = (index) => {
    const newHotels = [...hotels]
    newHotels.splice(index, 1)
    setHotels(newHotels)
  }

  const getAvailableNights = (index) => {
    const selectedNights = hotels.reduce((acc, hotel, i) => {
      if (i !== index) {
        return acc.concat(hotel.nights)
      }
      return acc
    }, [])
    return [...Array(numNights).keys()].map((n) => n + 1).filter((n) => !selectedNights.includes(n))
  }

  // variables
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')

  //flight
  const [flightDescription, setFlightDescription] = useState('')
  const [cabDescription, setCabDescription] = useState('')

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
      setPackageData({
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

    dispatch(
      setPackageData({
        days: numDays,
        nights: numNights,
        flightDescription,
        cabDescription,
        hotels,
        dayActivities,
      }),
    )

    setcurrentStep('3')
  }

  const Step4Validate = () => {
    dispatch(
      setPackageData({
        travelEsen,
        faqDetails,
        termConditions,
        paymentTerm,
      }),
    )
    addPackageToApi(travelEsen, faqDetails, termConditions, paymentTerm)
  }

  const packageData = useSelector((state) => state.addPackage)
  const storeUpdatePackageData = useSelector((state) => state.updatePackage)

  useEffect(() => {
    if (storeUpdatePackageData) {
      setTitle(storeUpdatePackageData.title)
      setDescription(storeUpdatePackageData.description)
      // setDestination(storeUpdatePackageData.destination)
      setNumDays(storeUpdatePackageData.days)
      setNumNights(storeUpdatePackageData.nights)

      var all_destination = []
      storeUpdatePackageData.destination?.forEach((item) => {
        all_destination.push(item._id)
      })
      setAllDestinationsSelected(all_destination)

      var all_trip_type = []
      storeUpdatePackageData.tripType?.forEach((item) => {
        all_trip_type.push(item._id)
      })
      setAllTripTypeSelected(all_trip_type)

      if (storeUpdatePackageData.cabDescription) {
        setIsCabsOpen(true)
        setCabDescription(storeUpdatePackageData.cabDescription)
      }

      if (storeUpdatePackageData.flightDescription) {
        setIsFlightOpen(true)
        setFlightDescription(storeUpdatePackageData.flightDescription)
      }

      if (storeUpdatePackageData.hotels) {
        setHotels(storeUpdatePackageData.hotels)
      }

      if (storeUpdatePackageData.dayActivities) {
        setDayActivities(storeUpdatePackageData.dayActivities)
      }

      setTravelEsen(storeUpdatePackageData.travelEsen)
      setFaqDetails(storeUpdatePackageData.faqDetails)
      setTermConditions(storeUpdatePackageData.termConditions)
      setPaymentTerm(storeUpdatePackageData.paymentTerm)
    }
  }, [storeUpdatePackageData])

  const [showTravelEssentials, setShowTravelEssentials] = useState(true)
  const [showFAQs, setShowFAQs] = useState(true)
  const [showTermsConditions, setShowTermsConditions] = useState(true)
  const [showPaymentTerms, setShowPaymentTerms] = useState(true)

  const addPackageToApi = async (travelEsen, faqDetails, termConditions, paymentTerm) => {
    const formData = new FormData()
    formData.append('title', packageData.title)
    formData.append('description', packageData.description)
    formData.append('days', packageData.days)
    formData.append('nights', packageData.nights)
    formData.append('flightTrain', packageData.flightDescription)
    formData.append('cabs', packageData.cabDescription)
    formData.append('partialPayment', packageData.partialPayment)

    if(isEmbed){
      formData.append('bookingDate', packageData.bookingDate)
    }

    packageData.destination.forEach((item, index) => {
      formData.append(`destination[${index}]`, item)
    })

    packageData.tripType.forEach((item, index) => {
      formData.append(`tripType[${index}]`, item)
    })

    if (storeUploadImages && storeUploadImages.length > 0) {
      storeUploadImages.forEach((image, index) => {
        formData.append('galleryImages', image)
      })
    }

    packageData.hotels.forEach((item, index) => {
      formData.append(`hotels[${index}][name]`, item.name)
      formData.append(`hotels[${index}][rating]`, item.star)
      formData.append(`hotels[${index}][city]`, item.city)
      formData.append(`hotels[${index}][nights]`, item.nights)
      formData.append(`hotels[${index}][description]`, item.description)
    })

    packageData.dayActivities.forEach((item, index) => {
      formData.append(`itineraries[${index}][heading]`, item.heading)
      formData.append(`itineraries[${index}][activity]`, item.description)
    })

    if (packageData.fixedDeparture === 'no') {
      formData.append('fixedDeparture[type]', 'false')
    } else {
      formData.append('fixedDeparture[type]', 'true')
    }

    if (packageData.fixedDeparture === 'no') {
      if (packageData.costOption === 'perPerson') {
        formData.append('costOptions[type]', 'cost per person')
      } else {
        formData.append('costOptions[type]', 'total cost')
      }
      formData.append('costOptions[landPackagePrice]', packageData.costOptionLandPrice)
      formData.append('costOptions[flightPrice]', packageData.costOptionFlightPrice)
      formData.append(
        'costOptions[totalPrice]',
        parseInt(packageData.costOptionFlightPrice) + parseInt(packageData.costOptionLandPrice),
      )
    } else {
      formData.append('fixedDeparture[groupSize]', packageData.groupSize)
      formData.append('fixedDeparture[doubleSharing][flightPrice]', packageData.doubleFlightPrice)
      formData.append(
        'fixedDeparture[doubleSharing][landPackagePrice]',
        packageData.doubleLandPrice,
      )
      formData.append(
        'fixedDeparture[doubleSharing][totalPrice]',
        parseInt(packageData.doubleLandPrice) + parseInt(packageData.doubleFlightPrice),
      )
      formData.append('fixedDeparture[tripleSharing][flightPrice]', packageData.tripleFlightPrice)
      formData.append('fixedDeparture[tripleSharing][landPackagePrice]', packageData.tripleLadPrice)
      formData.append(
        'fixedDeparture[tripleSharing][totalPrice]',
        parseInt(packageData.tripleLadPrice) + parseInt(packageData.tripleFlightPrice),
      )

      packageData.packageDates.forEach((item, index) => {
        formData.append(`fixedDeparture[dates][${index}]`, item)
      })

      formData.append('costOptions[landPackagePrice]', 0)
      formData.append('costOptions[flightPrice]', 0)
      formData.append('costOptions[totalPrice]', 0)
    }

    packageData.priceIncludes.forEach((item, index) => {
      formData.append(`includes[${index}]`, item)
    })

    packageData.priceExcludes.forEach((item, index) => {
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

    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      setLoading(true)
      let res = await MyAPI.PUT(`/admin/package/${id}`, formData, token)
      let { success, message, error } = res.data || res
      setLoading(false)
      if (success) {
        if (isEmbed) {
          navigate(`/admin/inquiry/${enqId}`)
        } else {
          navigate('/admin/packages/all')
        }
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
        <h4 className="poppins">Edit Package</h4>{' '}
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
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Flight/train"
                checked={isFlightOpen}
                onChange={() => setIsFlightOpen(!isFlightOpen)}
              />
              {isFlightOpen && (
                <>
                  <Form.Control
                    onChange={(e) => setFlightDescription(e.target.value)}
                    value={flightDescription}
                    className="small-font"
                    as="textarea"
                    rows={3}
                    placeholder="Enter about flight train..."
                  />
                </>
              )}
            </Form.Group>
          </Col>
          <hr className="mt-2 mb-2" />
          <Col md={12}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Cabs"
                checked={isCabsOpen}
                onChange={() => setIsCabsOpen(!isCabsOpen)}
              />
              {isCabsOpen && (
                <>
                  <Form.Control
                    onChange={(e) => setCabDescription(e.target.value)}
                    value={cabDescription}
                    as="textarea"
                    className="small-font"
                    rows={3}
                    placeholder="Enter about cabs..."
                  />
                </>
              )}
            </Form.Group>
          </Col>

          <hr className="mt-2 mb-2" />

          {/* <HotelForm numHDays={numDays} numHNights={10} /> */}

          <Container>
            <Col className="d-flex align-items-center justify-content-between">
              <h5 className="poppins">Add Hotel</h5>
              <Button size="sm" variant="primary" onClick={handleAddHotel}>
                <IoAdd size={22} />
              </Button>
            </Col>
            {hotels.map((hotel, index) => (
              <Row key={index} className="mb-3">
                <Col md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label className="small-font">Hotel Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      className="input-border small-font"
                      value={hotel.name}
                      onChange={(e) => handleHotelChange(index, e)}
                      placeholder="Enter hotel name"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mt-2">
                    <Form.Label className="small-font">Star Rating</Form.Label>
                    <Form.Control
                      type="text"
                      name="star"
                      className="input-border small-font"
                      value={hotel.star}
                      onChange={(e) => handleHotelChange(index, e)}
                      placeholder="Enter star rating"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mt-2">
                    <Form.Label className="small-font">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      className="input-border small-font"
                      value={hotel.city}
                      onChange={(e) => handleHotelChange(index, e)}
                      placeholder="Enter city"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <SelectMultipleOptions
                    availableNights={getAvailableNights(index)}
                    selectedNights={hotel.nights}
                    onNightsChange={(night) => handleNightsChange(index, night)}
                  />
                </Col>
                <Col md={12}>
                  <Form.Group className="mt-2">
                    <Form.Label className="small-font">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      className="input-border small-font"
                      value={hotel.description}
                      onChange={(e) => handleHotelChange(index, e)}
                      rows={3}
                      placeholder="Enter description"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button
                    size="sm"
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleRemoveHotel(index)}
                  >
                    <IoCloseOutline size={22} />
                  </Button>
                </Col>
                <hr />
              </Row>
            ))}
          </Container>

          <hr className="mt-2 mb-2" />

          <Col className="d-flex align-content-center justify-content-between">
            <h5 className="poppins">Itinerary</h5>
            <p className="d-flex float-end">
              <Button size="sm" variant="primary" onClick={handleAddDayActivity}>
                <IoAdd size={22} />
              </Button>
            </p>
          </Col>

          {dayActivities.map((activity, index) => (
            <div key={index}>
              <Form.Group key={index}>
                <Form.Label className="small-font"> Heading Day {index + 1} </Form.Label>
                <Form.Control
                  value={activity.heading}
                  onChange={(e) => handleDayActivityChange(index, 'heading', e.target.value)}
                  type="text"
                  className="input-border small-font"
                  placeholder="Enter Heading"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label className="small-font">Day {index + 1} Activity</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="input-border small-font"
                  placeholder={`Enter day ${index + 1} activity...`}
                  value={activity.description}
                  onChange={(e) => handleDayActivityChange(index, 'description', e.target.value)}
                />
              </Form.Group>
              <Button
                variant="danger"
                className="mt-2"
                size="sm"
                onClick={() => handleRemoveDayActivity(index)}
              >
                <IoCloseOutline size={22} />
              </Button>
              <hr className="mt-2 mb-2" />
            </div>
          ))}

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
          <FixedDepartureForm setcurrentStep={setcurrentStep} />
        </>
      )}
      {currentStep === '4' && (
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
              onClick={() => setcurrentStep('3')}
              variant="primary"
            >
              Previous
            </Button>
            <Button onClick={!loading && Step4Validate} size="sm" variant="primary">
              {loading ? <Spinner animation="border" size="sm" /> : 'Update Package'}
            </Button>
          </Col>
        </>
      )}
      <br />
      <br />
    </>
  )
}

export default EditPackages
