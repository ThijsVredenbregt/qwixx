import React from "react";
import { slide as Menu } from "react-burger-menu";

export default Props => {
  return (
    <Menu isOpen={ Props.isOpen } onStateChange={Props.onMenuStateChange}>
        <p onClick={ Props.onClickReset } className="menu-item">
            Reset
        </p>
    </Menu>
  );
};