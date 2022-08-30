import React from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Timer from '../components/Timer';
import PlayButton from "../components/PlayButton";
import Player from "../utils/Player";

function GameRoom() {
	const location = useLocation();
	const [score, setScore] = useState(0);
	const [players, setPlayers] = useState(location.state.playerList.reduce((playersObj, player) => {
		return {
			...playersObj,
			[player]: new Player(player)
		}
	}, {}));
	console.log(players);
  return (
		<div className="flex flex-row bg-sky font-rubikone text-center text-white min-h-screen">
			<div className="flex basis-1/4 grow"/>
			<div className="flex basis-1/2 grow justify-center min-h-screen">
				<div className="flex flex-col items-center">
					<label className="text-5xl mt-8">Mispel</label>
					<label className="text-6xl mt-8 mb-8">Your word is:</label>
					<PlayButton class/>
					<label className="text-3xl mt-12">Enter your guess</label>
					<input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-2 w-3/4 h-12 rounded-md focus:outline-none"/>
					<button className="bg-navy text-4xl py-2 px-10 mt-8 rounded-md hover:bg-green">Submit</button>
				</div>
			</div>
			<div className="flex basis-1/4 grow justify-center min-h-screen">
				<div className="flex flex-col mt-12">
					<Timer />
					<label className="flex grow text-5xl items-end mb-12">Score: </label>
				</div>
			</div>
		</div>
	);
}

export default GameRoom;
