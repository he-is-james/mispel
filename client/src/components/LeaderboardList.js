
function LeaderboardList(props) {

  const createPlayerCard=(player, score)=> {
    return (
      <div className="flex text-5xl h-28 border-solid border-sky border-2 rounded-md">
        <label className="justify-start ml-8 mt-8">{player}</label>
        <label className="flex grow justify-end mr-8 mt-8">{score}</label>
      </div>
    );
  }

  return (
    <div className="flex-col space-y-3 overflow-y-scroll">
      {props.playerList.map( player => createPlayerCard(player.name, player.score) )}
    </div>
  );
}

export default LeaderboardList;