import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { IoReloadCircle } from 'react-icons/io5'
const LiveDistance = () => {
  const [trips, setTrips] = useState([])
  const fetchTrips = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DISTANCE_CALCULATION_HOST}/trips/all`)
      setTrips(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTrips()
  }, [])
  const TableHead = () => {
    return (
      <thead>
        <tr className='table-info'>
          <th>Device ID</th>
          <th>Distance</th>
          <th>Average Speed</th>
        </tr>
      </thead>
    )
  }
  return (
    <>
      <Container className='mt-3'>
        {trips.length === 0 ? <h1>No Trips</h1> : <>
        <div className='d-flex justify-content-between mb-2'>
          <h1 className>Live Distance Calculation</h1>
          <button type="button" class="btn btn-success" onClick={fetchTrips}><IoReloadCircle
            style={{ 'fontSize': '25px' }}
          /> Refresh</button>
        </div>
        <Table striped bordered hover size="sm" className='text-center'>
          <TableHead />
          <tbody>
            {trips.length > 0 && trips.map(trip => {
              const { source_id, distance, avg_speed } = trip
              return (
                distance &&
                <tr className='table-dark' key={source_id}>
                  <td>{source_id}</td>
                  <td>{distance && distance.toFixed(4)} meter</td>
                  <td>{avg_speed && avg_speed.toFixed(4)} Km/h</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        
        </>}
        
      </Container>
    </>
  )
}

export default LiveDistance