import React from 'react';
import ClassicBoard from './gamemodes/classic/ClassicBoard';
import RandomNumberBoard from './gamemodes/randomnumbers/RandomNumbersBoard';
import BlackRow from './gamemodes/blackrow/BlackRowBoard';
import BlackLink from './gamemodes/blacklink/BlackLinkBoard';
import RandomRowPart from './gamemodes/randomrowpart/RandomRowPartBoard';

function Board (Props) {
    if (Props.gamemode === "Classic") {
        return <ClassicBoard />
    } else if (Props.gamemode === "RandomNumbers") {
        return <RandomNumberBoard />
    } else if (Props.gamemode === "BlackRowBoard") {
        return <BlackRow />
    } else if (Props.gamemode === "BlackLinkBoard") {
        return <BlackLink />
    } else if (Props.gamemode === "RandomRowPartBoard") {
        return <RandomRowPart />
    }
}

export default Board;