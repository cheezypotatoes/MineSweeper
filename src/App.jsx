import './assets/css/App.css'
import { useState, useRef } from 'react'
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
  const BombCount = useRef(2); // TODO: TESTING PURPOSES

  return (
    <div id="MainContainer">
        <div id='GameContainer'>
          <GameBoard
           setGameStatus={setGameStatus} tiles={tiles} dugTileSet={dugTileSet} setDugTileSet={setDugTileSet}
           setTiles={setTiles} tilesSize={tilesSize}  dugTilesEvent={dugTilesEvent} setDugTilesEvent={setDugTilesEvent}
           flaggedTileEvent={flaggedTileEvent} setFlaggedTileEvent={setFlaggedTileEvent} flaggedTileSet={flaggedTileSet} 
           setFlaggedTileSet={setFlaggedTileSet} BombCount={BombCount}/>
          <GameMenu gameStatus={gameStatus}/>
        </div>

        <div id='EventContainer'>

        </div>
    </div> 
  )
}

export default App
