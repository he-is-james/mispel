//import { useState } from "react";

function WaitingRoom() {
  
  //const [playerList, setPlayerList] = useState([]);

  return (
    <div className="flex flex-col items-center bg-orange font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl mt-20">Room Code: <br/></div>
      <div class="relative flex py-5 items-center w-[90%]">
        <div class="flex-grow border-t border-2 border-white"></div>
      </div>
      <div className="flex flex-row w-[90%]">
        <div className="align-left text-3xl">Players</div>
        <button className="bg-green text-3xl py-2 px-4 rounded-md hover:bg-navy">Start</button>
      </div>
      <div class="grid-container">
        <player>test</player>
      </div>
    </div>
  );
}

export default WaitingRoom;