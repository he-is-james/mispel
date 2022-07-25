import { useState } from 'react';

function CreateRoom() {
  const [isCustom, setIsCustom] = useState(false);

  const handleCustom =()=> {
    const newState = !isCustom;
    setIsCustom(newState);
  }

  return (
    <div className="flex flex-col items-center bg-navy font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl align-top mt-20">Set Up Your Game</div>
      <div className="text-5xl mt-20">Timer</div>
      <div className="flex flex-row items-center text-4xl mt-4">
        <button className="py-2 px-2 mr-8 rounded-sm hover:bg-sky focus:bg-sky">10s</button>
        <button className="py-2 px-2 mr-8 rounded-sm hover:bg-sky focus:bg-sky">15s</button>
        <button className="py-2 px-2 mr-8 rounded-sm hover:bg-sky focus:bg-sky">30s</button>
        <button className="py-2 px-2 mr-8 rounded-sm hover:bg-sky focus:bg-sky">60s</button>
        <button onClick={handleCustom} className="py-2 px-2 rounded-sm hover:bg-sky focus:bg-navy">Custom</button>
        {isCustom ? 
            <input type="numbers" name="name" className="text-3xl text-center bg-gray-400 ml-2 w-24 h-12 rounded-md focus:outline-none"/>: <></>
        }
      </div>
      <div className="flex flex-row flex-wrap justify-center mt-20 w-2/3">
        <div className="text-5xl">Max Players:</div>
        <input type="numbers" name="name" className="text-center text-3xl bg-gray-400 w-32 h-12 ml-4 rounded-md focus:outline-none"/>
      </div>
      <button className="bg-orange text-3xl py-2 px-7 mt-20 rounded-md hover:bg-green">Create Room</button>
    </div>
  );
}

export default CreateRoom;