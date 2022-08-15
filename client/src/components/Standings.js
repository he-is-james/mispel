
function Standings() {

  return (
    <div className="flex flex-row justify-content justify-center text-5xl mt-20 mb-auto w-[90%]">
      <div className="flex grow justify-start">
        <div className="flex flex-col justify-end">
          <label className="">2nd Place</label>
          <div className="flex bg-silver h-[32.5rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
      <div className="flex grow justify-center">
        <div className="flex flex-col justify-end">
          <label>1st Place</label>
          <div className="flex bg-gold h-[40rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
      <div className="flex grow justify-end">
        <div className="flex flex-col justify-end">
          <label>3rd Place</label>
          <div className="flex bg-bronze h-[25rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
    </div>
  );
}

export default Standings