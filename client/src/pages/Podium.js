import { useState } from "react";
import Options from '../components/Options';

function Podium() {

	return (
		<div className="flex flex-col items-center justify-center bg-orange font-rubikone text-center text-white min-h-screen">
			<label className="text-9xl mt-12">Congratulations!</label>
			<div>#standings here</div>
			<div className="flex flex-row flex-wrap justify-content mt-auto mb-12 w-[90%] mt-12">
				<div className="flex grow justify-start">
					<Options />
				</div>
				<div className="flex grow justify-center">
					<label className="text-7xl text-center ml-20">Your Score: 11000</label>
				</div>
				<div className="flex grow justify-end">
					<button className="bg-navy text-5xl py-4 px-6 rounded-md hover:bg-sky">Play Again</button>
				</div>
			</div>
		</div>
	);
}

export default Podium;