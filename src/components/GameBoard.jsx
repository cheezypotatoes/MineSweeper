/* eslint-disable no-unused-vars */
import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus"
import { MineSweeper } from "../GameScripts/Game";

function GameBoard() {
    const GameBoard = useRef(null);
    const [tiles, setTiles] = useState([]);
    const [tilesSize] = useState([3, 3]);

    // TODO: Make tests
    // TODO: Grid must change and consume events
    // TODO: Make tiles generate events
    // TODO: Make check for new events when tile is pressed (Suggestion, make a parent function that tiles can call)
    // TODO: Make bomb checker
    
    // Renders twice due to development mode
    useEffect(() => {
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;

        MineSweeper.setHeightWidth({ height: tilesSize[0], width: tilesSize[1] })
        MineSweeper.GenerateBomb()
             
        const tilesAmount = tilesSize[1] * tilesSize[0];
        const tiles = [];

        for (let i = 0; i < tilesAmount; i++) {
            tiles.push(<Tile key={i} index={i}/>);
        }

        setTiles(tiles)
    }, [tilesSize])


    return (
        <div id="GameBoard" ref={GameBoard}>
            {tiles}
        </div>
    )
}

export default GameBoard;