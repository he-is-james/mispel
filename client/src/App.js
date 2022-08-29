import Landing from './pages/Landing';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import Leaderboard from './pages/Leaderboard'
import Podium from './pages/Podium'
import {io} from 'socket.io-client';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// const socket = io('http://localhost:5000');
function App() {
  const [socket, setSocket] = useState(io(`http://${window.location.hostname}:5000`));
  window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = '/';
    }, 0); 
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing socket = {socket}/>} />
          <Route path="/:roomID" element={<Landing socket = {socket}/>} />
          <Route path="create-room" element={<CreateRoom socket = {socket}/>} />
          <Route path="join-room" element={<JoinRoom socket = {socket}/>} />
          <Route path="waiting-room" element={<WaitingRoom socket = {socket}/> } />
          <Route path="game-room" element={<GameRoom socket = {socket}/>} />
          <Route path="leaderboard" element={<Leaderboard socket = {socket}/>} />
          <Route path="podium" element={<Podium socket = {socket}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
