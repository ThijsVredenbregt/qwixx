import React from 'react';
import ClassicBoard from './gamemodes/classic/ClassicBoard';
import RandomNumberBoard from './gamemodes/randomnumbers/RandomNumbersBoard';
import BlackRowBoard from './gamemodes/blackrow/BlackRowBoard';
import BlackLinkBoard from './gamemodes/blacklink/BlackLinkBoard';
import RandomRowPartBoard from './gamemodes/randomrowpart/RandomRowPartBoard';

function Board (Props) {
    if (Props.gamemode === "RandomNumbers") {
        return <RandomNumberBoard />
    } else if (Props.gamemode === "BlackRow") {
        return <BlackRowBoard />
    } else if (Props.gamemode === "BlackLink") {
        return <BlackLinkBoard />
    } else if (Props.gamemode === "RandomRowPart") {
        return <RandomRowPartBoard />
    } else {
        return <ClassicBoard />
    }
}

export default Board;