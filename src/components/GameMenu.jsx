/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../assets/css/GameMenu.css'

export default function GameMenu({gameStatus}) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (gameStatus === "Win") {
      setShowMenu(true);
    } else if (gameStatus === "Lost") {
      setShowMenu(true);}
  }, [gameStatus]);


  return (
    <div id='GameMenuBackground' style={{display: showMenu ? "block" : "none"}}>
      <h1 id='GameStatusText'>Game Status</h1>
      <h2 id='GameStatusText'>{gameStatus}</h2>
    </div>
  );
}