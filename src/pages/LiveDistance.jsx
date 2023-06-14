import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import {IoReloadCircle} from 'react-icons/io5'
const LiveDistance = () => {
  const [trips, setTrips] = useState([])
  const fetchTrips=async()=>{
    const {data}=await axios.get("/trips/all")
      console.log(data)
    setTrips(data)
  }
  useEffect(() => {
    fetchTrips()
  }, [])
  const TableHead=()=>{
    return(
      <thead>
        <tr className='table-info'>
          <th>Device ID</th>
          <th>Distance</th>
          <th>Avarage Speed</th>
        </tr>
      </thead>
    )
  }
  return (
    <Container className='mt-3'>
      <div className='d-flex justify-content-between mb-2'>
      <h1 className>Live Distance Calculation</h1>
      <button type="button" class="btn btn-success" onClick={fetchTrips}><IoReloadCircle
      style={{'fontSize':'25px'}}
      /> Refresh</button>
      </div>
    <Table striped bordered hover size="sm" className='text-center'>
      <TableHead/>
      <tbody>
      {trips.length > 0 && trips.map(trip=>{
        const {source_id,distance,avg_speed}=trip
        return(
            distance &&
          <tr className='table-dark' key={source_id}>
          <td>{source_id}</td>
          <td>{distance &&  parseFloat(distance.toPrecision(2))} meter</td>
          <td>{avg_speed && avg_speed.toPrecision(4)}</td>
        </tr>
        )
      })}
        </tbody>
        </Table>
    </Container>
  )
}

export default LiveDistance