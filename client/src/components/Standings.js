
function Standings() {

  return (
    <div className="flex justify-center text-4xl mt-20 mb-auto space-x-12">
      <div className="flex basis-1/3 grow">
        <div className="flex flex-col justify-end">
          <label className="">2nd Place</label>
          <div className="flex bg-silver h-[25rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
      <div className="flex basis-1/3 grow">
        <div className="flex flex-col justify-end">
          <label>1st Place</label>
          <div className="flex bg-gold h-[30rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
      <div className="flex basis-1/3 grow">
        <div className="flex flex-col justify-end">
          <label>3rd Place</label>
          <div className="flex bg-bronze h-[20rem] w-25 rounded-md"/>
          <label>Name1</label>
        </div>
      </div>
    </div>
  );
}

export default Standings;