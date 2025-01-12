 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index } ) {
    const Index = useRef(index)

    return (
        <div className="Tile" onClick={() => {eventBus.emit("TilePressed", {index: Index.current})}}>

        </div>
    )
}

export default Tile;