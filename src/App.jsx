import './assets/css/App.css'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { eventBus } from './GameScripts/EventBus/EventBus'
import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'
import EventContainerGrid from './components/EventContainerGrid'

function App() {
  const [gameStatus, setGameStatus] = useState("Menu");
  const [tiles, setTiles] = useState([]);
  const [tilesSize, setTilesSize] = useState([10, 10]); // Direct change size when pressing causes crash
  // TODO: Uses array to force trigger a re-rendering, make it so that it not need an array
  const [dugTileSet, setDugTileSet] = useState(new Set())
  const [dugTilesEvent, setDugTilesEvent] = useState([]);
  const [flaggedTileEvent, setFlaggedTileEvent] = useState([]);
  const [flaggedTileSet, setFlaggedTileSet] = useState(new Set());
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const BombCount = useRef(10); // TODO: TESTING PURPOSES
  const DifficultyMap = useMemo(() => ({
    1: [[9, 9], 10],
    2: [[16, 16], 40],
    3: [[20, 20], 80]
  }), []);
  const [events, setEvents] = useState();

  const ResetGame = useCallback(() => {
    eventBus.emit("ResetEntireData")
    setDugTileSet(new Set());
    setDugTilesEvent([]);
    setFlaggedTileEvent([]);
    setFlaggedTileSet(new Set());
    eventBus.emit("GenerateBombs", {amount: BombCount.current});
  }, [])

  const ChangeDifficulty = ({add}) => {
    setDifficultyLevel(prev => {
        const newLevel = prev + add;
        if (newLevel > 3 || newLevel < 1) {
            return prev;
        }
        return newLevel;
    });
  };

  useEffect(() => {
    const difficultyData = DifficultyMap[difficultyLevel];
    setTilesSize(difficultyData[0])
    BombCount.current = difficultyData[1];

  }, [difficultyLevel, DifficultyMap])

  

  const updateEventVisual = useCallback(() => {
    const data = eventBus.emit("GetEventStoreEvents");
    setEvents(data);
    console.log("DATA:", data)
  }, []);

  
  

  return (
    <div id="MainContainer">
        <div id='GameContainer'>
          <GameBoard
           setGameStatus={setGameStatus} tiles={tiles} dugTileSet={dugTileSet} setDugTileSet={setDugTileSet}
           setTiles={setTiles} tilesSize={tilesSize}  dugTilesEvent={dugTilesEvent} setDugTilesEvent={setDugTilesEvent}
           flaggedTileEvent={flaggedTileEvent} setFlaggedTileEvent={setFlaggedTileEvent} flaggedTileSet={flaggedTileSet} 
           setFlaggedTileSet={setFlaggedTileSet} BombCount={BombCount} updateEventVisual={updateEventVisual}/>

          <GameMenu gameStatus={gameStatus} setGameStatus={setGameStatus} ResetGame={ResetGame}
          difficultyLevel={difficultyLevel} ChangeDifficulty={ChangeDifficulty}/>
        </div>

        <div id='EventContainer'>
          <h1 id='EventContainerText'>Events</h1>
          <EventContainerGrid events={events}/>
        </div>
    </div> 
  )
}

export default App
