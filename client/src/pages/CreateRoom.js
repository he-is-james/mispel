
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
      <button>10s</button>
      <button>15s</button>
      <button>30s</button>
      <button>60s</button>
      <button onClick={handleCustom}>Custom: </button>
      {isCustom ? 
      <div>
        <input type="text" name="name" />
      </div> : <></>}
    </div>
  );
}

export default CreateRoom;
