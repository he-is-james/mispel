import { useState } from "react";
import Standings from '../components/Standings';

function Podium() {
	return (
		<div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
			<div className="text-5xl mt-12">Mispel</div>
			<div className="text-7xl mt-8">Congratulations!</div>
			<div className="flex mb-auto w-[50%] justify-center">
				<Standings />
			</div>
			<div className="flex flex-row items-center flex-nowrap justify-content mt-auto mb-12 w-[90%] mt-12">
				<div className="flex basis-1/4"/>
				<div className="flex basis-1/2 grow justify-center whitespace-nowrap">
					<label className="text-6xl text-center">Your Score: 11000</label>
				</div>
				<div className="flex basis-1/4 justify-end flex whitespace-nowrap">
					<button className="bg-navy text-4xl py-4 px-6 rounded-md hover:bg-sky">Play Again</button>
				</div>
			</div>
		</div>
	);
}
export default Podium;