import { useState } from 'react';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard(playerList) {
	return (
		<div className="flex flex-col items-center bg-navy font-rubikone text-center text-white min-h-screen">
			<div className="flex flex-col w-[90%]">
				<label className="text-5xl mt-12">Mispel</label>
				<div className="flex mt-8 items-end">
					<label className="text-7xl">Leaderboard</label>
					<div className="flex grow justify-end">
						<button className="bg-orange px-4 py-0 h-20 text-4xl px-6 rounded-md hover:bg-red">Next Word</button>
					</div>
				</div>
				<div className="py-5"> 
					<div className="border-t border-2 border-white"/>
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
		</div>
	);
}

export default Leaderboard;