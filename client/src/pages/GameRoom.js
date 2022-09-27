import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import PlayButton from "../components/PlayButton";
import Player from "../utils/Player";
import LeaderboardList from "../components/LeaderboardList";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function GameRoom({socket}) {
	const location = useLocation();
	const [isHost, setIsHost] = useState(location.state.isHost);
	const [page, setPage] = useState(0);
	const [score, setScore] = useState(1000);
	const [isBadGuess, setBadGuess] = useState(false);
	const [remainingGuesses, setRemainingGuesses] = useState(8);
	const [guessForm, setGuessForm] = useState('');
	const { words, wordCount, timeLimit } = location.state.gameInfo;
	const [currWordPos, setCurrWordPos] = useState(0);
	const [readyCount, setReadyCount] = useState(0);
	// TO BE REMOVED
	const [playerList, setPlayerList] = useState(location.state.playerList.reduce((playersObj, player) => {
		return {
			...playersObj,
			[player]: new Player(player, wordCount)
		}
	}, {}));

	const [player, setPlayer] = useState(playerList[location.state.playerName]);
	
	const handleNextWord = () => {
		console.log('1')
		if (isHost) {
			console.log('2')
			socket.emit('go-next-word', {roomID: location.state.roomID});
		}
		setScore(1000);
		setBadGuess(false);
		setRemainingGuesses(8);
		setReadyCount(0);
		setCurrWordPos((pos) => pos + 1);
		setPage(0);
	}

	useEffect(() => {
		socket.on('player-answered-correctly', (playerInfo) => {
			setPlayerList((playerList) => {
				const player = playerList[playerInfo.name];
				player.updateScore((score) => playerInfo.score)
				player.attempts[currWordPos] = playerInfo.attempts;
				console.log(playerList)
				return playerList;
			})
			setReadyCount((count) => {
				const newCount = count+1;
				if (newCount === Object.keys(playerList).length) {
					setPage(2);
				} 
				return newCount;
			})
		});

		socket.on('move-to-next-word', () => {
			handleNextWord();
		});

	}, []);
	// // const playersList = location.state.playerList.reduce((playersObj, player) => {
	// // 	return {
	// // 		...playersObj,
	// // 		[player]: new Player(player)
	// // 	}
	// // }, {})
	// // const [players, setPlayers] = useState(playersList);
	// const [player, setPlayer] = useState(playerList[location.state.playerName]);
	// TO BE USED
	// const currScore = player.score;

	const handleTimeUp = () => {
		setBadGuess(true);
		setPage(1);
		// TO BE REMOVED
		socket.emit('answered-correctly', {roomID: location.state.roomID, playerInfo: {name: player.name, attempts: player.attempts, score: player.score}})
		setReadyCount((count) => {
			const newCount = count+1;
			if (newCount === Object.keys(playerList).length) {
				setPage(2);
			} 
			return newCount;
		})

	}

	const handleGuessForm = (event) => {
		event.preventDefault();
		setGuessForm(event.target.value);
	}

	const handleGuess = () => {

		if (guessForm !== '') {
			if (guessForm.toLowerCase() === words[currWordPos].word) {
				setBadGuess(false);
				setPlayer((currentPlayer) => {
					const newScore = currentPlayer.score + score; 
					socket.emit('answered-correctly', {roomID: location.state.roomID, playerInfo: {name: player.name, attempts: player.attempts, score: newScore}})
					currentPlayer.score = newScore
					return currentPlayer;
				});
				setPage(1);
				setReadyCount((count) => {
					const newCount = count+1;
					if (newCount === Object.keys(playerList).length) {
						setPage(2);
					} 
					return newCount;
				})
				// TO BE REMOVED
				// setTimeout(() => {
				// 	setPage(2);
				// }, 3000);
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
				setPlayer((currentPlayer) => {
					if (guessForm in (currentPlayer.attempts[currWordPos])) {
						currentPlayer.attempts[currWordPos][guessForm] += 1;
					} else {
						currentPlayer.attempts[currWordPos][guessForm] = 1;
					}
					return currentPlayer;
				})
			}
			setGuessForm('');
		}
	}

	const playSound = () => {
		const audioStr = words[currWordPos].audio;
		const audio = new Audio("data:audio/wav;base64," + audioStr);
		audio.play();
	}


	if (page === 0) {
		return (
		<div className="flex flex-row bg-celadon font-rubikone text-center text-honeydew min-h-screen">
			<div className="flex basis-1/4 grow"/>
			<div className="flex basis-1/2 grow justify-center min-h-screen">
				<div className="flex flex-col items-center">
					<label className="text-5xl mt-8">Mispel</label>
					<label className="text-6xl mt-8 mb-8">Your word is:</label>
					<PlayButton onClick = {playSound} class/>
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
							updateInterval = {0}
							duration={timeLimit}
							size={120}
							colors={['#33658A', '#F7B801', '#A30000', '#A30000']}
							colorsTime={[7, 5, 2, 0]}
							onComplete={handleTimeUp}
							onUpdate= {(remainingTime) => {
								setScore((s) => s -= Math.ceil(400/timeLimit));
								return remainingTime
							}}
						>
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
					{isHost && <div className="flex grow justify-end">
						<button className="bg-orange px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-red" onClick={handleNextWord}>Next Word</button>
					</div>}
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
