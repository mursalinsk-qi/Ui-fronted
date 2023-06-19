import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios' 
import Message from '../components/Message'
import NewRequestId from '../components/NewRequestId'
const HistoricalDistance = () => {
  const [trackingDeviceDetails, setTrackingDeviceDetails] = useState({
    source_id: '',
    start_time: '',
    end_time: '',
    max_hdop: ''
  })
  const [error,setError]=useState('');
  const [requestId,setRequestId]=useState('');
  const handleFormInput = (e) => {
    const { name, value } = e.target
    setTrackingDeviceDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const convertToTime=(dateTime)=>{
    const localTime = new Date(dateTime);
    const timeMilliseconds = localTime.getTime()
    return timeMilliseconds
  }
  useEffect(() => {
    console.log(trackingDeviceDetails)
  }, [trackingDeviceDetails])
  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError('')
    setRequestId('')
    const {source_id,start_time,end_time,max_hdop}=trackingDeviceDetails
    if (!source_id || !start_time || !end_time || !max_hdop){
      setError('please fill all the feilds')
      return
    }
    const requestBody={...trackingDeviceDetails,
      max_hdop:parseFloat(max_hdop),
      start_time : convertToTime(start_time),
      end_time:convertToTime(end_time)
    }
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_DISTANCE_CALCULATION_HOST}/trips/calculate`,requestBody)
      setRequestId(data.request_id)
    } catch (error) {
      if (error.response){
        setError(error.response.data.message)
      }
    }
  }
  return (
    <Container>
      {requestId && <NewRequestId requestId={requestId}/>}
      <Form className='mt-5'>
        {error && <Message variant='danger'>{error}</Message>}
        <Form.Group className="mb-3" controlId="source_id">
          <Form.Label>Device ID</Form.Label>
          <Form.Control type="text" name='source_id' onChange={handleFormInput} />
        </Form.Group>
        <Row className="mb-4">
          <Col>
            <Form.Group className="mb-3" controlId="start_time">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" name='start_time' value={trackingDeviceDetails.start_time}onChange={handleFormInput} />
            </Form.Group>
            
          </Col>
        <Col>
          <Form.Group className="mb-3" controlId="end_time">
            <Form.Label>End Time</Form.Label>
            <Form.Control type="datetime-local" name='end_time' value={trackingDeviceDetails.end_time} onChange={handleFormInput}/>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="max_hdop">
        <Form.Label>Maximum Hdop value</Form.Label>
        <Form.Control type="number" name='max_hdop'className="form-control"  onChange={handleFormInput} />
      </Form.Group>
      <Button type='submit'variant="outline-dark" onClick={handleSubmit}>Calculate</Button>
    </Form>
    </Container >
  )
}

export default HistoricalDistance