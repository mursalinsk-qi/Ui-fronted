import React from 'react';
import { QIMapLoader } from "../components/QIMapLoader";
const TripMap = () => {
    return (
        <div className='map-container'>
            <QIMapLoader containerId="device-map-container"/>
        </div>
    );
};
export default TripMap
