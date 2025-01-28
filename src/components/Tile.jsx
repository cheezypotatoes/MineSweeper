 /* eslint-disable react/prop-types */
import "../assets/css/Tile.css"
import { useEffect, useRef } from "react"

import { eventBus } from "../GameScripts/EventBus/EventBus"


function Tile( { index, isFlag, uncovered, UpdateUncoveredEvents, UpdateFlagEvents} ) {
    const Index = useRef(index);
    const TileStatus = useRef();

    const TilePressed = (e) => {
        if (uncovered || isFlag) {return}
        if (e.type === "click") {
            eventBus.emit("TilePressed", {index: Index.current})
            eventBus.emit("CreateEventForTilesWithZeroAdjacentCheckQueue");
            UpdateUncoveredEvents();
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            eventBus.emit("CreateFlagEvent", {index: Index.current});
            UpdateFlagEvents();
           
        }
    }

    //TODO: OPTIMIZED THIS FUNCTION
    const preventContextMenuOnH1 = (e) => {
        if (uncovered) {return}
        if (e.type === "click" && !isFlag) {
            eventBus.emit("TilePressed", {index: Index.current})
            UpdateUncoveredEvents();
            eventBus.emit("CreateEventForTilesWithZeroAdjacentCheckQueue");
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            eventBus.emit("CreateFlagEvent", {index: Index.current});
            UpdateFlagEvents();
           
        }
        
    };

    useEffect(() => {
        if (uncovered) {
            let isBomb = eventBus.emit("CheckIfIndexIsBomb", {index: index});
            TileStatus.current.textContent = isBomb ? "💣" : eventBus.emit("GetAdjacentNumber", {index: index});
        } else {
            TileStatus.current.textContent = isFlag ? "🚩" : "";
        }
    }, [uncovered, index, isFlag])

    

   
    return (
        <div className={`Tile ${uncovered ? 'revealed' : 'uncovered'}`}  onClick={TilePressed} onContextMenu={TilePressed}>
            <h1 className="TestTileText" ref={TileStatus} onContextMenu={preventContextMenuOnH1} onClick={preventContextMenuOnH1}></h1> 
        </div>
    )
}

export default Tile;