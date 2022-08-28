import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TimeButton from '../components/TimeButton';


function CreateRoom({socket, redirect}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackButton = () => {
    redirect('', navigate,
      {state: {
        playerName: location.state.playerName,
      }}
    );
  }
  const handleCreateRoom = () => {
    redirect('waiting-room', navigate,
      {state: {
        playerName: location.state.playerName,
        isHost: true,
        roomID: (Math.floor(Math.random() * 100)).toString()
      }}
    );
  }

  const [isCustom, setIsCustom] = useState(false);
  const [active, setActive] = useState(0);

  const handleCustom = () => {
    setIsCustom((custom) => !custom);
    setActive(-1);
  }

  const times = [10, 15, 30, 60];

  return (
    <div className="bg-navy min-h-screen font-rubikone text-white">
      <button onClick={handleBackButton} className="bg-orange text-4xl py-2 px-7 mt-20 ml-20 rounded-md hover:bg-sky">Back</button>
      <div className="flex flex-col items-center text-center">
        <div className="text-9xl align-top mt-20">Set Up Your Game</div>
        <div className="text-5xl mt-20">Timer</div>
        <div className="flex-row items-center text-4xl mt-4">
          {times.map((time, index) => <TimeButton key={index} time={time} active={active===index} onClick={() => setActive(index)}/>)}
          <button onClick={handleCustom} className="py-2 px-2 rounded-sm hover:underline">Custom</button>
          {isCustom ?
              <input type="numbers" name="name" className="text-3xl text-center bg-gray-400 ml-2 w-24 h-12 rounded-md focus:outline-none"/>: <></>
          }
        </div>
        <div className="flex-row flex-wrap justify-center mt-20 w-2/3">
          <div className="text-5xl">Max Players:</div>
          <input type="numbers" name="name" className="text-center text-3xl bg-gray-400 w-32 h-12 mt-4 ml-4 rounded-md focus:outline-none"/>
        </div>
        <button onClick = {handleCreateRoom} className="bg-orange text-4xl py-2 px-7 mt-20 rounded-md hover:bg-sky">Create Room</button>
      </div>
    </div>
  );
}

export default CreateRoom;
