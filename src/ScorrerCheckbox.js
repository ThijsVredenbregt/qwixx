import React from 'react';

export default Props => {
  return (
    <div className={Props.disabled ? Props.checked ? "checkbox-disabled checkbox-checked" : "checkbox-disabled" : Props.checked ? "checkbox-checked" : null} style={{backgroundColor:Props.lightColor}} data-index={Props.index} data-row={Props.row} data-checked={Props.checked} data-disabled={Props.disabled} data-value={Props.value} onClick={Props.onClickHandler}>{Props.value}</div>
  );
};