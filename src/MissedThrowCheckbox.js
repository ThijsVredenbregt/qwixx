import React from 'react'

export default Props => {
	return (
		<div className={ Props.checked ? "checkbox-checked" : null} style={{backgroundColor:Props.lightColor, borderWidth: "0", borderRightStyle: "solid", borderRightWidth: "1", borderRadius: "0"}} data-id={Props.id} data-row={Props.row} data-checked={Props.checked} data-value={Props.value} onClick={Props.onClickHandler}>-5</div>
	);
};