import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function TermConditions() {
  const [termConditions, setTermCondition] = useState('')
  const [termConditionsData, setTermConditionData] = useState([])
  const [termConditionsId, setTermConditionId] = useState('')
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  const fetchTermAndCondition = async () => {
    try {
      let res = await MyAPI.GET('/t&c', token)
      let { success, message, error, termAndConditions } = res.data || res
      if (success) {
        setTermConditionData(termAndConditions)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (termConditionsData && termConditionsData.length > 0) {
      setTermCondition(termConditionsData[0].html)
      setTermConditionId(termConditionsData[0]._id)
    }
  }, [termConditionsData])

  useEffect(() => {
    fetchTermAndCondition()
  }, [token])

  const handleAddTermAndCondition = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.POST('/t&c', { html: termConditions }, token)
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

  const handleUpdateTermCondition = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.PUT(`/t&c/${termConditionsId}`, { html: termConditions }, token)
      let { message, error, success } = res.data || res
      if (success) {
        fetchTermAndCondition()
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
        <h6 className="poppins">Term & Conditions</h6>
      </Col>
      <Col md={12} className="mt-4">
        <ReactQuill
          value={termConditions}
          onChange={setTermCondition}
          modules={modules}
          formats={formats}
        />
      </Col>
      <Col className="mt-2 mb-2">
        <Button
          onClick={termConditionsId ? handleUpdateTermCondition : handleAddTermAndCondition}
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

export default TermConditions
