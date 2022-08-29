import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SettingButton from '../components/SettingButton';


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

  const [active, setActive] = useState(3);
  const [round, setRound] = useState(3);
  const [isCustom, setIsCustom] = useState(false);

  const times = ['3s', '5s', '10s', '15s', '20s'];
  const rounds = ['5', '10', '15', '20', '25']

  const handleCustom = () => {
    setIsCustom((custom) => !custom);
    setRound(-1);
  }

  return (
    <div className="flex flex-col bg-navy min-h-screen font-rubikone text-white">
      <div className="items-start mt-12 ml-16 mr-16">
        <label className="text-4xl">Mispel</label>
        <div className="text-7xl align-top mt-10">Set Up Your Game</div>
      </div>
      <div className="flex grow flex-col justify-center text-center">
        <div className="text-4xl">
          <label>Timer</label>
          <div className="flex-row">
            {times.map((time, index) => <SettingButton text={time} active={active===index} onClick={() => setActive(index)}/>)}
          </div>
          <div className="mt-8">Rounds</div>
          <div className="flex-row">
            {rounds.map((roundNumber, index) => <SettingButton text={roundNumber} active={round===index} onClick={() => setRound(index)}/>)}
            <button onClick={handleCustom} className="py-2 px-2 rounded-sm hover:bg-sky">Custom</button>
              {isCustom ? <input type="numbers" name="name" className="text-3xl text-center bg-gray-400 ml-2 w-24 h-12 rounded-md focus:outline-none"/>: <></>}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-6 mb-12 ml-16 mr-16 items-start">
        <button className="bg-orange text-4xl py-2 px-7 rounded-md hover:bg-sky">Back</button>
        <div className="flex grow justify-end">
          <button onClick = {handleCreateRoom} className="bg-orange text-4xl py-2 px-7 rounded-md hover:bg-sky">Create Room</button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
