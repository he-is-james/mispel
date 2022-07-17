
function Landing() {
  return (
    <div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <form className="mt-6">
        <label className="text-3xl">
          Enter Your Username:<br/>
        </label>
        <input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-3/4 h-12 rounded-md focus:outline-none"/>
      </form>
      <button className="bg-navy text-3xl py-2 px-10 mt-8 rounded-md hover:bg-sky">Join Room</button>
      <br/>
      <button className="bg-navy text-3xl py-2 px-7 mt-2 rounded-md hover:bg-sky">Create Room</button>
    </div>
  );
}

export default Landing;
