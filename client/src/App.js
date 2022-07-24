import logo from './logo.svg';
import './App.css';
import audioCtx from './index';
import axios from 'axios';

function App() {
  const handleClick = () => {
    axios.get('/api/getSound').then((res) => {
      const source = audioCtx.createBufferSource();
      source.buffer = res.data;
      source.connect(audioCtx.destination);
      source.start();
    });
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick = {handleClick}>
          Play Sound
        </button>
      </header>
    </div>
  );
}

export default App;
