import "./GameRoom.css";
import { useState } from "react";

function GameRoom() {
	const [score, setScore] = useState(0);

  return (
		<div>
			<button>Exit</button>
			<label>Your word is:</label>
			<button>#timer here</button>
			<button class="triangle">Play</button>
			<label>Enter your guess</label>
			<input type="text" name="name"/>
			<button>Submit</button>
			<button>Options</button>
			<label>Score: </label>
		</div>
	);
}

export default GameRoom;
