import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function FAQ() {
  const [faqDetails, setFaqDetails] = useState('')
  const [faqId, setFaqId] = useState('')
  const [faqData, setFaqData] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  const fetchFAQ = async () => {
    try {
      let res = await MyAPI.GET(`/faq`, token)
      let { message, success, error, faqs } = res.data || res
      if (success) {
        setFaqData(faqs)
      } else {
        MyError.warn(message || error || 'API Error.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (faqData && faqData.length > 0) {
      setFaqDetails(faqData[0].html)
      setFaqId(faqData[0]._id)
    }
  }, [faqData])

  useEffect(() => {
    fetchFAQ()
  }, [token])

  const handleApiFAQ = async () => {
    if (!faqDetails) {
      return MyError.warn('Please Enter FAQ')
    }
    setLoading(true)
    try {
      let res = await MyAPI.POST('/faq', { html: faqDetails }, token)
      let { message, error, success } = res.data || res
      if (success) {
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

  const handleUpdateFAQ = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.PUT(`/faq/${faqId}`, { html: faqDetails }, token)
      let { message, error, success } = res.data || res
      if (success) {
        fetchFAQ()
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
        <h6 className="poppins">FAQ</h6>
      </Col>
      <Col md={12} className="mt-4">
        <ReactQuill
          value={faqDetails}
          onChange={setFaqDetails}
          modules={modules}
          formats={formats}
        />
      </Col>
      <Col className="mt-2 mb-2">
        <Button
          variant="primary"
          onClick={faqId ? handleUpdateFAQ : handleApiFAQ}
          size="sm"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Col>
    </>
  )
}

export default FAQ
