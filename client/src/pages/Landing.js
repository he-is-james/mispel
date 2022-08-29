import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { redirect } from '../utils/routerUtils';

function Landing({socket}) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [usernameForm, setUsernameForm] = useState(location.state ? location.state.playerName : '');
  const [roomIDForm, setRoomIDForm] = useState(params.roomID || '');
  useEffect(() => {
    socket.on('room-id-taken', () => {
      alert('room id taken');
    })
    socket.on('room-id-available', (data) => {
      redirect('create-room', navigate, 
        {state: {
          roomID: data.roomID,
          playerName: data.playerName,
          isHost: true,
        }}
      );
    })
    socket.on('room-does-not-exist', () => {
      alert('room does not exist');
    })
    socket.on('room-does-exist', (data) => {
      socket.emit('check-name', {
        roomID: data.roomID,
        playerName: data.playerName
      });
    })
    socket.on('name-taken', () => {
      alert('name taken');
    })
    socket.on('name-available', (data) => {
      redirect('waiting-room', navigate, 
        {state: {
          roomID: data.roomID,
          playerName: data.playerName,
          isHost: false,
        }}
      );
    })

    return () => {
      socket.removeAllListeners();
    }
  }, []);

  const onJoin = () => {
    // redirect('join-room', navigate, 
    //   {state: {
    //     playerName: usernameForm,
    //   }}
    // );
    socket.emit('does-room-exist', {
      roomID: roomIDForm,
      playerName: usernameForm,
      isCreating: false,
    })
  }

  const onCreate = () => {
    // redirect('create-room', navigate, 
    //   {state: {
    //     playerName: usernameForm,
    //   }}
    // );
    socket.emit('does-room-exist', {
      roomID: roomIDForm,
      playerName: usernameForm,
      isCreating: true,
    });
  }

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsernameForm(event.target.value);
  }

  const handleRoomIDChange = (event) => {
    event.preventDefault();
    setRoomIDForm(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <div className="mt-6">
        <label className="text-3xl">
          Enter Your Username:<br/>
        </label>
        <input value = {usernameForm} onChange = {handleUsernameChange} type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-[75%] h-12 rounded-md focus:outline-none"/><br/>
        <label className="text-3xl">
          Enter Room Name:<br/>
        </label>
        <input value = {roomIDForm} onChange = {handleRoomIDChange} type="text" name="room" className="text-center text-3xl bg-gray-400 mt-6 w-[75%] h-12 rounded-md focus:outline-none"/>
      </div>
      <div className="flex flex-row space-x-6">
        <button disabled = {usernameForm === ''} onClick = {onJoin} className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-sky">Join Room</button>
        <br/>
        <button disabled = {usernameForm === ''} onClick = {onCreate} className="bg-navy text-4xl py-2 px-5 mt-8 rounded-md hover:bg-sky">Create Room</button>
      </div>
    </div>
  );
}
export default Landing;
