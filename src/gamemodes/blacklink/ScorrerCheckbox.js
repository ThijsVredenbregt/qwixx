import React from 'react';
import Xarrow from "react-xarrows";

export default Props => {
  return (
      <>
        <div className={Props.disabled ? Props.checked ? "checkbox-disabled checkbox-checked" : "checkbox-disabled" : Props.checked ? "checkbox-checked" : null} style={{backgroundColor:Props.lightColor}} data-index={Props.index} data-row={Props.row} data-checked={Props.checked} data-disabled={Props.disabled} data-value={Props.value} onClick={Props.onClickHandler}>
            <div data-index={Props.index} data-row={Props.row} data-checked={Props.checked} data-disabled={Props.disabled} data-value={Props.value} onClick={Props.onClickHandler} id={Props.id} className={Props.link === undefined ? "":"link"}>
                {Props.value}
            </div>
        </div>
        {Props.link !== undefined ? <Xarrow start={Props.id} end={Props.link} color={"black"} showHead={false} />:<></>}
      </>);
};