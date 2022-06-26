import './Landing.css';

function Roomcode() {
  return (
    <div className="Landing">
      <h2>Mispel</h2>
      <form>
        <label>
          Enter Room Code:<br/>
        </label>
        <input type="text" name="name" />
      </form>
      <button>Join Room</button>
    </div>
  );
}

export default Roomcode;