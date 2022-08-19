import { useEffect, useState } from "react";
import {io} from 'socket.io-client';

function Name(name) {
  return (
    <div className="text-3xl font-rubikone text-center mt-4">{name}</div>
  )
}

function WaitingRoom() {
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('connect', () => {})
    socket.emit('player-join', { playerName: 'kevy' })
  })

  const [playerList, setPlayerList] = useState(['test', 'urmom', 'jimmy', 'sunbun', 'shaybay']);

  return (
    <div className="flex flex-col items-center bg-yellow font-rubikone text-center text-white min-h-screen">
      <div className=" mt-12 text-8xl">Mispel</div>
      <div className="text-7xl mt-12">Room Code: 1B3D5F<br/></div>
      <div class="relative flex py-5 items-center w-[90%]">
        <div class="flex-grow border-t border-2 border-white"></div>
      </div>
      <div className="flex flex-row w-[90%]">
        <div className="align-center text-5xl ">Players</div>
        <div className="flex flex-grow justify-end">
          <button className="bg-navy text-4xl py-2 px-6 rounded-md hover:bg-sky">Start</button>
        </div>
      </div>
      <div class="grid grid-cols-3 w-full mt-8">
        {playerList.map((name) => Name(name))}
      </div>
    </div>
  );
}

export default WaitingRoom;