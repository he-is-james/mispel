import './Landing.css';

function Landing() {
  return (
    <div className="Landing">
      <h2>Mispel</h2>
      <form>
        <label>
          Enter Your Username:<br/>
        </label>
        <input type="text" name="name" />
      </form>
      <button>Join Room</button>
      <br/>
      <button>Create Room</button>
    </div>
  );
}

export default Landing;
