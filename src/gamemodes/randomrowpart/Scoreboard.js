import React from 'react';

function Scoreboard(Props) {
	return(
		<div className="scoreboard-container">
			<span className="scoreboard" style={{borderColor:"red"}} name="red">{Props.red}</span>+
			<span className="scoreboard" style={{borderColor:"yellow"}} name="yellow">{Props.yellow}</span>+
			<span className="scoreboard" style={{borderColor:"green"}} name="green" >{Props.green}</span>+
			<span className="scoreboard" style={{borderColor:"blue"}} name="blue" >{Props.blue}</span>-
			<span className="scoreboard" style={{borderColor:"grey"}} name="grey" >{Props.grey}</span>=
			<span className="scoreboard" style={{borderColor:"black"}} name="total" >{(Props.red + Props.yellow + Props.green + Props.blue) - Props.grey}</span>
		</div>
	);
}

export default Scoreboard;