import { useEffect } from 'react';
import {io} from 'socket.io-client';

function JoinRoom() {
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('connect', () => {})
    socket.on('room-exist', () => {
      // TODO: redirect to waiting room
    })
    socket.on('room-dne', () => {
      // TODO: handle non-existant room
    })
  })

  const handleJoinRoom = () => {
    socket.emit('room-exist', { name: 'ShuDumb' })
  }

  return (
    <div className="flex flex-col items-center justify-center bg-sky font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <form className="mt-6">
        <label className="text-4xl">Enter Room Code:<br/></label>
        <input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-3/4 h-12 rounded-md focus:outline-none"/>
      </form>
      <button onClick={handleJoinRoom} className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-green">Join Room</button>
    </div>
  );
}

export default JoinRoom;
