
function PlayerCard(props) {
  return (
    <div className="flex flex-row text 4xl">
      <label className="flex grow justify-start">{props.name}</label>
      <label className="flex grow justify-end">{props.score}</label>
    </div>
  );
}

export default PlayerCard;