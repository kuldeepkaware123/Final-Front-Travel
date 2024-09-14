import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const PdfPage = () => {
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const contentIds = ['travel-details', 'itinerary', 'terms-conditions']
    let currentPage = 0

    for (let i = 0; i < contentIds.length; i++) {
      const contentId = contentIds[i]
      const element = document.getElementById(contentId)

      if (element) {
        // Capture the element as a canvas
        const canvas = await html2canvas(element, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')

        const pageWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm
        const imgWidth = pageWidth // Use full page width
        const imgHeight = (canvas.height * imgWidth) / canvas.width // Maintain aspect ratio

        let heightLeft = imgHeight
        let position = 0

        // Add the first page with content
        if (currentPage > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, Math.min(pageHeight, heightLeft))
        heightLeft -= pageHeight
        position -= pageHeight
        currentPage++

        // Handle page splitting if content exceeds one page
        // while (heightLeft > 0) {
        //   pdf.addPage()
        //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, Math.min(pageHeight, heightLeft))
        //   heightLeft -= pageHeight
        //   position -= pageHeight
        //   currentPage++
        // }
      }
    }

    pdf.save('travel-details.pdf')
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 flex-column bg-danger">
      <div id="travel-details" style={styles.page}>
        <h1 style={styles.heading}>Travel Details</h1>
        <p style={styles.paragraph}>
          Explore the beautiful city of Paris, known for its rich history, culture, and
          architecture. Visit landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame
          Cathedral.
        </p>
        <img src="" alt="Paris" style={styles.image} />
        <ul style={styles.list}>
          <li>Tour the Eiffel Tower</li>
          <li>Visit the Louvre Museum</li>
          <li>Walk along the Seine River</li>
        </ul>
      </div>

      <div id="itinerary" style={styles.page}>
        <h1 style={styles.heading}>Itinerary</h1>
        <p style={styles.paragraph}>
          Day 1: Arrival in Paris. Explore the city and enjoy a welcome dinner.
        </p>
        <p style={styles.paragraph}>
          Day 2: Visit major attractions such as the Eiffel Tower and the Louvre.
        </p>
        <p style={styles.paragraph}>
          Day 3: Free day for shopping and leisure. Departure in the evening.
        </p>
        {/* Adding additional content for testing page overflow */}
        <p style={styles.paragraph}>
          Day 1: Arrival in Paris. Explore the city and enjoy a welcome dinner.
        </p>
        <p style={styles.paragraph}>
          Day 2: Visit major attractions such as the Eiffel Tower and the Louvre.
        </p>
        <p style={styles.paragraph}>
          Day 3: Free day for shopping and leisure. Departure in the evening.
        </p>
      </div>

      <div id="terms-conditions" style={styles.page}>
        <h1 style={styles.heading}>Terms and Conditions</h1>
        <p style={styles.paragraph}>
          1. Cancellation Policy: No refunds for cancellations made within 48 hours of departure.
        </p>
        <p style={styles.paragraph}>
          2. Liability: The company is not responsible for lost or stolen items.
        </p>
        <p style={styles.paragraph}>
          3. Changes to Itinerary: The company reserves the right to change the itinerary due to
          unforeseen circumstances.
        </p>
      </div>

      <button className="px-3 py-1 rounded-3 mb-3" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  )
}

// Inline styles
const styles = {
  page: {
    width: '210mm', // A4 width in mm
    height: '297mm', // A4 height in mm
    padding: '10mm', // Adjust padding as needed
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
    backgroundColor: '#ffffff', // Ensure the background is white
    marginBottom: '0', // Remove bottom margin to avoid extra space
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
  },
  image: {
    width: 'auto',
    height: '50vh',
    display: 'block',
    objectFit: 'contain',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: '20px',
    marginBottom: '15px',
  },
}

export default PdfPage
