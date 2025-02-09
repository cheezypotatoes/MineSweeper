import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EventInstance from "./EventInstance";
import "../assets/css/EventContainerGrid.css"


const EventContainerGrid = ({ events }) => {
    
    const [event, setEvents] = useState([])

    useEffect(() => {
        if (events === undefined) {
            return
        }

        setEvents(events)
        console.log(events)
    },[setEvents, events])


    return (
        <div id='EventContainerGrid'> 
            {event.slice().reverse().map((evt, index) => (
                <EventInstance 
                    key={index}
                    id={evt.id}
                    index={evt.index}
                    isBomb={evt.isBomb}
                    timeStamp={evt.timeStamp}
                    type={evt.type}
                    automatic={evt.automaticUncovered}
                />
            ))}
        </div>
    );
};

EventContainerGrid.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            index: PropTypes.number.isRequired,
            isBomb: PropTypes.bool.isRequired,
            timeStamp: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            automaticUncovered: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default EventContainerGrid;