import React from "react";
import { useState } from "react";

function GameRoom() {
	const [score, setScore] = useState(0);

  return (
		<div className="flex flex-row items-center bg-orange font-rubikone text-center text-white min-h-screen">
			<div className="">
				<button>Exit</button>
				<button>Options</button>
				<label>Your word is:</label>
				<div>#timer here</div>
			</div>
			<div className="">
        <button class="triangle">Play</button>
        <label>Enter your guess</label>
        <input type="text" name="name"/>
      </div>
			<div className="">
        <button>Submit</button>
        <label>Score: </label>
      </div>
		</div>
	);
}

export default GameRoom;
