import React from 'react'
import ScorrerCheckbox from './ScorrerCheckbox'

export default Props => {
	return (
		<div className="row-container" style={{backgroundColor:Props.color}}>
			<div className="checkbox-container" style={{backgroundColor: Props.darkColor}}>
				{Props.items.map((item, index) => <ScorrerCheckbox key={index} id={item.id} link={item.link} lightColor={Props.lightColor} index={index} value={item.value} row={Props.row} checked={item.checked} disabled={item.disabled} onClickHandler={Props.onClickHandler} />)}
			</div>
			<div className={Props.items[Props.items.length-1].checked ? "locked" : "unlocked"}>&nbsp;</div>
		</div>
	);
};