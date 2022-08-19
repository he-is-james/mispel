import Landing from './pages/Landing';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom'
import WaitingRoom from './pages/WaitingRoom'
import GameRoom from './pages/GameRoom'
import Leaderboard from './pages/Leaderboard'
import Podium from './pages/Podium'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
