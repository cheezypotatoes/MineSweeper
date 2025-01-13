/* eslint-disable no-unused-vars */
import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus"
import { MineSweeper } from "../GameScripts/Game";

function GameBoard() {
    const GameBoard = useRef(null);
    const [tiles, setTiles] = useState([]);
    const [tilesSize, setTileSize] = useState([3, 3]);
    const [dugTileSet, setDugTileSet] = useState(new Set())
    const [dugTilesEvent, setDugTilesEvent] = useState(
        [
            { index: 5 },
            { index: 1 },
            { index: 7 },
        ]
    );

    // TODO: Make tiles adjust properly depending on the size to avoid overflow
    // TODO: Make tiles generate events by finishing the event store
    // TODO: Make check for new events when tile is pressed (Suggestion, make a parent function that tiles can call)
    // TODO: Make bomb checker

    // Change dug tiles event if the event changes
    useEffect(() => {
        const newSet = new Set(dugTilesEvent.map(event => event.index));
        setDugTileSet(newSet);
    }, [dugTilesEvent]);
    
    // Set board size
    useEffect(() => {
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        MineSweeper.setHeightWidth({ height: tilesSize[0], width: tilesSize[1] }) 
    }, [tilesSize])

    // If the size, setOfDugTiles Changes, then re-display the tiles on the board
    useEffect(() => {
        const tilesAmount = tilesSize[1] * tilesSize[0];
        const tiles = [];

        for (let i = 0; i < tilesAmount; i++) {
            let isDug = dugTileSet.has(i)? true : false
            tiles.push(<Tile key={i} index={i} isFlag={false} isDug={isDug}/>);
        }

        setTiles(tiles)
    }, [dugTileSet, tilesSize]);

    
    return (
        <div id="GameBoard" ref={GameBoard} onClick={() => {setTileSize([13, 13])}}>
            {tiles}
        </div>
    )
}

export default GameBoard;