import './CreateRoom.css';
import { useState } from 'react';

function CreateRoom() {
  const [isCustom, setIsCustom] = useState(false);

  const handleCustom =()=> {
    const newState = !isCustom;
    setIsCustom(newState);
  }

  return (
    <div className="CreateRoom">
      <h1>Set Up Your Game</h1>
      <h3>Timer</h3>
      {isCustom ? 
      <div>
        <button>10s</button>
        <button>15s</button>
        <button>30s</button>
        <button>60s</button>
      </div> : <></>}
      
      <button onClick={handleCustom}>Custom: </button>
    </div>
  );
}

export default CreateRoom;
