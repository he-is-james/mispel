import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function JoinRoom({socket, redirect}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [roomIDForm, setRoomIDForm] = useState('');  
  const roomIDRef = useRef(roomIDForm);
  useEffect(() => {
    socket.on('room-exist', () => {
      // TODO: redirect to waiting room
      // setRoomIDForm((roomID) => {
      //   redirect('waiting-room', navigate, 
      //     {state: {
      //       roomID: roomID,
      //       playerName: location.state.playerName,
      //       isHost: false,
      //     }}
      //   );
      // });
      redirect('waiting-room', navigate, 
        {state: {
          roomID: roomIDRef.current,
          playerName: location.state.playerName,
          isHost: false,
        }}
      );
    })
    socket.on('room-dne', () => {
      // TODO: handle non-existent room
      alert('this room does not exist');
    })
  }, []);

  const handleJoinRoom = () => {
    socket.emit('find-room', { name: roomIDForm });
  }

  const handleChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    roomIDRef.current = newValue;
    setRoomIDForm(newValue);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-sky font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <form className="mt-6">
        <label className="text-4xl">Enter Room Code:<br/></label>
        <input value = {roomIDForm} onChange = {handleChange} type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-3/4 h-12 rounded-md focus:outline-none"/>
      </form>
      <button onClick={handleJoinRoom} className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-green">Join Room</button>
    </div>
  );
}

export default JoinRoom;
