/* eslint-disable no-unused-vars */
 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useEffect, useRef } from "react"

import { eventBus } from "../GameScripts/EventBus"


function Tile( { index, isFlag, uncovered, UpdateEvent,} ) {
    const Index = useRef(index);
    const TileStatus = useRef();

    const TilePressed = (e) => {
        if (uncovered) {return}

        if (e.type === "click") {
            eventBus.emit("TilePressed", {index: Index.current})
            UpdateEvent();
            eventBus.emit("CreateEventForTilesWithZeroAdjacentCheckQueue");
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            eventBus.emit("CreateFlagEvent", {index: Index.current});
        }
    }

    useEffect(() => {
        if (uncovered) {
            let isBomb = eventBus.emit("CheckIfIndexIsBomb", {index: index});
            TileStatus.current.textContent = isBomb ? "💣" : eventBus.emit("GetAdjacentNumber", {index: index});
        }
    }, [uncovered, index])

    

   
    return (
        <div className={`Tile ${uncovered ? 'revealed' : 'uncovered'}`}  onClick={TilePressed} onContextMenu={TilePressed}>
            <h1 className="TestTileText" ref={TileStatus}></h1> 
        </div>
    )
}

export default Tile;