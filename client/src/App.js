import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {

  const handleClick = () => {
    // the blob and audio step only have to be done once 
    // maybe memoize like streams
    axios.get('http://localhost:5000/api/getSound').then((res) => {
      console.log(res);
      const blob =  new Blob([new Uint8Array(res.data.buffer.data)], {type: 'audio/wav'})
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play()
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={handleClick}>
          Play Sound
        </button>
        
      </header>
    </div>
  );
}

export default App;
