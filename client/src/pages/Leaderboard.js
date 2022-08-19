import { useState } from 'react';
import Options from '../components/Options';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {

	class Player {
		constructor(name, score) {
			this.name = name;
			this.score = score;
		}
	}

	const [playerList, setPlayerList] = useState([new Player('bob', 0), new Player('sal', 100)]);

	return (
		<div className="flex flex-col items-center bg-navy font-rubikone text-center text-white min-h-screen">
			<label className="text-5xl mt-12">Mispel</label>
			<div className="flex flex-row w-[90%] mt-12 items-end">
				<label className="text-7xl mt-8">Leaderboard</label>
				<div className="flex flex-grow justify-end">
					<button className="bg-yellow px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-orange">Next Word</button>
				</div>
			</div>
			<div class="relative flex py-5 items-center w-[90%]"> 
        <div class="flex-grow border-t border-2 border-white"></div>
      </div>
			<LeaderboardList playerList={playerList} />
			<div className="flex flex-row mt-auto mb-12 w-[90%]">
				<Options/>
				<div className="flex flex-grow justify-end">
					<button className="bg-yellow text-4xl p-4 rounded-md hover:bg-orange">Finish Game</button>
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;