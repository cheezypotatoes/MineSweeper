import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus"

function GameBoard() {
    const GameBoard = useRef(null);
    const [tiles, setTiles] = useState([]);
    const [tilesSize,] = useState([9, 9]); // TODO: Causes crash if change directly, make a safe way to change by removing elements in state such as dugTileSet.
    const [dugTileSet, setDugTileSet] = useState(new Set())
    const [dugTilesEvent, setDugTilesEvent] = useState([]);
    const [flaggedTileEvent, setFlaggedTileEvent] = useState([]);
    const [flaggedTileSet, setFlaggedTileSet] = useState(new Set());


    // TODO: Auto tile removal must not include flagged tiles
    // TODO: Make tiles adjust properly depending on the size to avoid overflow
    // TODO: Huge bomb?

    // TODO: MORE TEST

    const PreventDefault = (e) => {
        e.preventDefault();
    };

    const handleAutomaticallyUncoveredTiles = () => {
        const event = eventBus.emit("ReturnSpecificProjectionEvents", {ProjectionType: "UncoveredTile"})
        setDugTileSet((prevSet) => {
            const updatedSet = new Set(prevSet);
            for (const tile of event) {
                updatedSet.add(tile.index);
            }
            return updatedSet;
          });
    }


    // Change dug tiles event if the event changes
    useEffect(() => {
        let latestEvent = dugTilesEvent[dugTilesEvent.length - 1];
        if (latestEvent === undefined) {return;}
        let latestEventIndex = latestEvent;
        setDugTileSet(prevSet => new Set(prevSet).add(latestEventIndex));
    }, [dugTilesEvent]);

    // Change flagged tiles event if the event changes
    useEffect(() => {  
        setFlaggedTileSet(new Set(flaggedTileEvent))    
    }, [flaggedTileEvent])

  
    // Set board size
    useEffect(() => {
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        eventBus.emit("SetBoardSize", {height: tilesSize[0], width: tilesSize[1]});
    }, [tilesSize])


    // If the size, setOfDugTiles Changes, then re-display the tiles on the board
    useEffect(() => {
        const UpdateUncoveredEvents = () => {
            const newEvent = eventBus.emit("ReturnNewSpecificProjectionEventIndexOnly", { ProjectionType: "UncoveredTile" });
            setDugTilesEvent(prevEvents => [...prevEvents, newEvent]);
            handleAutomaticallyUncoveredTiles();
        }

        const UpdateFlagEvents = () => {
            const newEvent = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnProjectionLatestSnapshot"});
            const newArray = Array.from(newEvent, ([key]) => key);
            setFlaggedTileEvent(newArray);
        }

        const tilesAmount = tilesSize[1] * tilesSize[0];
        const tiles = [];

        for (let i = 0; i < tilesAmount; i++) {
            let isDug = dugTileSet.has(i)? true : false
            let isFlagged = flaggedTileSet.has(i)? true : false
            
            tiles.push(<Tile key={i} index={i} isFlag={isFlagged} uncovered={isDug} UpdateUncoveredEvents={UpdateUncoveredEvents} UpdateFlagEvents={UpdateFlagEvents}/>);
        }

        setTiles(tiles)
    }, [dugTileSet, tilesSize, flaggedTileSet]);

    useEffect(() => {
        eventBus.emit("GenerateBombs", {amount: 40})
    }, [])

    
    return (
        <div id="GameBoard" ref={GameBoard} onContextMenu={PreventDefault}>
            {tiles}
        </div>
    )
}

export default GameBoard;