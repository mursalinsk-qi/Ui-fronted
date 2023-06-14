import {Container, Table} from "react-bootstrap";
import React from "react";
import {FiMapPin} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

const TripList =({trips})=>{
    const navigate = useNavigate()
    const goTripMapPage=(trip)=>{
        navigate(`/trip/${trip.trip_id}`)
    }

    return (
        <>
            <Container className='mt-3'>
                <Table striped bordered hover size="sm" className='text-center'>
                    <thead>
                    <tr className='table-info'>
                        <th>Trip ID</th>
                        <th>Status</th>
                        <th>Map</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trips.length > 0 && trips.map(trip=>{
                        return(
                            <tr className='table-dark' key={trip.trip_id}>
                                <td>{trip.trip_id}</td>
                                <td>{trip.status}</td>
                                <td><FiMapPin onClick={()=>{
                                    goTripMapPage(trip)
                                }}/></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default TripList