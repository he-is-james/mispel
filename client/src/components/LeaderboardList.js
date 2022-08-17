
function LeaderboardList(props) {

  const createPlayerCard=(player, score)=> {
    return (
      <div className="flex flex-row justify-content text-white font-rubikone text-4xl w-[90%]">
        <label className="flex justify-start">{player}</label>
        <label className="flex grow justify-end">{score}</label>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      {props.playerList.map( player => createPlayerCard(player.name, player.score) )}
    </div>
  );
}

export default LeaderboardList;