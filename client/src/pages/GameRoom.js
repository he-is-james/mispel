import React from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Timer from '../components/Timer';
import PlayButton from "../components/PlayButton";
import Player from "../utils/Player";

function GameRoom() {
	const location = useLocation();
	const [page, setPage] = useState(0);
	const [score, setScore] = useState(0);
	const [isBadGuess, setBadGuess] = useState(false);
	const [remainingGuesses, setRemainingGuesses] = useState(8);
	const [guessForm, setGuessForm] = useState('');
	const timeLimit = 15;
	const word = 'test';
	const [playerList, setPlayerList] = useState([new Player('bob', 0), new Player('sal', 100), new Player('test', 55), new Player('Jimmy', 2), new Player('bob', 0), new Player('sal', 100), new Player('test', 55), new Player('Jimmy', 2)]);

	// const location = useLocation();
	// const [players, setPlayers] = useState(location.state.playerList.reduce((playersObj, player) => {
	// 	return {
	// 		...playersObj,
	// 		[player]: new Player(player)
	// 	}
	// }, {}));
	// console.log(players);

	const handleTimeUp = () => {
		setRemainingGuesses(0);
		setTimeout(() => {
			setPage(1);
		}, 200);
	}

	const handleGuessForm = (event) => {
		event.preventDefault();
		setGuessForm(event.target.value);
	}

	const handleGuess = () => {
		if (guessForm === word) {
			setBadGuess(false);
			setPage(1);
		}
		else {
			setBadGuess(true);
			setRemainingGuesses(remainingGuesses - 1);
		}
	}

	if (page === 0) {
		return (
		<div className="flex flex-row bg-celadon font-rubikone text-center text-honeydew min-h-screen">
			<div className="flex basis-1/4 grow"/>
			<div className="flex basis-1/2 grow justify-center min-h-screen">
				<div className="flex flex-col items-center">
					<label className="text-5xl mt-8">Mispel</label>
					<label className="text-6xl mt-8 mb-8">Your word is:</label>
					<PlayButton class/>
					<label className="text-3xl mt-12">Enter your guess</label>
					<input value={guessForm} onChange={handleGuessForm} type="text" className="text-center text-3xl bg-gray-400 mt-2 w-3/4 h-12 rounded-md focus:outline-none"/>
					<button disabled={guessForm === ''} onClick={handleGuess} className="bg-red text-4xl py-2 px-10 mt-8 rounded-md hover:bg-orange">Submit</button>
					{isBadGuess ? <label className="text-red">Incorrect</label> : <></>}
				</div>
			</div>
			<div className="flex basis-1/4 grow justify-center min-h-screen">
				<div className="flex flex-col mt-12 text-4xl">
					<div className="flex flex-col items-center">
						<CountdownCircleTimer 
							isPlaying
							duration={timeLimit}
							size={120}
							colors={['#33658A', '#F7B801', '#A30000', '#A30000']}
							colorsTime={[7, 5, 2, 0]}
							onComplete={handleTimeUp}>
							{({ remainingTime }) => remainingTime}
						</CountdownCircleTimer>
					</div>
					<label className="flex grow items-end mb-12">Score: {score}</label>
				</div>
			</div>
		</div>);
	}
	if (page === 1) {
		return (
		<div className={`flex flex-col flex-wrap grow font-rubikone text-6xl justify-center text-center text-honeydew min-h-screen ${(remainingGuesses !== 0) ? "bg-green" : "bg-red"}`}>
			<div>{(remainingGuesses !== 0) ? "Word Guessed Correctly" : " You Ran Out of Attempts"}</div>
			<div>Waiting for Other Players...</div>
		</div>);
	}
	if (page === 2) {
		return (
		<div className="flex flex-col items-center bg-sky font-rubikone text-center text-honeydew min-h-screen">
			<div className="flex flex-col w-[90%]">
				<label className="text-5xl mt-12">Mispel</label>
				<div className="flex mt-8 items-end">
					<label className="text-7xl">Leaderboard</label>
					<div className="flex grow justify-end">
						<button className="bg-orange px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-red">Next Word</button>
					</div>
				</div>
				<div className="py-5"> 
					<div className="border-t border-2 border-honeydew"/>
				</div>
			</div>
			<div className="basis-2/3 w-[90%]">
				<LeaderboardList playerList={playerList}/>
			</div>
			<div className="mb-12 w-[90%]">
				<div className="flex grow justify-end">
					<button className="bg-orange text-4xl p-4 rounded-md hover:bg-red">Finish Game</button>
				</div>
			</div>
		</div>);
	}
}

export default GameRoom;
