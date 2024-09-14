import React, { useState } from 'react'
import { Row, Col, Button, Container, Spinner } from 'react-bootstrap'
import logo from '../assets/Logo/White/PuruliaRoutes-logo-White-rgb-600px.png'
import ReactToPrint from 'react-to-print'
import html2pdf from 'html2pdf.js'
import { IoIosPrint } from 'react-icons/io'
import { FaDownload, FaRegStar, FaStar } from 'react-icons/fa'
import Timeline from '../pages/Timeline'
import { TiTick } from 'react-icons/ti'
import { IoClose } from 'react-icons/io5'
import AccountQR from '../assets/images/account-qr.png'
import html2canvas from 'html2canvas'

const InvoicePage = ({ booking }) => {
  const printRef = React.useRef()

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

  // const handleDownloadPDF = () => {
  //   const element = printRef.current
  //   const options = {
  //     margin: [0, 0, 0, 0], // Set margins to 0.5 inches all around
  //     filename: `${booking?.rz_order_id?.orderId || 'Order-142512'}.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2, useCORS: true }, // Adjust scale and enable CORS for better rendering
  //     // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //     jsPDF: {
  //       unit: 'pt',
  //       format: 'a4',
  //       orientation: 'portrait',
  //     },
  //     pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  //   }
  //   // html2pdf().from(element).set(options).save()
  //   html2pdf()
  //     .from(element)
  //     .set(options)
  //     .toPdf()
  //     .get('pdf')
  //     .then(function (pdf) {
  //       const totalPages = pdf.internal.getNumberOfPages()

  //       for (let i = 1; i <= totalPages; i++) {
  //         pdf.setPage(i)
  //         pdf.setFontSize(10)

  //         // Add header
  //         pdf.text('Header Content', 20, 20) // Adjust the x, y positions as needed

  //         // Add footer with page number
  //         pdf.text(
  //           `Page ${i} of ${totalPages}`,
  //           pdf.internal.pageSize.width - 40,
  //           pdf.internal.pageSize.height - 30,
  //         )
  //       }
  //     })
  //     .save()
  // }

  const [loading, setLoading] = useState(false)

  const handleDownloadPDF = async () => {
    const element = printRef.current

    if (!element) {
      console.error('Element to print not found')
      return
    }
    setLoading(true)
    const options = {
      margin: [58.93, 0, 33.67, 0], // Set margins to 0
      filename: `${booking?.rz_order_id?.orderId || 'Order-142512'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Adjust scale and enable CORS for better rendering
      jsPDF: {
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }

    try {
      const pdf = await html2pdf().from(element).set(options).toPdf().get('pdf')
      const totalPages = pdf.internal.getNumberOfPages()

      // Ensure that #header and #footer elements are visible
      const headerElement = document.querySelector('.in-header')
      const footerElement = document.querySelector('.in-footer')

      if (!headerElement || !footerElement) {
        console.error('Header or footer element not found')
        return
      }

      const headerCanvas = await html2canvas(headerElement)
      const headerImage = headerCanvas.toDataURL('image/png')

      const footerCanvas = await html2canvas(footerElement)
      const footerImage = footerCanvas.toDataURL('image/png')

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)

        // Calculate dimensions for full width and 12vh height
        const pageWidth = pdf.internal.pageSize.width
        const pageHeight = pdf.internal.pageSize.height
        const footerHeight = pageHeight * 0.04 // 12% of page height for footer
        const headerHeight = pageHeight * 0.07 // 12% of page height for header

        // Add header image
        pdf.addImage(headerImage, 'PNG', 0, 0, pageWidth, headerHeight) // Full width, 12vh height

        // Add footer image with page number
        pdf.addImage(footerImage, 'PNG', 0, pageHeight - footerHeight, pageWidth, footerHeight) // Full width, 12vh height
        // pdf.text(
        //   `Page ${i} of ${totalPages}`,
        //   pageWidth - 40,
        //   pageHeight - 20,
        //   { align: 'right' }, // Right-align the footer text
        // )
      }

      pdf.save()
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      // Remove the element from the DOM
      setLoading(false)
    }
  }

  return (
    <>
      <Row className="ml-3 mb-5">
        <Col md={12} className="d-flex align-items-center justify-content-end gap-2">
          <Button disabled={loading} variant="primary" className="ml-2" onClick={handleDownloadPDF}>
            {loading ? <Spinner variant="secondary" size="sm" /> : <FaDownload />}
          </Button>
        </Col>
      </Row>
      {/* Header */}
      <Row
        id="header"
        className={`mb-2 px-4 invoice-header in-header ${!loading && 'd-none'}`}
        style={{ background: '#244855' }}
      >
        <Col className="d-flex align-items-center justify-content-start">
          <img src={logo} alt="Logo" style={{ maxWidth: '40px', objectFit: 'contain' }} />
        </Col>
        <Col className="text-right d-flex py-2 align-items-center justify-content-end">
          <h4 className="text-uppercase text-white poppins">Invoice</h4>
        </Col>
      </Row>
      <div
        ref={printRef}
        style={{
          width: '100%',
          border: '1px solid #ddd',
          overflow: 'hidden',
          boxSizing: 'border-box', // Ensure padding is included in width
        }}
      >
        <Row
          id="header"
          className={`mb-2 px-4 ${loading && 'd-none'}`}
          style={{ background: '#244855' }}
        >
          <Col className="d-flex align-items-center justify-content-start">
            <img src={logo} alt="Logo" style={{ maxWidth: '40px', objectFit: 'contain' }} />
          </Col>
          <Col className="text-right d-flex py-2 align-items-center justify-content-end">
            <h4 className="text-uppercase text-white poppins">Invoice</h4>
          </Col>
        </Row>
        <Container className="invoice-body" style={{ width: '100%' }}>
          {/* Booking Details */}
          <Row>
            <Col>
              <p style={{ textAlign: 'start' }}>
                <strong>Booking Date</strong> <br />{' '}
                {booking?.bookingDate
                  ? new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }).format(new Date(booking?.bookingDate))
                  : 'Not Available'}
              </p>
            </Col>
            <Col className="text-right d-flex align-content-center justify-content-end">
              <p style={{ textAlign: 'end' }}>
                <strong>Booking ID</strong> <br /> {booking?.bookingId || 'Not Available'}
              </p>
            </Col>
          </Row>
          <hr />
          {/* Travel Agent Details */}
          <Row>
            <Col>
              <h5 className="mb-1 poppins">
                <b>Company Details</b>
              </h5>
              <div className="d-flex align-items-start justify-content-start gap-3 flex-wrap">
                <h6 style={{ color: '#244855' }}>
                  <b>Purulia Travels Pvt Ltd.</b>
                </h6>
                <span style={{ width: '1px', height: '20px', background: 'black' }}></span>
                <p>
                  <i className="fas fa-phone-alt"></i> +919090403075
                </p>
                <span style={{ width: '1px', height: '20px', background: 'black' }}></span>
                <p>
                  <i className="fas fa-envelope"></i> info@PuruliaRoutes.com
                </p>
                <span style={{ width: '1px', height: '20px', background: 'black' }}></span>
                <p>
                  <i className="fas fa-globe"></i> www.PuruliaRoutes.com
                </p>
              </div>
            </Col>
          </Row>
          <hr />
          {/* Payment Details */}
          <Row>
            <Col>
              <h5 className="mb-3 poppins">Payment Details</h5>
              <Row>
                <Col md={6}>
                  <strong className="text-dark">Payment ID:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    {booking.rz_order_id?.razorpay_payment_id || 0}
                  </span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Payment Date:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    {formatDateA(booking.rz_order_id?.createdAt)}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong className="text-dark">Final Price:</strong>{' '}
                  <span style={{ color: '#333' }}>₹{booking.price?.finalPrice || 0}</span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Payment Mode:</strong>{' '}
                  <span style={{ color: '#333' }}>{booking.paymentMode || 'Not Available'}</span>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong className="text-dark">Paid Amount:</strong>{' '}
                  <span style={{ color: '#333' }}>₹{booking.price?.paidAmount || 0}</span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Payment Status:</strong>{' '}
                  <span style={{ color: '#333' }}>{booking.rz_order_id?.status || 0}</span>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong className="text-dark">Due Amount:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    ₹ {(booking.price?.finalPrice || 0) - (booking.price?.paidAmount || 0)}
                  </span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Due Status:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    {(booking.price?.finalPrice || 0) - (booking.price?.paidAmount || 0) === 0
                      ? 'No Due'
                      : 'Amount Due'}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />

          {/* Total */}
          <Row className="mb-4 d-flex align-items-center justify-content-end">
            <Col md={5} className="text-right rounded-2 py-2" style={{ background: '#244855' }}>
              <h5 className="text-white">Grand Total</h5>
              <h3 className="text-white">₹ {booking.price?.finalPrice || 0}</h3>
              <p>Best Price Guaranteed</p>
            </Col>
          </Row>

          <hr />
          <Row className="mb-2">
            <h5 className="mb-1 poppins">Account Details</h5>
            <Col md={6}>
              <strong className="text-dark">Account Number :</strong>
              <span style={{ color: '#000' }}>50200086657577</span>
            </Col>
            <Col md={6}>
              <strong className="text-dark">IFSC :</strong>
              <span style={{ color: '#000' }}>HDFC0006646</span>
            </Col>
            <Col md={6}>
              <strong className="text-dark">Account Type :</strong>
              <span style={{ color: '#000' }}>CURRENT</span>
            </Col>
            <Col md={6}>
              <strong className="text-dark">Branch :</strong>
              <span style={{ color: '#000' }}>SITABARI TONK ROAD</span>
            </Col>
            <Col md={6} className="mb-1">
              <strong className="text-dark">Account Holder :</strong>
              <span style={{ color: '#000' }}>Purulia Travels PRIVATE LIMITED</span>
            </Col>
            <Col md={6} className="mb-1">
              <strong className="text-dark">UPI I'D :</strong>
              <span style={{ color: '#000' }}>9650129977@hdfcbank</span>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <Col
              md={12}
              className="d-flex align-items-center justify-content-center gap-1 flex-column"
            >
              <img src={AccountQR} />
              {/* <p className="text-center">Scan to Pay</p> */}
              {/* <b>Purulia Travels</b> */}
            </Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <Col md={12}>
              <h5 className="mb-3 poppins">Booking Summary</h5>
              <Row>
                <Col md={12}>
                  <strong className="text-dark">Package Title:</strong>{' '}
                  <span style={{ color: '#333' }}>{booking.package?.title || 'Not Available'}</span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Traveler Name :</strong>
                  <span style={{ color: '#333' }}>{booking?.user?.name || 'Not Available'}</span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Booking Date :</strong>
                  <span style={{ color: '#333' }}>
                    {booking?.bookingDate
                      ? new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(booking?.bookingDate))
                      : 'Not Available'}
                  </span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">No. Person :</strong>
                  <span style={{ color: '#333' }}>
                    {booking &&
                      booking?.package?.fixedDeparture.type === true &&
                      (booking.price.fixedDepartureType === 'Triple'
                        ? `${booking.price.quantity} * Triple Sharing`
                        : `${booking.price.quantity} * Double Sharing`)}
                    {booking &&
                      booking?.package?.fixedDeparture.type === false &&
                      booking?.package?.isPrivate === false &&
                      `${booking.price.quantity} * ${booking?.package?.costOptions.type === 'total cost' ? 'Per Couple' : 'Per Person'}`}

                    {booking &&
                      booking?.package?.fixedDeparture.type === false &&
                      booking?.package?.isPrivate === true &&
                      ` ${booking?.package?.costOptions.type === 'total cost' ? `${booking.price.quantity} * Per Person` : `${booking.price.quantity} Total Cost`}`}
                  </span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Days/Nights:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    {booking.package?.days || 'Not Available'} days /{' '}
                    {booking.package?.nights || 'Not Available'} nights
                  </span>
                </Col>
                <Col md={6}>
                  <strong className="text-dark">Destination:</strong>{' '}
                  <span style={{ color: '#333' }}>
                    {/* {booking.package?.destination.map?.name.join(', ') || 'Not Available'} */}
                    {booking && booking.package?.destination?.map((item) => `${item.name}, `)}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <h5 className="poppins">Hotel Details</h5>
            {booking &&
              booking.package &&
              booking.package.hotels &&
              booking.package.hotels.length > 0 ? (
              booking.package.hotels.map((hotel, index) => (
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
          </Row>
          <hr />
          <Row className="mb-2">
            <h5 className="poppins">Cab Details</h5>
            <Col md={12}>
              {' '}
              {booking && booking.package && booking.package.cabs
                ? booking.package.cabs
                : 'Cab Not Included.'}{' '}
            </Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <h5 className="poppins">Flight / Train Details</h5>
            <Col md={12}>
              {' '}
              {booking && booking.package && booking.package.flightTrain
                ? booking.package.flightTrain
                : 'Flight/Train Not Included.'}{' '}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <h5 className="mb-3 poppins">Price Includes</h5>
              <ul>
                {booking &&
                  booking.package?.includes.length > 0 &&
                  booking.package?.includes.map((item, index) => (
                    <li key={index} className="d-block pb-1">
                      <TiTick size={22} color="green" /> &nbsp;
                      {item}
                    </li>
                  ))}
              </ul>
            </Col>
            <hr />
            <Col md={12}>
              <h5 className="mb-3 poppins">Price Excludes</h5>
              <ul>
                {booking &&
                  booking.package?.excludes.length > 0 &&
                  booking.package?.excludes.map((item, index) => (
                    <li key={index} className="d-block pb-1">
                      <IoClose size={22} color="red" /> &nbsp;
                      {item}
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <h5 className="poppins">Itinerary</h5>
            {booking &&
              booking.package &&
              booking.package.itineraries &&
              booking.package.itineraries.length > 0 ? (
              booking.package.itineraries.map((item, index) => (
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
          {/* <Timeline events={(booking && booking.package?.itineraries) || []} key={12} /> */}
          <hr />
          <Row>
            <>
              {booking &&
                booking.package &&
                booking.package?.termsAndConditions &&
                booking.package?.termsAndConditions !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h5 className="text-uppercase poppins mid-font">Terms and Conditions</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            booking && booking.package?.termsAndConditions
                              ? booking.package.termsAndConditions
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {booking &&
                booking.package &&
                booking.package?.paymentTerms &&
                booking.package?.paymentTerms !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h5 className="text-uppercase poppins mid-font">Payment Terms</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            booking && booking.package?.paymentTerms
                              ? booking.package?.paymentTerms
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {booking &&
                booking.package &&
                booking.package?.travelEssentials &&
                booking.package?.travelEssentials !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h5 className="text-uppercase poppins mid-font">Travel Essentials</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            booking && booking.package?.travelEssentials
                              ? booking.package?.travelEssentials
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}

              {booking &&
                booking.package &&
                booking.package?.faqs &&
                booking.package?.faqs !== '<br>' && (
                  <Col md={12}>
                    <div className="border-bottom mb-2">
                      <h5 className="text-uppercase poppins mid-font">FAQ'S</h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            booking && booking.package?.faqs
                              ? booking.package?.faqs
                              : 'No Terms and Conditions',
                        }}
                      />
                    </div>
                  </Col>
                )}
            </>
          </Row>
          <Row className="mt-3 px-4 mb-4">
            <Col className="text-center">
              <a
                href="https://PuruliaRoutes.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline' }}
              >
                PuruliaRoutes.com
              </a>
            </Col>
          </Row>
        </Container>
        <Row
          className={`mb-2 px-4 d-flex align-items-center justify-content-between ${loading && 'd-none'}`}
          style={{ background: '#244855', padding: '10px 20px', color: 'white' }}
        >
          <div className="d-flex align-items-center">
            <b>Purulia Travels.</b>
            <span
              style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
            ></span>
            <p className="d-flex align-items-center mb-0">
              <i className="fas fa-phone-alt"></i> &nbsp; +919090403075
            </p>
            <span
              style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
            ></span>
            <p className="d-flex align-items-center mb-0">
              <i className="fas fa-envelope"></i> &nbsp;info@PuruliaRoutes.com
            </p>
            <span
              style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
            ></span>
            <p className="d-flex align-items-center mb-0">
              <i className="fas fa-globe"></i>&nbsp; www.PuruliaRoutes.com
            </p>
          </div>
        </Row>
      </div>
      <Row
        className={`mb-2 px-4 in-footer d-flex align-items-center justify-content-between ${!loading && 'd-none'}`}
        style={{ background: '#244855', padding: '10px 20px', color: 'white' }}
      >
        <div className="d-flex align-items-center">
          <b>Purulia Travels.</b>
          <span
            style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
          ></span>
          <p className="d-flex align-items-center mb-0">
            <i className="fas fa-phone-alt"></i> &nbsp; +919090403075
          </p>
          <span
            style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
          ></span>
          <p className="d-flex align-items-center mb-0">
            <i className="fas fa-envelope"></i> &nbsp;info@PuruliaRoutes.com
          </p>
          <span
            style={{ width: '1px', height: '20px', background: 'white', margin: '0 10px' }}
          ></span>
          <p className="d-flex align-items-center mb-0">
            <i className="fas fa-globe"></i>&nbsp; www.PuruliaRoutes.com
          </p>
        </div>
      </Row>
    </>
  )
}

export default InvoicePage
