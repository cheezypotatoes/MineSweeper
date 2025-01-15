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

    return (
        <div className="Tile" onClick={TilePressed}>
            {uncovered ? <h1 className="TestTileText" >⛏️</h1> : <h1 className="TestTileText" >🟤</h1>}
        </div>
    )
}

export default Tile;