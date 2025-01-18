/* eslint-disable no-unused-vars */
 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useEffect, useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index, isFlag, uncovered, UpdateEvent,} ) {
    const Index = useRef(index);
    const TileStatus = useRef();

    const TilePressed = () => {
        if (uncovered) {return}

        eventBus.emit("TilePressed", {index: Index.current})
        UpdateEvent() // Grabs event from TileUncovered projection
        let isBomb = eventBus.emit("CheckIfIndexIsBomb", {index: index});
        // If it's not a bomb then get its number
        TileStatus.current.textContent = isBomb ? "💣" : "";
        eventBus.emit("Test")
    }

    useEffect(() => {
        if (uncovered) {
            TileStatus.current.textContent = eventBus.emit("GetAdjacentNumber", {index: index});
        }
    }, [uncovered, index])

    

   
    return (
        <div className={`Tile ${uncovered ? 'revealed' : 'uncovered'}`}  onClick={TilePressed}>
            <h1 className="TestTileText" ref={TileStatus}></h1> 
        </div>
    )
}

export default Tile;