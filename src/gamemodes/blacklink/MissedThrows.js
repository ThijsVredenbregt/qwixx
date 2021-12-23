import React from 'react'
import MissedThrowCheckbox from './MissedThrowCheckbox'

export default Props => {
	return (
		<div className="row-container" style={{borderWidth:0, boxShadow: "none", display:"block", flex:0}}>
			<div className="checkbox-container">
				{Props.items.map((item, index) => <MissedThrowCheckbox key={index} id={item.id} row="grey" checked={item.checked} value={item.value} onClickHandler={Props.onClickHandler}>-5</MissedThrowCheckbox>	)}
			</div>
		</div>
	);
};