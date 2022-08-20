import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Name(name) {
  return (
    <div className="text-3xl font-rubikone text-center mt-4">{name}</div>
  )
}

function WaitingRoom({socket}) {
  const location = useLocation();
  const [isHost, setIsHost] = useState(location.state.isHost);
  const [playerList, setPlayerList] = useState([location.state.playerName]);
  useEffect(() => {
    socket.emit('player-join', {
      roomID: location.state.roomID,
      playerName: location.state.playerName,
      socketID: socket.id,
    });
    socket.on('player-join', (data) => {
      console.log('playerjoined');
      console.log(playerList);
      setPlayerList((playerList) => [...playerList, data.playerName]);
    });
    socket.on('sent-player-list', (data) => {
      setPlayerList((playerList) => [...data.playerList, ...playerList]);
    });
    socket.on('become-host', () => {
      setIsHost(true);
    });
    
    if (isHost) {
      socket.on('request-player-list', (data) => {
        setPlayerList((playerList) => {
          socket.emit('sent-player-list', {
            requesterID: data.requesterID,
            playerList: playerList
          });
          return playerList;
        })
      });
    }

    return () => {
      socket.off('sent-player-list');
      socket.off('player-join');
      socket.off('sent-player-list');
      socket.off('become-host');
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-yellow font-rubikone text-center text-white min-h-screen">
      <div className=" mt-12 text-8xl">Mispel</div>
      <div className="text-7xl mt-12">Room Code: {location.state.roomID}<br/></div>
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