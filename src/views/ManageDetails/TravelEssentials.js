import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MyAPI, MyError } from '../../MyAPI'
import { useSelector } from 'react-redux'

function TravelEssentials() {
  const [travelEsen, setTravelEssen] = useState('')
  const [travelEsenData, setTravelEssenData] = useState([])
  const [travelEsenId, setTravelEssenId] = useState('')
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  const fetchTravelEssentials = async () => {
    try {
      let res = await MyAPI.GET('/travelEssentials', token)
      let { success, message, error, travelEssentials } = res.data || res
      if (success) {
        setTravelEssenData(travelEssentials)
      } else {
        MyError.error(message || error || 'Server Error Please try again later.')
      }
    } catch (error) {
      MyError.error(error.message)
    }
  }

  useEffect(() => {
    if (travelEsenData && travelEsenData.length > 0) {
      setTravelEssen(travelEsenData[0].html)
      setTravelEssenId(travelEsenData[0]._id)
    }
  }, [travelEsenData])

  useEffect(() => {
    fetchTravelEssentials()
  }, [token])

  const handleAddTravelEssentials = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.POST('/travelEssentials', { html: travelEsen }, token)
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

  const handleUpdateTravelEssential = async () => {
    setLoading(true)
    try {
      let res = await MyAPI.PUT(`/travelEssentials/${travelEsenId}`, { html: travelEsen }, token)
      let { message, error, success } = res.data || res
      if (success) {
        fetchTravelEssentials()
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
        <h6 className="poppins">Travel Essentials</h6>
      </Col>
      <Col md={12} className="mt-4">
        <ReactQuill
          value={travelEsen}
          onChange={setTravelEssen}
          modules={modules}
          formats={formats}
        />
      </Col>
      <Col className="mt-2 mb-2">
        <Button
          onClick={travelEsenId ? handleUpdateTravelEssential : handleAddTravelEssentials}
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

export default TravelEssentials
