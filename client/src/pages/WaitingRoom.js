import React, { useEffect, useState, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import { redirect } from '../utils/routerUtils';
import SettingsModal from './SettingsModal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0px',
    borderRadius: '5%',
    transform: 'translate(-50%, -50%)',
  },
};

const client = axios.create({
  baseURL: 'http://localhost:5000/room'
});


function WaitingRoom({socket}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeActive, setTimeActive] = useState(1);
  const [wordCountActive, setWordCountActive] = useState(2);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [playerList, setPlayerList] = useState([location.state.playerName]);
  const [isHost, setIsHost] = useState(location.state.isHost);
  const playerListRef = useRef(playerList);

  const saveSettings = async (wordCount, timeLimit) => {
    await client.patch('/update-room-settings', {
      roomID: location.state.roomID,
      wordsCount: wordCount,
      timeLimit: timeLimit
    });
  };

  useEffect(() => {
    if (location.state.isHost) {
      socket.emit('host-game', {
        roomID: location.state.roomID,
        playerName: location.state.playerName,
      });
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

  const moveToGameRoom = async (playerList) => {
    const result = await client.get('/info/', {
      params: {
        roomID: location.state.roomID
      }
    });
    const gameInfo = result.data;
    gameInfo.currentWordPosition = 0;
    redirect('game-room', navigate,
      {state: {
        roomID: location.state.roomID,
        playerName: location.state.playerName,
        playerList: playerList,
        socketID: socket.id,
        gameInfo: gameInfo,
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

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  }

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
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
      <div className=" mt-12 text-7xl">Mispel</div>
      <div className="text-6xl mt-4">Room Code: {location.state.roomID}<br/></div>
      <div className="flex flex-row w-[90%] mt-4">
        <div className="align-center text-5xl ">Players</div>
        {isHost &&
          <div className="flex flex-grow justify-end">
            <button className="bg-navy mr-4 text-4xl py-2 px-6 rounded-md hover:bg-sky" onClick={handleOpenSettings}>Settings</button>
            <button className="bg-navy text-4xl py-2 px-6 rounded-md hover:bg-sky" onClick={startGame}>Start</button>
          </div>
        }
      </div>
      <div className="py-2 w-[90%]"> 
        <div className="border-t border-2 border-white"/>
      </div>
      <div className="grid grid-cols-3 w-full mt-8 text-3xl">
        {playerList.map((name, key) => {
          return (
            <React.Fragment key = {key}>
              <span className="group">
              <div className="text-center mt-4 group-hover:block">{name}</div>
              {isHost && name !== location.state.playerName && 
              <button onClick ={() => kickPlayer(name)} className='bg-red-600 py-1 px-2 rounded opacity-0 group-hover:opacity-100'> Kick </button>}
              </span>
            </React.Fragment>
          )
        })}
      </div>
      <Modal
        isOpen={isSettingsModalOpen}
        onRequestClose={handleCloseSettings}
        style={customStyles}
        contentLabel="Shu gay Modal"
      >
        <SettingsModal
          setIsSettingsModalOpen = {setIsSettingsModalOpen}
          wordCountActive = {wordCountActive}
          setWordCountActive = {setWordCountActive}
          timeActive = {timeActive}
          setTimeActive = {setTimeActive}
          saveSettings = {saveSettings}
        />
      </Modal>
    </div>
  );
}

export default WaitingRoom;
