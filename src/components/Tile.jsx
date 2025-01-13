/* eslint-disable no-unused-vars */
 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index, isFlag, isDug } ) {
    const Index = useRef(index)

    return (
        <div className="Tile" onClick={() => {eventBus.emit("TilePressed", {index: Index.current})}}>
            {isDug ? <h1 className="TestTileText" >⛏️</h1> : <h1 className="TestTileText" >🟤</h1>}
        </div>
    )
}

export default Tile;