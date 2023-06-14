import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const TripMap = () => {
    const [trip, setTrip] = useState({});
    const {trip_id}=useParams()
    useEffect(() => {
        const fetchTrip=async ()=>{
            const {data} = await axios.get(`http://localhost/v1/data/trips/trip/${trip_id}`)
            setTrip(data[0].trip_data[0]);
        }
       fetchTrip()
    }, []);

    return (
        <div>
            <h1>Trip Map Page</h1>
        </div>
    );
};
export default TripMap
