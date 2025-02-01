import './assets/css/App.css'
import { useState, useRef, useCallback } from 'react'
import { eventBus } from './GameScripts/EventBus/EventBus'
import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

function App() {
  const [gameStatus, setGameStatus] = useState("Playing");
  const [tiles, setTiles] = useState([]);
  const [tilesSize,] = useState([10, 10]); // Direct change size when pressing causes crash
  // TODO: Uses array to force trigger a re-rendering, make it so that it not need an array
  const [dugTileSet, setDugTileSet] = useState(new Set())
  const [dugTilesEvent, setDugTilesEvent] = useState([]);
  const [flaggedTileEvent, setFlaggedTileEvent] = useState([]);
  const [flaggedTileSet, setFlaggedTileSet] = useState(new Set());
  const BombCount = useRef(10); // TODO: TESTING PURPOSES

  const ResetGame = useCallback(() => {
    eventBus.emit("ResetEntireData")
    setDugTileSet(new Set());
    setDugTilesEvent([]);
    setFlaggedTileEvent([]);
    setFlaggedTileSet(new Set());
    eventBus.emit("GenerateBombs", {amount: BombCount.current});
  }, [])
    

  return (
    <div id="MainContainer">
        <div id='GameContainer'>
          <GameBoard
           setGameStatus={setGameStatus} tiles={tiles} dugTileSet={dugTileSet} setDugTileSet={setDugTileSet}
           setTiles={setTiles} tilesSize={tilesSize}  dugTilesEvent={dugTilesEvent} setDugTilesEvent={setDugTilesEvent}
           flaggedTileEvent={flaggedTileEvent} setFlaggedTileEvent={setFlaggedTileEvent} flaggedTileSet={flaggedTileSet} 
           setFlaggedTileSet={setFlaggedTileSet} BombCount={BombCount}/>
          <GameMenu gameStatus={gameStatus} ResetGame={ResetGame}/>
        </div>

        <div id='EventContainer'>

        </div>
    </div> 
  )
}

export default App
