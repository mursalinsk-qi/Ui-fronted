import React, { useState } from 'react'
import { Button,Container, Form} from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import TripList from "../components/TripList";
const Trip = () => {
    const [sourceId, setSourceId] = useState('')
    const [error,setError]=useState('');
    const [trips,setTrips]=useState([]);
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')
        setTrips([])
        if (sourceId===''){
            setError('please enter source id')
            return
        }
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_FMDP_API}/trips/devices/${sourceId}`)
            if (data.length > 0){
                setTrips(data[0].trip_data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Form className='mt-5'>
                {error && <Message variant='danger'>{error}</Message>}
                <Form.Group className="mb-3" controlId="source_id">
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control type="text" name='source_id' onChange={(e)=>setSourceId(e.target.value)} />
                    <Button type='submit'variant="outline-dark" onClick={handleSubmit} className='mt-2'>Get Trips</Button>
                </Form.Group>
                {trips==null ? <h3>No trips found</h3> : <>{trips.length> 0 && <TripList trips={trips}/>}</>}

            </Form>
        </Container >
    )
}

export default Trip