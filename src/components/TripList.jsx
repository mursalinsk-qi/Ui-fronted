import { Container, Table } from "react-bootstrap";
import React from "react";
import { FaTimes } from 'react-icons/fa'
const TripList = ({ trips }) => {

    const Position = ({ pos }) => {
        return (
            <td>
                {
                    Object.keys(pos).length === 0 ? <FaTimes /> : `(${pos.lat} , ${pos.lng})`
                }

            </td>
        )
    }
    const Time = ({ time }) => {
        let localTime=null
        if (time){
            const date = new Date(time);
            const options = { timeZone: 'UTC' };
            localTime = date.toLocaleTimeString('en-US', options);
        }
        return (
            <td>
                {localTime ? localTime : <FaTimes />}
            </td>
        )
    }
    return (
        <>
            <Container className='mt-3'>
                <Table striped bordered hover size="sm" className='text-center'>
                    <thead>
                        <tr className='table-info'>
                            <th>Trip ID</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>Start Position</th>
                            <th>End Time</th>
                            <th>End Position</th>
                            <th>Max Speed</th>
                            <th>Average Speed</th>
                            <th>Total Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.length > 0 && trips.map(trip => {
                            return (
                                <tr className='table-dark' key={trip.trip_id}>
                                    <td>{trip.trip_id}</td>
                                    <td>{trip.status}</td>
                                    <Time time={trip.start_time} />
                                    <Position pos={trip.start_position} />
                                    <Time time={trip.end_time} />
                                    <Position pos={trip.end_position} />
                                    <td>{trip.max_speed}</td>
                                    <td>{trip.avg_speed}</td>
                                    <td>{trip.gps_distance}</td>

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