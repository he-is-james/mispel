import { useState } from 'react';
import Options from '../components/Options';

function PlayerCard(player, score) {
	return (
		<div>
			
		</div>
	)
}

function Leaderboard() {

	const [playerList, setPlayerList] = useState([])

	return (
		<div className="flex flex-col items-center bg-navy font-rubikone text-center text-white min-h-screen">
			<div className="flex flex-row w-[90%] mt-12 items-end">
				<label className="text-7xl mt-12">Leaderboard</label>
				<div className="flex flex-grow justify-end">
					<button className="bg-yellow px-4 py-0 h-20 text-5xl px-6 rounded-md hover:bg-orange">Next Word</button>
				</div>
			</div>
			<div class="relative flex py-5 items-center w-[90%]">
        <div class="flex-grow border-t border-2 border-white"></div>
      </div>
			<hr/>
			<label>#players here</label>
			<div className="flex flex-row mt-auto mb-12 w-[90%] mt-12">
				<Options/>
				<div className="flex flex-grow justify-end">
					<button className="bg-yellow text-5xl p-4 rounded-md hover:bg-orange">Finish Game</button>
				</div>
			</div>
		</div>
	);
}

export default Leaderboard;