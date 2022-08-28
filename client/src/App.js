import Landing from './pages/Landing';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import Leaderboard from './pages/Leaderboard'
import Podium from './pages/Podium'
import {io} from 'socket.io-client';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// const socket = io('http://localhost:5000');
function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = '/';
    }, 0); 
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
  }
  const redirect = (path, navigate, state) => {
    navigate(`/${path}`, state);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing socket = {socket} redirect = {redirect}/>} />
          <Route path="/:roomID" element={<Landing socket = {socket} redirect = {redirect}/>} />
          <Route path="create-room" element={<CreateRoom socket = {socket} redirect = {redirect}/>} />
          <Route path="join-room" element={<JoinRoom socket = {socket} redirect = {redirect}/>} />
          <Route path="waiting-room" element={<WaitingRoom socket = {socket} redirect = {redirect}/> } />
          <Route path="game-room" element={<GameRoom socket = {socket} redirect = {redirect}/>} />
          <Route path="leaderboard" element={<Leaderboard socket = {socket} redirect = {redirect}/>} />
          <Route path="podium" element={<Podium socket = {socket} redirect = {redirect}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
