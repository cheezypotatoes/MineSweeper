/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../assets/css/GameMenu.css'

export default function GameMenu({gameStatus, ResetGame}) {
  const [showMenu, setShowMenu] = useState(false);
  const [status, setStatus] = useState([]);
  const [gameStatusMap,] = useState({
    Lost: "YOU LOST!",
    Win: "YOU WON!",
  })

  
  
  useEffect(() => {
    const WinOrLoseStatus = () => {
      const GameCurrentStatus = [
        <h1 key="title" className="GameStatusComponent" id='ResultText'>{gameStatusMap[gameStatus]}</h1>,
        <div key="GameButtons"  className="GameStatusComponent" id='GameButtons'>
          <div className='GameMenuButton' onClick={() => {ResetGame(); setShowMenu(false);}}>RESTART</div>
          <div className='GameMenuButton' >MENU</div>
        </div>
      ];
      setStatus(GameCurrentStatus);
    }


    WinOrLoseStatus();

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