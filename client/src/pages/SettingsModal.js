import { useState } from 'react';
import SettingsButton from '../components/SettingsButton';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/room'
});

function SettingsModal() {
  const [timeActive, setTimeActive] = useState(0);
  const [wordCountActive, setWordCountActive] = useState(0);
  const times = [10, 15, 30, 60];
  const wordCounts = [5,10,15,20];

  const saveSettings = () => {
    client.post('/update-room-settings', {
      roomID: 'rip',
      wordsCount: wordCountActive,
      timeLimit: timeActive
    });
  };

  return (
    <div className="bg-navy font-rubikone text-white p-6">
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl align-top mt-10 mb-10">Settings</div>
        <div className="flex-row flex-wrap justify-center mt-10">
          <div className="text-3xl">Timer</div>
          <div className="flex-row items-center text-4xl mt-4">
            {times.map((time, index) => <SettingsButton key= {index} content={`${time}s`}active={timeActive===index} onClick={() => setTimeActive(index)}/>)}
          </div>
        </div>
        <div className="flex-row flex-wrap justify-center mt-10">
          <div className="text-3xl">Number of Words:</div>
          <div className="flex-row items-center text-4xl mt-4">
            {wordCounts.map((count, index) => <SettingsButton key= {index} content={`${count}`} active={wordCountActive===index} onClick={() => setWordCountActive(index)}/>)}
          </div>
        </div>
        <button onClick={() => saveSettings()} className="bg-navy mt-20 text-4xl py-2 px-6 rounded-md hover:bg-sky">
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
