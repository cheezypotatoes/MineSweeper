/* eslint-disable no-unused-vars */
 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index, isFlag, uncovered, UpdateEvent } ) {
    const Index = useRef(index)

    const TilePressed = () => {
        eventBus.emit("TilePressed", {index: Index.current})
        UpdateEvent() // Grabs event from TileUncovered projection
    }

    // TODO: BOMB AND FLAG IS GOING TO BE ON THE H1
    return (
        <div className={`Tile ${uncovered ? 'revealed' : 'uncovered'}`}  onClick={TilePressed}>
            <h1 className="TestTileText" ></h1> 
        </div>
    )
}

export default Tile;