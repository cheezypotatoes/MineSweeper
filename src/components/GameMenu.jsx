/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import '../assets/css/GameMenu.css'

export default function GameMenu({gameStatus, setGameStatus, ResetGame, difficultyLevel, ChangeDifficulty}) {
  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState([]);
  const levelHeader = useRef(null);
  const [gameStatusMap,] = useState({
    Lost: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>You Lost</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtons'>
        <div className='GameMenuButton' onClick={() => {ResetGame(); setShowMenu(false);}}>RESTART</div>
        <div className='GameMenuButton' onClick={() => {setGameStatus("Menu")}}>MENU</div>
      </div>
    ],

    Win: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>You Won</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtons'>
        <div className='GameMenuButton' onClick={() => {ResetGame(); setShowMenu(false);}}>RESTART</div>
        <div className='GameMenuButton' onClick={() => {setGameStatus("Menu")}}>MENU</div>
      </div>
    ],

    Menu: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>MineSweeper</h1>,
      <h1 key="levelText" id='LevelText' ref={levelHeader}>Level 1{difficultyLevel}</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtonsLevelPicker'>
         <div className='GameMenuButton' onClick={() => {ArrowPressed({add: 1})}}>{"<"}</div>
         <div className='GameMenuButton' onClick={() => {ArrowPressed({add: -1})}}>{">"}</div>
      </div>,
      <div key="StartButton" className='GameMenuButton' id='StartButton'>Start</div>
    ]
  });

  const ArrowPressed = ({add}) => {
    ChangeDifficulty({add: add})
    levelHeader.current.textContent = `Level ${difficultyLevel}`; // Change to a number and add or find a different way
  }


  useEffect(() => {
    const ShowGameStatus = () => {
      setStatus(gameStatusMap[gameStatus])
    }


    ShowGameStatus();

    if (gameStatus !== "Playing") {
      setShowMenu(true);
    }
    
  }, [gameStatus, gameStatusMap, ResetGame]);



  return (
    <div id='GameMenuBackground' style={{display: showMenu ? "block" : "none"}}>
      {status}
    </div>
  );
}