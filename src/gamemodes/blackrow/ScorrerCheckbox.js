import React from 'react';

function getClassNames(disabled, checked, blacked) {
  let result = "";

  if (disabled === true) {
    result += "checkbox-disabled ";
  }

  if (checked === true) {
    result += "checkbox-checked ";
  }

  if (blacked === true) {
    result += "blacked-container ";
  }

  return result === "" ? null : result;
}


export default Props => {
  return (
    <div className={getClassNames(Props.disabled, Props.checked, Props.blacked)} style={{backgroundColor:Props.lightColor}} data-index={Props.index} data-row={Props.row} data-checked={Props.checked} data-disabled={Props.disabled} data-value={Props.value} data-blacked={Props.blacked} onClick={Props.onClickHandler}><div className={Props.blacked ? "blacked" : null}>{Props.value}</div></div>
  );
};