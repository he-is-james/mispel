

function JoinRoom() {
  return (
    <div className="flex flex-col items-center justify-center bg-sky font-rubikone text-center text-white min-h-screen">
      <div className="text-9xl">Mispel</div>
      <form className="mt-6">
        <label className="text-4xl">Enter Room Code:<br/></label>
        <input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-3/4 h-12 rounded-md focus:outline-none"/>
      </form>
      <button className="bg-navy text-3xl py-2 px-10 mt-8 rounded-md">Join Room</button>
    </div>
  );
}

export default JoinRoom;
