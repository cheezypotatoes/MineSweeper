import "../assets/css/EventInstance.css"
import PropTypes from 'prop-types';

const EventInstance = ({ id, index, isBomb, timeStamp, type, automatic }) => {
    return (
        <div className="EventInstanceContainer">
            <h1 className="TypeText">Type: {type}</h1>
            <h1 className="DataText">Index: {index}</h1>
            <h1 className="DataText" style={{ color: isBomb ? "red" : "green" }}>Bomb: {isBomb ? "true" : "false"}</h1>
            <h1 className="DataText">Automatic: {automatic ? "true" : "false"}</h1>
            <h1 className="DataText">TimeStamp: {timeStamp}</h1>
            <h1 className="DataText">Id: {id}</h1>
        </div>
    );
};

EventInstance.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isBomb: PropTypes.bool.isRequired,
    timeStamp: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    automatic: PropTypes.bool.isRequired,
};

export default EventInstance;