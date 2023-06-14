import React from 'react'
import Message from './Message'
import { Button, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const NewRequestId = ({requestId}) => {
  const navigate=useNavigate()
  return (
    <Message>
         <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>NEW REQUEST ID GENERATED</Card.Title>
        <Card.Text>
          {requestId}
        </Card.Text>
        <Button variant="primary" onClick={()=>{
          navigate(`/status/${requestId}`)
        }}>Check Status</Button>
      </Card.Body>
    </Card>

    </Message>
  )
}

export default NewRequestId