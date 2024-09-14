import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function PayemtTerm() {
  const [paymentTerm, setPaymentTerm] = useState('')
  const [paymentTermData, setPaymentTermData] = useState([])
  const [paymentTermId, setPaymentTermId] = useState('')
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  const fetchPaymentTerm = async () => {
    try {
      let res = await MyAPI.GET('/paymentTerm', token)
      let { success, message, error, paymentTerms } = res.data || res
      if (success) {
        setPaymentTermData(paymentTerms)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (paymentTermData && paymentTermData.length > 0) {
      setPaymentTerm(paymentTermData[0].html)
      setPaymentTermId(paymentTermData[0]._id)
    }
  }, [paymentTermData])

  useEffect(() => {
    fetchPaymentTerm()
  }, [token])

  const handleAddPaymentTerm = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.POST('/paymentTerm', { html: paymentTerm }, token)
      let { success, message, error } = res.data || res
      if (success) {
        MyError.success(message)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePaymentTerm = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.PUT(`/paymentTerm/${paymentTermId}`, { html: paymentTerm }, token)
      let { message, error, success } = res.data || res
      if (success) {
        fetchPaymentTerm()
        MyError.success(message)
      } else {
        MyError.error(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

  return (
    <>
      <Col className="mb-2">
        <h6 className="poppins">Payment Term</h6>
      </Col>
      <Col md={12} className="mt-4">
        <ReactQuill
          value={paymentTerm}
          onChange={setPaymentTerm}
          modules={modules}
          formats={formats}
        />
      </Col>
      <Col className="mt-2 mb-2">
        <Button
          onClick={paymentTermId ? handleUpdatePaymentTerm : handleAddPaymentTerm}
          variant="primary"
          size="sm"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Col>
    </>
  )
}

export default PayemtTerm
