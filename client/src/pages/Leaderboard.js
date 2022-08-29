import { useState } from 'react';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {

	class Player {
		constructor(name, score) {
			this.name = name;
			this.score = score;
		}
	}

	const [playerList, setPlayerList] = useState([new Player('bob', 0), new Player('sal', 100), new Player('test', 55), new Player('Jimmy', 2)]);

	return (
		<div className="flex flex-col items-center bg-navy font-rubikone text-center text-white min-h-screen">
			<label className="text-5xl mt-12">Mispel</label>
			<div className="flex w-[90%] mt-8 items-end">
				<label className="text-7xl">Leaderboard</label>
				<div className="flex grow justify-end">
					<button className="bg-yellow px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-orange">Next Word</button>
				</div>
			</div>
			<div className="py-5 w-[90%]"> 
				<div className="border-t border-2 border-white"/>
			</div>
			<LeaderboardList playerList={playerList}/>
			<div className="flex mt-auto mb-12 w-[90%]">
				<div className="flex grow justify-end">
					<button className="bg-yellow text-4xl p-4 rounded-md hover:bg-orange">Finish Game</button>
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;