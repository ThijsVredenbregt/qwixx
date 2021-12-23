import React from "react";
import { slide as Menu } from "react-burger-menu";

export default Props => {
  return (
    <Menu isOpen={ Props.isOpen } onStateChange={Props.onMenuStateChange}>
        <p onClick={ Props.onClickReset } className="menu-item">
            Reset
        </p>
        <h3>Spel-variaties</h3>
        <p onClick={ Props.onClickGamemodeClassic } className="menu-item">
            Klassiek
        </p>
        <p onClick={ Props.onClickGamemodeBlackRow } className="menu-item">
            Zwarte rij
        </p>
        <p onClick={ Props.onClickGamemodeRandomNumbers } className="menu-item">
            Willekeurige nummers
        </p>
        <p onClick={ Props.onClickGamemodeBlackLink } className="menu-item">
            Zwarte link
        </p>
        <p onClick={ Props.onClickGamemodeRandomRowPart } className="menu-item">
            Gehusselde rijen
        </p>

    </Menu>
  );
};