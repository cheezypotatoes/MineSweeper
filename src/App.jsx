import './assets/css/App.css'
import GameBoard from './components/GameBoard'
import GameMenu from './components/GameMenu'

function App() {
  

  return (
    <div id="MainContainer">
        <div id='GameContainer'>
          <GameBoard />
          <GameMenu />
        </div>

        <div id='EventContainer'>

        </div>
    </div> 
  )
}

export default App
