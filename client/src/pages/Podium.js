import { useState } from "react";
import Options from '../components/Options';
import Standings from '../components/Standings';

function Podium() {

	return (
		<div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
			<label className="text-7xl mt-12">Mispel</label>
			<label className="text-9xl mt-12">Congratulations!</label>
			<div className="flex mb-auto w-[50%] justify-center">
				<Standings />
			</div>
			<div className="flex flex-row items-center flex-nowrap justify-content mt-auto mb-12 w-[90%] mt-12 min-w-fit">
				<div className="flex justify-start mr-10">
					<Options />
				</div>
				<div className="flex grow justify-center whitespace-nowrap">
					<label className="text-7xl text-center">Your Score: 11000</label>
				</div>
				<div className="flex justify-end flex whitespace-nowrap">
					<button className="bg-navy text-4xl py-4 px-6 rounded-md hover:bg-sky">Play Again</button>
				</div>
			</div>
		</div>
	);
}

export default Podium;