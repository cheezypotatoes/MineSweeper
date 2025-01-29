/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus/EventBus"

function GameBoard({ setGameStatus }) {
    const GameBoard = useRef(null);
    const [tiles, setTiles] = useState([]);
    const [tilesSize,] = useState([10, 10]); // Direct change size when pressing causes crash
    // TODO: Uses array to force trigger a re-rendering, make it so that it not need an array
    const [dugTileSet, setDugTileSet] = useState(new Set())
    const [dugTilesEvent, setDugTilesEvent] = useState([]);
    const [flaggedTileEvent, setFlaggedTileEvent] = useState([]);
    const [flaggedTileSet, setFlaggedTileSet] = useState(new Set());
    const BombCount = useRef(2); // TODO: TESTING PURPOSES


    
    // TODO: Win or lose status check if all bomb are flagged (FINISH IT)
    // TODO: MOVE ALL useState and useRef to the app.jsx
    // TODO: Level change system
    // TODO: MENU
    // TODO: Huge bomb?
    

    // TODO: SET TIMEOUT IS TEMPORARY ALSO WILL CALL TWICE IF CLICK TILED WITH BOMB
    const ResetGame = () => {
        setTimeout(() => {
            eventBus.emit("ResetEntireData")
            setDugTileSet(new Set());
            setDugTilesEvent([]);
            setFlaggedTileEvent([]);
            setFlaggedTileSet(new Set());
            eventBus.emit("GenerateBombs", {amount: BombCount.current});
        }, 3000);
        
    }
    
    const PreventDefault = (e) => {
        e.preventDefault();
    };

    const handleAutomaticallyUncoveredTiles = () => {
        const event = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "UncoveredTile", MethodName: "returnEvents"});
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
        setFlaggedTileSet(new Set(eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnProjectionLatestSnapshotAsArray"})))    
    }, [flaggedTileEvent])

  
    // Set board size
    useEffect(() => {
        setTiles([]);
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        eventBus.emit("SetBoardSize", {height: tilesSize[0], width: tilesSize[1]});
    }, [tilesSize])


    // If the size, setOfDugTiles Changes, then re-display the tiles on the board
    useEffect(() => {
        const GameStatusCheck = () => {
            setGameStatus(eventBus.emit("returnGameStatus"));
        }


        const UpdateUncoveredEvents = () => {
            const newEvent = eventBus.emit("ReturnNewSpecificProjectionEventIndexOnly", { ProjectionType: "UncoveredTile" });
            setDugTilesEvent(prevEvents => [...prevEvents, newEvent]);
            handleAutomaticallyUncoveredTiles();
            GameStatusCheck();
           
        }

        const UpdateFlagEvents = () => {
            const newEvent = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnProjectionLatestSnapshot"});
            const newArray = Array.from(newEvent, ([key]) => key);
            setFlaggedTileEvent(newArray);
            GameStatusCheck();
        }

        const tilesAmount = tilesSize[1] * tilesSize[0];
        const tiles = [];

        for (let i = 0; i < tilesAmount; i++) {
            let isDug = dugTileSet.has(i)? true : false
            let isFlagged = flaggedTileSet.has(i)? true : false
            
            tiles.push(<Tile key={i} index={i} isFlag={isFlagged} uncovered={isDug} UpdateUncoveredEvents={UpdateUncoveredEvents} UpdateFlagEvents={UpdateFlagEvents}/>);
        }

        setTiles(tiles)
    }, [dugTileSet, tilesSize, flaggedTileSet, setGameStatus]);

    useEffect(() => {
        eventBus.emit("GenerateBombs", {amount: BombCount.current})
    }, [])

    
    return (
        <div id="GameBoard" ref={GameBoard} onContextMenu={PreventDefault}>
            {tiles}
        </div>
    )
}

export default GameBoard;