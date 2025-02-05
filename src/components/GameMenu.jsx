/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useMemo  } from 'react';
import '../assets/css/GameMenu.css'

export default function GameMenu({gameStatus, setGameStatus, ResetGame, difficultyLevel, ChangeDifficulty}) {
  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState([]);
  const levelHeader = useRef(null);
  const levelType = useMemo(
    () => ({ 1: "Beginner", 2: "Intermediate", 3: "Expert" }),
    []
  )


  const [gameStatusMap,] = useState({
    Lost: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>You Lost</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtons'>
        <div className='GameMenuButton' onClick={() => {ResetGame(); setShowMenu(false);}}>RESTART</div>
        <div className='GameMenuButton' onClick={() => {MenuPressed();}}>MENU</div>
      </div>
    ],

    Win: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>You Won</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtons'>
        <div className='GameMenuButton' onClick={() => {ResetGame(); setShowMenu(false);}}>RESTART</div>
        <div className='GameMenuButton' onClick={() => {MenuPressed();}}>MENU</div>
      </div>
    ],

    Menu: [
      <h1 key="title" className="GameStatusComponent" id='ResultText'>MineSweeper</h1>,
      <h1 key="levelText" id='LevelText' ref={levelHeader}>Difficulty {levelType[difficultyLevel]}</h1>,
      <div key="GameButtons"  className="GameStatusComponent" id='GameButtonsLevelPicker'>
         <div className='GameMenuButton' onClick={() => {ArrowPressed({add: -1}); ResetGame();}}>{"<"}</div>
         <div className='GameMenuButton' onClick={() => {ArrowPressed({add: 1}); ResetGame();}}>{">"}</div>
      </div>,
      <div key="StartButton" className='GameMenuButton' id='StartButton' onClick={() => {ResetGame(); setShowMenu(false); setGameStatus("Playing");}}>Start</div>
    ]
  });

  const ArrowPressed = ({add}) => {
    ChangeDifficulty({add: add})
  }

  const MenuPressed = (() => {
    setGameStatus("Menu"); 
    ArrowPressed({add: -1}); 
    ArrowPressed({add: -1}); 
    ArrowPressed({add: -1});
    ResetGame();
  })

  useEffect(() => {
    if (!levelHeader.current) {return}
    levelHeader.current.textContent = `Difficulty ${levelType[difficultyLevel]}`;
  }, [difficultyLevel, levelType])


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