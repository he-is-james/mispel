import { useState } from 'react';

function WaitingRoom() {
  
  const [playerList, setPlayerList] = useState([]);

  return (
    <div className="WaitingRoom">
      <label>Room Code: <br/></label>
      <hr/>
      <label>Players</label>
      <button>Start</button>
      <div class="grid-container">
        <player>test</player>
      </div>
    </div>
  );
}

export default WaitingRoom;