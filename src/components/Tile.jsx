/* eslint-disable no-unused-vars */
 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index, isFlag, uncovered, UpdateEvent } ) {
    const Index = useRef(index);
    const TileStatus = useRef();

    const TilePressed = () => {
        eventBus.emit("TilePressed", {index: Index.current})
        UpdateEvent() // Grabs event from TileUncovered projection
        TileStatus.current.textContent = eventBus.emit("CheckIfIndexIsBomb", {index: index}) ? "💣" : '';
    }

    return (
        <div className={`Tile ${uncovered ? 'revealed' : 'uncovered'}`}  onClick={TilePressed}>
            <h1 className="TestTileText" ref={TileStatus}></h1> 
        </div>
    )
}

export default Tile;