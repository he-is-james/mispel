import React, {useEffect} from "react";
import { useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Timer from '../components/Timer';
import Options from '../components/Options';
import PlayButton from "../components/PlayButton";
import Player from "../utils/Player";
import {redirect} from "../utils/routerUtils";

function GameRoom({socket}) {
	const location = useLocation();
	const navigate = useNavigate();
	const [score, setScore] = useState(0);
	const [gameEnd, setGameEnd] = useState(false);
	const [players, setPlayers] = useState(location.state.playerList.reduce((playersObj, player) => {
		return {
			...playersObj,
			[player]: new Player(player)
		}
	}, {}));
	useEffect(() => {
		if (gameEnd) {
			socket.emit('end-game', {
				roomID: location.state.roomID
			});
		}

	}, [gameEnd]);

	useEffect(() => {
		socket.on('end-player', () => {
			moveToLeaderboard();
		})
	}, [])

	const endGame = () => {
		socket.emit('end-game', {
			roomID: location.state.roomID
		});
	}
	const moveToLeaderboard = () => {
		redirect('leaderboard', navigate, {
			state: {
				roomID: location.state.roomID,
				playerName: location.state.playerName,
				playerList: location.state.playerList,
				socketID: location.state.socket.id,
			}
		})
	}
	console.log(players);
  return (
		<div className="flex flex-row items-center justify-center bg-sky font-rubikone text-center text-white min-h-screen">
			<div className="flex grow justify-start mt-auto mb-12">
				<div className="flex flex-col ml-12">
					<Options/>
				</div>
			</div>
			<div className="flex grow justify-center min-h-screen">
				<div className="flex flex-col items-center">
					<label className="text-5xl mt-12">Mispel</label>
					<label className="text-7xl mt-12 mb-8">Your word is:</label>
					<PlayButton class/>
					<label className="text-3xl mt-20">Enter your guess</label>
					<input type="text" name="name" className="text-center text-3xl bg-gray-400 mt-6 w-3/4 h-12 rounded-md focus:outline-none"/>
					<button onClick={endGame} className="bg-navy text-4xl py-2 px-10 mt-12 rounded-md hover:bg-green">Submit</button>
				</div>
			</div>
			<div className="flex grow justify-end min-h-screen">
				<div className="flex flex-col mr-12 mt-12">
					<Timer className="flex grow justify-start"/>
					<label className="flex grow text-6xl items-end mb-12">Score: </label>
				</div>
			</div>
		</div>
	);
}

export default GameRoom;
