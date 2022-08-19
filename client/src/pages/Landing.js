import {Link} from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <div className="mt-6">
        <label className="text-3xl">
          Enter Your Username:<br/>
        </label>
        <input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-[75%] h-12 rounded-md focus:outline-none"/>
      </div>
      <Link to="join-room">
        <button className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-sky">Join Room</button>
      </Link>
      <br/>
      <Link to="create-room">
        <button className="bg-navy text-4xl py-2 px-7 mt-2 rounded-md hover:bg-sky">Create Room</button>
      </Link>
    </div>
  );
}
export default Landing;
