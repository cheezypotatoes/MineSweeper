import './assets/css/App.css'
import { useState } from 'react'
import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

function App() {
  const [gameStatus, setGameStatus] = useState("Playing");

  return (
    <div id="MainContainer">
        <div id='GameContainer'>
          <GameBoard setGameStatus={setGameStatus}/>
          <GameMenu gameStatus={gameStatus}/>
        </div>

        <div id='EventContainer'>

        </div>
    </div> 
  )
}

export default App
