import React from 'react';
import ClassicBoard from './gamemodes/classic/Board';
import RandomNumberBoard from './gamemodes/randomnumbers/Board';

function Board (Props) {
    if (Props.gamemode === "Classic") {
        return <ClassicBoard />
    } else if (Props.gamemode === "BlackRow") {
        return <div>test {Props.gamemode}</div>
    }
}

export default Board;