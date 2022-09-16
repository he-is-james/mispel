import React from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import PlayButton from "../components/PlayButton";
import Player from "../utils/Player";
import LeaderboardList from "../components/LeaderboardList";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function GameRoom() {
	const location = useLocation();
	const [page, setPage] = useState(0);
	const [score, setScore] = useState(1000);
	const [isBadGuess, setBadGuess] = useState(false);
	const [remainingGuesses, setRemainingGuesses] = useState(8);
	const [guessForm, setGuessForm] = useState('');

	const { timeLimit } = location.state.gameInfo;
	const wordsArray = location.state.gameInfo.words;
	const [currWordPos, setCurrWordPos] = useState(0);

	// TO BE REMOVED
	const [playerList, setPlayerList] = useState([new Player('bob', 0), new Player('sal', 100), new Player('test', 55), new Player('Jimmy', 2), new Player('bob', 0), new Player('sal', 100), new Player('test', 55), new Player('Jimmy', 2)]);
	
	const playersList = location.state.playerList.reduce((playersObj, player) => {
		return {
			...playersObj,
			[player]: new Player(player)
		}
	}, {})
	const [players, setPlayers] = useState(playersList);
	const [player, setPlayer] = useState(playersList[location.state.playerName])
	// TO BE USED
	// const currScore = player.score;

	const handleTimeUp = () => {
		setBadGuess(true);
		setPage(1);
		// TO BE REMOVED
		setTimeout(() => {
			setPage(2);
		}, 3000);
	}

	const handleGuessForm = (event) => {
		event.preventDefault();
		setGuessForm(event.target.value);
	}

	const handleGuess = () => {
		if (guessForm !== '') {
			if (guessForm === wordsArray[currWordPos].word) {
				setBadGuess(false);
				setPlayer((currentPlayer) => {
					currentPlayer.score += score;
					return currentPlayer;
				});
				setPage(1);
				// TO BE REMOVED
				setTimeout(() => {
					setPage(2);
				}, 3000);
			}
			else {
				setBadGuess(true);
				setRemainingGuesses(remainingGuesses - 1);
				setScore((s) => {
					if (s - 50 >= 200) {
						return s - 50;
					} 
					return s;
				})
			}
			setPlayer((currentPlayer) => {
				if (guessForm in currentPlayer.attempts) {
					currentPlayer.attempts[guessForm] += 1;
				} else {
					currentPlayer.attempts[guessForm] = 1;
				}
				return currentPlayer;
			})
			setGuessForm('');
		}
	}

	const handleNextWord = () => {
		setScore(1000);
		setBadGuess(false);
		setRemainingGuesses(8);
		setCurrWordPos((pos) => pos + 1);
		setPage(0);
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
							onComplete={handleTimeUp}
							onUpdate={(remainingTime) => {
								if (remainingTime < timeLimit) {
									setScore((s) => {
										s -= 400/timeLimit;
										return Math.round(s);
									});
								} 
								return remainingTime
							}}>
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
		<div className={`flex flex-col flex-wrap grow font-rubikone text-6xl justify-center text-center text-honeydew min-h-screen ${(!isBadGuess) ? "bg-green" : "bg-red"}`}>
			<div>{(!isBadGuess) ? "Word Guessed Correctly" : " You Ran Out of Time"}</div>
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
						<button className="bg-orange px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-red" onClick={handleNextWord}>Next Word</button>
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
