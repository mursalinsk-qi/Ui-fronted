import React, {  useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { IoReloadCircle } from 'react-icons/io5'
import Message from '../components/Message'
const RequestStatus = () => {
    const { request_id } = useParams()
    const [requestId, setRequestId] = useState(request_id || '')
    const [error,setError]=useState('');
    const [statusResult,setStatusResult]=useState(null)
    const fetchStatus = async () => {
        setError('')
        setStatusResult(null)
        try {
            const { data } = await axios.get(`/trips/status/${requestId}`)
            setStatusResult(data)
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message)
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchStatus()
    }
    return (
        <Container className='mt-2'>
            {error && <Message variant='danger'>{error}</Message>}
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group className="mb-3" controlId="start_time">
                            <Form.Control type="text" name='start_time' placeholder='enter request id' value={requestId}
                                onChange={(e) => setRequestId(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <button type="submit" class="btn btn-success" onClick={handleSubmit}><IoReloadCircle
                            style={{ 'fontSize': '25px' }}
                        /> Track Status</button>
                    </Col>
                </Row>
            </Form>

            {
                statusResult && <>
                <Row>
        <Col md={12}>
          <Card style={{ width: '55%' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{statusResult.request_id}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Device Id</Col>
                  <Col>{statusResult.source_id}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Distance</Col>
                  <Col>{statusResult.distance}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>{statusResult.status}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    </Row>
                </>
            }
        </Container>
    )
}

export default RequestStatus