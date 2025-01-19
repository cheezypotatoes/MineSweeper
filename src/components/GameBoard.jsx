import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus"

function GameBoard() {
    const GameBoard = useRef(null);
    const [tiles, setTiles] = useState([]);
    const [tilesSize,] = useState([15, 15]); // TODO: Causes crash if change directly, make a safe way to change by removing elements in state such as dugTileSet.
    const [dugTileSet, setDugTileSet] = useState(new Set())
    const [dugTilesEvent, setDugTilesEvent] = useState([]);

    // TODO: Make tiles adjust properly depending on the size to avoid overflow
    // TODO: Huge uncovering CONDITION FOR FIRST TILE UNCOVERED
    // TODO: Find a way to check all tiles per click and if all tiles around is uncovered then don't show numbers
    // TODO: Right clicking adds a flag that avoids uncovering.
    // TODO: Huge bomb?

    // TODO: MORE TEST

    // TODO: OPTIMIZE AND REFRACTOR
    const testing = () => {
        const event = eventBus.emit("ReturnSpecificProjectionEvents", {ProjectionType: "UncoveredTile"})
        
        setDugTileSet((prevSet) => {
            const newSet = new Set(prevSet);
            event.forEach((tile) => {
              if (!newSet.has(tile.index)) {
                newSet.add(tile.index); // Add index to the set
              }
            });
            return newSet;
          });
    }


    

    // Change dug tiles event if the event changes
    useEffect(() => {
        let latestEvent = dugTilesEvent[dugTilesEvent.length - 1];
        if (latestEvent === undefined) {return;}
        let latestEventIndex = latestEvent;
        setDugTileSet(prevSet => new Set(prevSet).add(latestEventIndex));
    }, [dugTilesEvent]);
    
    // Set board size
    useEffect(() => {
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        eventBus.emit("SetBoardSize", {height: tilesSize[0], width: tilesSize[1]});
    }, [tilesSize])

    // If the size, setOfDugTiles Changes, then re-display the tiles on the board
    useEffect(() => {
        // Update event by grabbing the latest event from projection
        const UpdateEvent = () => {
            const newEvent = eventBus.emit("ReturnNewSpecificProjectionEventIndexOnly", { ProjectionType: "UncoveredTile" });
            setDugTilesEvent(prevEvents => [...prevEvents, newEvent]);
            testing()
        }

        const tilesAmount = tilesSize[1] * tilesSize[0];
        const tiles = [];

        for (let i = 0; i < tilesAmount; i++) {
            let isDug = dugTileSet.has(i)? true : false
            //TODO: Make it return a function call that check if the index on this specific tile is flagged
            tiles.push(<Tile key={i} index={i} isFlag={false} uncovered={isDug} UpdateEvent={UpdateEvent}/>);
        }

        setTiles(tiles)
    }, [dugTileSet, tilesSize]);

    useEffect(() => {
        eventBus.emit("GenerateBombs", {amount: 50})
    }, [])

    
    return (
        <div id="GameBoard" ref={GameBoard}>
            {tiles}
        </div>
    )
}

export default GameBoard;