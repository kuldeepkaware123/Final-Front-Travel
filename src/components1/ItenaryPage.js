import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Row, Col, Button, Container, Spinner } from 'react-bootstrap'
import { FaDownload, FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa'
import html2pdf from 'html2pdf.js'
// import logo from '../assets/Logo/Brown/PuruliaRoutes-logo-Brown-rgb-600px.png'
import html2canvas from 'html2canvas'
import { TiTick } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import PDFFooter from '../assets/images/pdf-footer.png'
import PDFHeader from '../assets/images/pdf-header.png'
import PDFTST from '../assets/images/ibrahim-rifath-X_6lI192qgs-unsplash.jpg'
import useIsMobile from './useIsMobile'
import { MyError } from '../MyAPI'
const ItenaryPage = forwardRef(({ packageData, enquiryData, loading, setLoading }, ref) => {
  const printRef = useRef()
  const [backgroundImage, setBackgroundImage] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const convertToBase64 = async (url) => {
    try {
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }
      const blob = await response.blob()

      // Resize the image if necessary
      const img = document.createElement('img')
      img.src = URL.createObjectURL(blob)

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          // Set canvas dimensions (resize image if necessary)
          canvas.width = img.width / 2 // Adjust as needed
          canvas.height = img.height / 2 // Adjust as needed

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const base64Image = canvas.toDataURL('image/jpeg', 0.8) // Adjust quality as needed
          resolve(base64Image)
        }

        img.onerror = reject
      })
    } catch (error) {
      console.error('Error converting image to base64:', error)
      throw error // Re-throw the error to be handled by the caller
    }
  }

  useEffect(() => {
    if (packageData && packageData.galleryImages && packageData.galleryImages.length > 0) {
      setImgUrl(packageData.galleryImages[0] || packageData.galleryImages[1])
      convertToBase64(packageData.galleryImages[0])
        .then((base64Image) => {
          setBackgroundImage(base64Image)
        })
        .catch((err) => {
          console.error('Error converting image to base64:', err)
        })
    }
  }, [packageData])

  useImperativeHandle(ref, () => ({
    handleDownloadPDF,
  }))

  const handleDownloadPDF = async () => {
    const element = printRef.current

    if (!element) {
      console.error('Element to print not found')
      return
    }

    setLoading(true)

    const options = {
      margin: [58.93, 0, 33.67, 0], // Adjust margins if needed
      filename: 'Order-142512.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Adjust scale and enable CORS for better rendering
      jsPDF: {
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait',
        comprecompress: true,
      },
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      pagebreak: { mode: ['css', 'legacy'] },
    }

    try {
      // Generate the initial PDF from the element
      const pdf = await html2pdf().from(element).set(options).toPdf().get('pdf')
      const totalPages = pdf.internal.getNumberOfPages()

      // Select header and footer elements
      const headerElement = document.querySelector('.in-header')
      const footerElement = document.querySelector('.in-footer')

      if (!headerElement || !footerElement) {
        console.error('Header or footer element not found')
        return
      }

      // Convert header to base64
      const headerCanvas = await html2canvas(headerElement, {
        useCORS: true,
        scale: 2,
      })
      const headerImage = headerCanvas.toDataURL('image/png')

      // Convert footer to base64
      const footerCanvas = await html2canvas(footerElement, {
        useCORS: true,
        scale: 2,
      })
      const footerImage = footerCanvas.toDataURL('image/png')

      // Fetch and convert the bottom image
      const response = await fetch(imgUrl, { mode: 'cors' })
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }
      const blob = await response.blob()
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Failed to convert blob to base64'))
        reader.readAsDataURL(blob)
      })

      const imgObj = await new Promise((resolve, reject) => {
        const img = new Image()
        img.src = base64Image
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Failed to load image for dimension retrieval'))
      })

      const bottomImageWidth = imgObj.width
      const bottomImageHeight = imgObj.height
      const bottomImageAspectRatio = bottomImageWidth / bottomImageHeight
      const pageWidth = pdf.internal.pageSize.width
      const bottomImageNewHeight = pageWidth / bottomImageAspectRatio

      // Loop through each page to add header, footer, and bottom image
      let finalPages = []
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)

        const pageHeight = pdf.internal.pageSize.height
        const footerHeight = pageHeight * 0.04
        const headerHeight = pageHeight * 0.07
        const bottomImageMargin = pageHeight * 0.04

        // Add header and footer images
        pdf.addImage(useIsMobile ? PDFHeader : headerImage, 'PNG', 0, 0, pageWidth, headerHeight)
        pdf.addImage(
          useIsMobile ? PDFFooter : footerImage,
          'PNG',
          0,
          pageHeight - footerHeight,
          pageWidth,
          footerHeight,
        )

        // Add bottom image only on the first page
        if (i === 1) {
          const yPos = pageHeight - bottomImageNewHeight - bottomImageMargin
          const finalYPos = yPos > 0 ? yPos : 0
          pdf.addImage(base64Image, 'JPEG', 0, finalYPos, pageWidth, bottomImageNewHeight)
        }

        // Check if the page is empty (only header and footer)
        const isEmptyPage = pdf.internal.pageSize.height - (headerHeight + footerHeight) < 20 // Threshold to determine if the page has content

        if (!isEmptyPage) {
          finalPages.push(i) // Add non-empty pages to final pages
        }
      }

      // Remove empty pages from the PDF
      for (let i = totalPages; i >= 1; i--) {
        if (!finalPages.includes(i)) {
          pdf.deletePage(i)
        }
      }

      // Save the generated PDF
      pdf.save(`${packageData.title}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
    if (discountType === 'percentage') {
      return actualPrice - actualPrice * (discountValue / 100)
    } else if (discountType === 'price') {
      return actualPrice - discountValue
    } else {
      throw new Error('Invalid discount type')
    }
  }

  return (
    <>
      {/* <Row className="ml-3 mb-5">
        <Col md={6}>&nbsp;</Col>
        <Col md={6} className="d-flex align-items-center justify-content-end gap-2">
          <Button disabled={loading} variant="primary" className="ml-2" onClick={handleDownloadPDF}>
            {loading ? <Spinner variant="secondary" size="sm" /> : <FaDownload />}
          </Button>
        </Col>
      </Row> */}
      <Row
        id="header"
        className={`mb-2 px-4 in-header ${!loading && 'd-none'} `}
      // style={{ background: '#244855' }}
      >
        <Col md={12} className="d-flex align-items-center justify-content-end mt-2">
          <img
            src=""
            alt="Logo"
            style={{ width: '80px', height: 'auto', objectFit: 'contain' }}
          />
        </Col>
      </Row>
      <div className={`${!loading && 'd-none'}`} ref={printRef}>
        <Container fluid style={{ padding: 0 }}>
          <Row
            id="header"
            className={`mb-2 px-4 in-header ${loading && 'd-none'} `}
          // style={{ background: '#244855' }}
          >
            <Col md={12} className="d-flex align-items-center justify-content-end">
              <img
                src=""
                alt="Logo"
                style={{ maxWidth: '70px', height: '80px', objectFit: 'contain' }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <h2
                style={{ color: '#8B4821' }}
                className=" text-decoration-underline poppins text-center"
              >
                {(packageData && packageData.title) || 'Title Not Found.'}
              </h2>
              <h3 style={{ color: '#8B4821' }} className="poppins text-center">
                {packageData && packageData?.nights} Nights / {packageData && packageData?.days}{' '}
                Days
              </h3>
              {!enquiryData && (
                <h3 style={{ color: '#8B4821' }} className="poppins text-center">
                  From &nbsp;
                  {packageData &&
                    packageData.fixedDeparture.type === false &&
                    (packageData.offer ? (
                      <>
                        <span className="text-muted text-truncate text-decoration-line-through">
                          ₹{packageData.costOptions.totalPrice}
                        </span>
                        &nbsp; &nbsp;
                        <span>
                          <b>
                            ₹
                            {calculateDiscountedPrice(
                              packageData.offer.type,
                              packageData.costOptions.totalPrice,
                              packageData.offer.value,
                            )}{' '}
                          </b>
                          /-
                        </span>
                      </>
                    ) : (
                      <span className="text-muted">₹{packageData.costOptions.totalPrice} /-</span>
                    ))}
                  {packageData &&
                    packageData.fixedDeparture.type === true &&
                    (packageData.offer ? (
                      <>
                        <span className="text-muted text-truncate text-decoration-line-through">
                          ₹{packageData.fixedDeparture.tripleSharing.totalPrice}
                        </span>
                        &nbsp; &nbsp;
                        <span>
                          <b>
                            ₹
                            {calculateDiscountedPrice(
                              packageData.offer.type,
                              packageData.fixedDeparture.tripleSharing.totalPrice,
                              packageData.offer.value,
                            )}{' '}
                          </b>
                          /-
                        </span>
                      </>
                    ) : (
                      <span className="text-muted">
                        ₹{packageData.fixedDeparture.tripleSharing.totalPrice} /-
                      </span>
                    ))}
                </h3>
              )}
            </Col>
          </Row>
          <Row>
            <Col
              className="d-flex align-content-center justify-content-end flex-column m-0 p-0s"
              style={{ width: '100%', height: useIsMobile ? '877.4px' : '1517.4px' }}
              md={12}
            >
              {/* {backgroundImage && (
                <img
                  src={backgroundImage}
                  alt="Background"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              )} */}
              {/* {packageData && packageData.galleryImages && packageData.galleryImages.length > 0 && (
                <img
                  className="bottom-image"
                  src={packageData.galleryImages[0]}
                  style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
                  loading="lazy"
                />
              )} */}
            </Col>
          </Row>
          {!enquiryData && (
            <Row className="mb-3 px-3">
              <h4 className="poppins" style={{ color: '#8B4821' }}>
                About
              </h4>
              <p style={{ textAlign: 'justify' }}>
                {packageData && packageData.description
                  ? packageData.description
                  : 'Description Not Available.'}
              </p>
            </Row>
          )}
          {enquiryData && (
            <>
              <Row className="mb-3 px-3">
                <h4 className="poppins" style={{ color: '#8B4821' }}>
                  Traveller Details
                </h4>
                <Col md={12}>
                  <b className="text-dark">Traveler Name :</b> &nbsp;
                  {`${enquiryData?.user?.firstName}  ${enquiryData?.user?.lastName}` ||
                    'Not Available'}
                </Col>
                <Col md={12}>
                  <b className="text-dark">Destination :</b> &nbsp;
                  {packageData && packageData.destination?.map((item) => `${item.name}, `)}
                </Col>
                <Col md={12}>
                  <b className="text-dark">Number of persons :</b> &nbsp;
                  {enquiryData &&
                    parseInt(enquiryData.noOfAdults || '0') +
                    parseInt(enquiryData.noOfChildrenAbove6 || '0') +
                    parseInt(enquiryData.noOfChildrenBelow6 || '0')}
                </Col>
                <Col md={12}>
                  <b className="text-dark">Package Cost :</b> &nbsp;
                  {packageData &&
                    packageData.costOptions &&
                    `₹ ${packageData.costOptions.totalPrice} /- ${packageData.costOptions.type === 'total cost' ? 'Total Cost' : 'Per Person'}`}
                </Col>
                <Col md={12}>
                  <b className="text-dark">Booking Date :</b> &nbsp;
                  {enquiryData?.StartDate
                    ? new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(enquiryData?.StartDate))
                    : 'Not Available'}
                </Col>
              </Row>
              <Row className="mb-3 px-3">
                <Col md={12}>
                  <h4 className="poppins" style={{ color: '#8B4821' }}>
                    Hotel Details
                  </h4>
                  {packageData && packageData.hotels && packageData.hotels.length > 0 ? (
                    packageData.hotels.map((hotel, index) => (
                      <Col md={12}>
                        <b className="text-dark">Hotel Name :</b> {hotel.name} ( {hotel.city} )
                        <br />
                        <b className="text-dark">Nights :</b> {hotel.nights} Nights
                        <br />
                        <b className="text-dark">Ratings :</b>
                        {Array.from({ length: 5 }, (_, index) =>
                          index < hotel.rating ? (
                            <FaStar key={index} className="text-warning" />
                          ) : (
                            <FaRegStar key={index} className="text-warning" />
                          ),
                        )}
                        <p>{hotel.description}</p>
                      </Col>
                    ))
                  ) : (
                    <Col md={12}>Hotel Not Included</Col>
                  )}
                </Col>
              </Row>
              <Row className="mb-3 px-3">
                <Col md={12}>
                  <h4 className="poppins" style={{ color: '#8B4821' }}>
                    Cab Details
                  </h4>
                  {packageData && packageData.cabs ? packageData.cabs : 'Cab Not Included.'}{' '}
                </Col>
              </Row>
              <Row className="mb-3 px-3">
                <Col md={12}>
                  <h4 className="poppins" style={{ color: '#8B4821' }}>
                    Flight / Train Details
                  </h4>
                  {packageData && packageData.flightTrain
                    ? packageData.flightTrain
                    : 'Flight/Train Not Included.'}{' '}
                </Col>
              </Row>
            </>
          )}
          <Row className="mb-3 px-3">
            <h4 className="poppins" style={{ color: '#8B4821' }}>
              Trip Includes
            </h4>
            <Col md={12}>
              <ul>
                {packageData &&
                  packageData?.includes.length > 0 &&
                  packageData?.includes.map((item, index) => (
                    <li key={index} className="d-block pb-1">
                      <TiTick size={22} color="green" /> &nbsp;
                      {item}
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
          <Row className="mb-3 px-3">
            <h4 className="poppins" style={{ color: '#8B4821' }}>
              Trip Excludes
            </h4>
            <Col md={12}>
              <ul>
                {packageData &&
                  packageData?.excludes.length > 0 &&
                  packageData?.excludes.map((item, index) => (
                    <li key={index} className="d-block pb-1">
                      <IoClose size={22} color="red" /> &nbsp;
                      {item}
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>

          <Row className="mb-3 px-3">
            <h4 style={{ color: '#8B4821' }} className="poppins">
              Itinerary
            </h4>
            {packageData && packageData && packageData.itineraries.length > 0 ? (
              packageData.itineraries.map((item, index) => (
                <Col md={12} key={index}>
                  <b className="text-dark mb-2">
                    Day {index + 1} - {item.heading}
                  </b>
                  <p style={{ textAlign: 'justify' }}>{item.activity}</p>
                </Col>
              ))
            ) : (
              <Col md={12}>itineraries not found.</Col>
            )}
          </Row>
          <Row className="mb-3 px-3">
            <>
              {packageData &&
                packageData &&
                packageData?.termsAndConditions &&
                packageData?.termsAndConditions !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h4 style={{ color: '#8B4821' }} className="text-uppercase poppins mid-font">
                        Terms and Conditions
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            packageData && packageData?.termsAndConditions
                              ? packageData.termsAndConditions
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {packageData &&
                packageData &&
                packageData?.paymentTerms &&
                packageData?.paymentTerms !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h4 style={{ color: '#8B4821' }} className="text-uppercase poppins mid-font">
                        Payment Terms
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            packageData && packageData?.paymentTerms
                              ? packageData?.paymentTerms
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {packageData &&
                packageData &&
                packageData?.travelEssentials &&
                packageData?.travelEssentials !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h4 style={{ color: '#8B4821' }} className="text-uppercase poppins mid-font">
                        Travel Essentials
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            packageData && packageData?.travelEssentials
                              ? packageData?.travelEssentials
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {packageData && packageData && packageData?.faqs && packageData?.faqs !== '<br>' && (
                <Col md={12}>
                  <div className="border-bottom mb-2">
                    <h4 style={{ color: '#8B4821' }} className="text-uppercase poppins mid-font">
                      FAQ'S
                    </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          packageData && packageData?.faqs
                            ? packageData?.faqs
                            : 'No Terms and Conditions',
                      }}
                    />
                  </div>
                </Col>
              )}
            </>
          </Row>
          <Row className="mb-3 px-3">
            <h4 className="poppins" style={{ color: '#8B4821' }}>
              Why Choose Purulia
            </h4>
            <Col md={12}>
              <h6 className="poppins">Personalized Travel Experiences</h6>
              <p style={{ textAlign: 'justify' }}>
                We create tailor-made travel packages to suit your preferences and needs, ensuring
                every trip is customized just for you.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins"> Expert Knowledge</h6>
              <p style={{ textAlign: 'justify' }}>
                With years of experience in the travel industry, our team has in-depth knowledge of
                top destinations, hidden gems, and travel trends.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">Seamless Planning</h6>
              <p style={{ textAlign: 'justify' }}>
                From flights to accommodations and tours, we take care of every detail, offering a
                stress-free travel experience from start to finish.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">Competitive Pricing</h6>
              <p style={{ textAlign: 'justify' }}>
                We offer great deals and value for your money, ensuring you get the best travel
                experiences at affordable rates.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">24/7 Customer Support</h6>
              <p style={{ textAlign: 'justify' }}>
                Our dedicated team is available around the clock to assist with any queries or
                concerns, ensuring peace of mind during your travels.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins"> Exclusive Partnerships</h6>
              <p style={{ textAlign: 'justify' }}>
                We partner with top hotels, airlines, and tour operators to bring you exclusive
                deals and perks that you won’t find elsewhere.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">Local Expertise</h6>
              <p style={{ textAlign: 'justify' }}>
                Our deep connections with local guides and businesses ensure authentic experiences
                that go beyond the typical tourist spots.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">Safety First</h6>
              <p style={{ textAlign: 'justify' }}>
                Your safety is our top priority. We work with trusted partners and provide
                up-to-date travel information to keep you secure at all times.
              </p>
            </Col>
            <Col md={12}>
              <h6 className="poppins">Flexibility</h6>
              <p style={{ textAlign: 'justify' }}>
                Whether you need to adjust your itinerary or reschedule a booking, we offer flexible
                options to accommodate changes.
              </p>
            </Col>
          </Row>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center gap-1 flex-column"
          >
            <hr style={{ height: '2px' }} />
            <p>Hardev Colony, Sita Bari, Jaipur, Rajasthan 302011</p>
            <Link to={'mailto:info@PuruliaRoutes.com'}>info@PuruliaRoutes.com</Link>
            <p>+91-9672153193</p>
            <div className="d-flex gap-3 mt-2">
              <a
                href="https://www.instagram.com/Purulia_routes/?igsh=NTl1dTFydDVpNjhm"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#E4405F' }} // Instagram color
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1877F2' }} // Facebook color
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.PuruliaRoutes.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0A66C2' }} // Globe icon color (or use the website's primary color)
              >
                <FaGlobe size={24} />
              </a>
            </div>
          </Col>
        </Container>
        {/* footer  */}
        <Row
          className={`mb-2 px-4 d-flex align-items-center justify-content-between ${loading && 'd-none'}`}
          style={{ background: '#8B4821', padding: '10px 20px', color: 'white' }}
        >
          <div className="d-flex align-items-center justify-content-center gap-3">
            <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
              <i className="fas fa-phone-alt"></i> &nbsp; +919090403075
            </p>
            <span
              style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
            ></span>
            <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
              <i className="fas fa-envelope"></i> &nbsp;info@PuruliaRoutes.com
            </p>
            <span
              style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
            ></span>
            <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
              <i className="fas fa-globe"></i>&nbsp; www.PuruliaRoutes.com
            </p>
          </div>
        </Row>
      </div>
      {/* footer public */}
      <Row
        className={`mb-2 px-4 d-flex align-items-center justify-content-between in-footer ${!loading && 'd-none'}`}
        style={{ background: '#8B4821', padding: '10px 20px', color: 'white' }}
      >
        <div className="d-flex align-items-center justify-content-center gap-3">
          <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
            <i className="fas fa-phone-alt"></i> &nbsp; +919090403075
          </p>
          <span
            style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
          ></span>
          <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
            <i className="fas fa-envelope"></i> &nbsp;info@PuruliaRoutes.com
          </p>
          <span
            style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
          ></span>
          <p className="d-flex align-items-center mb-0" style={{ letterSpacing: '1.8px' }}>
            <i className="fas fa-globe"></i>&nbsp; www.PuruliaRoutes.com
          </p>
        </div>
      </Row>
    </>
  )
})

export default ItenaryPage
