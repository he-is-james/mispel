import { useEffect, useState, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { redirect } from '../utils/routerUtils';

function WaitingRoom({socket}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [playerList, setPlayerList] = useState([location.state.playerName]);
  const [isHost, setIsHost] = useState(location.state.isHost);
  const playerListRef = useRef(playerList);

  useEffect(() => {
    if (location.state.isHost) {
      enableHostListeners();
    }
    else {
      socket.emit('player-join', {
        roomID: location.state.roomID,
        playerName: location.state.playerName,
        socketID: socket.id,
      });
    }

    socket.on('player-join', (data) => {
      setPlayerList((playerList) => {
        const newList = [...playerList, data.playerName];
        playerListRef.current = newList;
        return newList;
      });
    });

    socket.on('sent-player-list', (data) => {
      setPlayerList((playerList) => {
        const newList = [...data.playerList, ...playerList];
        playerListRef.current = newList;
        return newList;
      });
    });


    socket.on('become-host', () => {
      enableHostListeners();
      setIsHost(true);
    });

    socket.on('player-left', (data) => {
      console.log(`detected player ${data.playerName} left`);
      if (data.playerName === location.state.playerName) {
        navigate('/')
      }
      setPlayerList((playerList) => {
        const newList = playerList.filter((x) => x !== data.playerName);
        playerListRef.current = newList;
        return newList;
      });
    });

    socket.on('start-player', () => {
      moveToGameRoom(playerListRef.current);
    });

    return () => {
      socket.removeAllListeners();
    }
  }, []);

  const moveToGameRoom = (playerList) => {
    redirect('game-room', navigate,
      {state: {
        roomID: location.state.roomID,
        playerName: location.state.playerName,
        playerList: playerList,
        socketID: socket.id,
      }}
    );
  }

  const startGame = () => {
    socket.emit('start-game', {
      roomID: location.state.roomID,
    });
    moveToGameRoom(playerList);
  }

  const enableHostListeners = () => {
    console.log('became host');
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

  const kickPlayer = (name) => {
    socket.emit('player-kick', {
      playerName: name,
      roomID: location.state.roomID,
      senderID: socket.id,
    })
  }


  return (
    <div className="flex flex-col items-center bg-yellow font-rubikone text-center text-white min-h-screen">
      <div className=" mt-12 text-8xl">Mispel</div>
      <div className="text-7xl mt-12">Room Code: {location.state.roomID}<br/></div>
      <div className="flex flex-row w-[90%]">
        <div className="align-center text-5xl ">Players</div>
        {isHost &&
          <div className="flex flex-grow justify-end">
            <button className="bg-navy text-4xl py-2 px-6 rounded-md hover:bg-sky" onClick={startGame}>Start</button>
          </div>
        }
      </div>
      <div className="grid grid-cols-3 w-full mt-8">
        {playerList.map((name, key) => {
          return (
            <>
            <span>
            <div className="text-3xl font-rubikone text-center mt-4" key={key}>{name}</div>
            {isHost && name !== location.state.playerName && 
              <button onClick ={() => kickPlayer(name)} className='bg-red-600'> Kick </button> } 
            </span>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default WaitingRoom;
