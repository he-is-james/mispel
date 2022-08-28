import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Landing({redirect, roomID}) {
  const navigate = useNavigate();
  const params = useParams();
  const [usernameForm, setUsernameForm] = useState('');
  const [roomIDForm, setRoomIDForm] = useState(params.roomID || '');

  const onJoin = () => {
    redirect('join-room', navigate, 
      {state: {
        playerName: usernameForm,
      }}
    );
  }

  const onCreate = () => {
    redirect('create-room', navigate, 
      {state: {
        playerName: usernameForm,
      }}
    );
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
      <button disabled = {usernameForm === ''} onClick = {onJoin} className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-sky">Join Room</button>
      <br/>
      <button disabled = {usernameForm === ''} onClick = {onCreate} className="bg-navy text-4xl py-2 px-7 mt-2 rounded-md hover:bg-sky">Create Room</button>
    </div>
  );
}
export default Landing;
