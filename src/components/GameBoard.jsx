/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus/EventBus"

function GameBoard(
    { BombCount, setGameStatus, tiles, setTiles, tilesSize, dugTileSet, 
    setDugTileSet, dugTilesEvent, setDugTilesEvent, flaggedTileEvent,
    setFlaggedTileEvent, flaggedTileSet, setFlaggedTileSet}) {
    const GameBoard = useRef(null);

    // TODO: Starting menu
    // TODO: Level change system
    // TODO: MENU
    // TODO: Huge bomb?
    
    
    const PreventDefault = (e) => {
        e.preventDefault();
    };



    // Change dug tiles event if the event changes
    useEffect(() => {
        let latestEvent = dugTilesEvent[dugTilesEvent.length - 1];
        if (latestEvent === undefined) {return;}
        let latestEventIndex = latestEvent;
        setDugTileSet(prevSet => new Set(prevSet).add(latestEventIndex));
    }, [dugTilesEvent, setDugTileSet]);

    // Change flagged tiles event if the event changes
    useEffect(() => {  
        setFlaggedTileSet(new Set(eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "FlaggedTile", MethodName: "returnProjectionLatestSnapshotAsArray"})))    
    }, [flaggedTileEvent, setFlaggedTileSet])

  
    // Set board size
    useEffect(() => {
        setTiles([]);
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        eventBus.emit("SetBoardSize", {height: tilesSize[0], width: tilesSize[1]});
    }, [tilesSize, setTiles])


    // If the size, setOfDugTiles Changes, then re-display the tiles on the board
    useEffect(() => {
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

        const GameStatusCheck = () => {
            setGameStatus(eventBus.emit("returnGameStatus"));
        }

        const UpdateUncoveredEvents = () => {
            const newEvent = eventBus.emit("ReturnProjectionSpecialMethod", {ProjectionType: "UncoveredTile", MethodName: "returnLatestEventIndexOnly"});
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
    }, [dugTileSet, tilesSize, flaggedTileSet, 
        setGameStatus, setDugTileSet, setDugTilesEvent, 
        setFlaggedTileEvent, setTiles]);

    useEffect(() => {
        eventBus.emit("GenerateBombs", {amount: BombCount.current})
    }, [BombCount])

    
    return (
        <div id="GameBoard" ref={GameBoard} onContextMenu={PreventDefault}>
            {tiles}
        </div>
    )
}

export default GameBoard;