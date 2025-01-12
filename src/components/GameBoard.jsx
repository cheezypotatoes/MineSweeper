/* eslint-disable no-unused-vars */
import "../assets/css/GameBoard.css"
import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";
import { eventBus } from "../GameScripts/EventBus"

function GameBoard() {
    const GameBoard = useRef(null)
    const [tiles, setTiles] = useState([])
    const [tilesSize] = useState([3, 3])

    
    // Renders twice due to development mode
    useEffect(() => {
        GameBoard.current.style.gridTemplateColumns = `repeat(${tilesSize[0]}, 1fr)`;
        GameBoard.current.style.gridTemplateRows = `repeat(${tilesSize[1]}, 1fr)`;
        let bombSet = eventBus.emit("GenerateBombs", {max: tilesSize[1] * tilesSize[0], amount: 5});
        console.log(bombSet)
        
        
        
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