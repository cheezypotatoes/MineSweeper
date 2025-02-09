/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import EventInstance from "./EventInstance";
import "../assets/css/EventContainerGrid.css"


const EventContainerGrid = ({ events }) => {
    
    const [event, setEvents] = useState([])

    useEffect(() => {
        if (events === undefined) {
            return
        }

        setEvents(events)
    },[setEvents, events])


    return (
        <div id='EventContainerGrid'> 
            {event.map((evt, index) => (
                <EventInstance 
                    key={index}
                    id={evt.id}
                    index={index}
                    isBomb={evt.isBomb}
                    timeStamp={evt.timeStamp}
                    type={evt.type}
                />
            ))}
        </div>
    );
};

export default EventContainerGrid;