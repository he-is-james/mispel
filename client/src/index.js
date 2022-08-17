import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import WaitingRoom from './pages/WaitingRoom';
import GameRoom from './pages/GameRoom';
import Leaderboard from './pages/Leaderboard';
import Podium from './pages/Podium';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="join-room" element={<JoinRoom />} />
        <Route path="waiting-room" element={<WaitingRoom />} />
        <Route path="game-room" element={<GameRoom />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="podium" element={<Podium />} />
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// export default audioCtx;