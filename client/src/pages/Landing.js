import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing({redirect}) {
  const navigate = useNavigate();
  const [usernameForm, setUsernameForm] = useState('');

  const onJoin = () => {
    redirect('join-room', navigate, 
      {state: {
        playerName: usernameForm,
      }}
    );
  }

  const onCreate = () => {
    redirect('create-room', navigate, 
      {state: {
        playerName: usernameForm,
      }}
    );
  }

  const handleChange = (event) => {
    event.preventDefault();
    setUsernameForm(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <div className="mt-6">
        <label className="text-3xl">Enter Your Username:<br/></label>
        <input value = {usernameForm} onChange = {handleChange} type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-[75%] h-12 rounded-md focus:outline-none"/>
      </div>
      <div className="flex flex-row space-x-6">
        <button disabled = {usernameForm === ''} onClick = {onJoin} className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-sky">Join Room</button>
        <br/>
        <button disabled = {usernameForm === ''} onClick = {onCreate} className="bg-navy text-4xl py-2 px-5 mt-8 rounded-md hover:bg-sky">Create Room</button>
      </div>
    </div>
  );
}
export default Landing;
