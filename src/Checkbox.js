import React from 'react';

function Checkbox(Props) {
	return <input type="checkbox" name={Props.row} data-key={Props.index} value={Props.value} checked={Props.checked} style={{flex:1}} onChange={Props.onChangeHandler} disabled={Props.disabled}/>
}

export default Checkbox;