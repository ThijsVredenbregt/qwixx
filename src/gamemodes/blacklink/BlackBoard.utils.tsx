import {MutableRefObject, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

export enum RowColor {
    RED,
    YELLOW,
    GREEN,
    BLUE
}

export enum RowOrder {
    DESCENDING,
    ASCENDING
}

export interface ScorrerRow {
    color: RowColor,
    order: RowOrder,
    length: number
}

export interface ScorrerState {
    id: string,
    row: ScorrerRow,
    value: number,
    checked: boolean,
    disabled: boolean,
    reference: MutableRefObject<null>,
    linkReference: MutableRefObject<null>
}

export const getOtherState = () => {
    const states = Array<ScorrerState>();
    const scorrerRows = Array<ScorrerRow>({color: RowColor.RED, order:RowOrder.ASCENDING, length:11}, {color:RowColor.YELLOW, order: RowOrder.ASCENDING, length:11}, {color:RowColor.GREEN, order: RowOrder.DESCENDING, length:11}, {color:RowColor.BLUE, order: RowOrder.DESCENDING, length:11});
    scorrerRows.forEach(scorrerRow => {
        for (let i = 2; i <= 12; i++) {
            states.push({
                id: uuidv4(),
                row: scorrerRow,
                value: i,
                checked: false,
                disabled: false,
                linkReference: useRef(null),
                reference: useRef(null),
            })
        }
    })

    //link red 9 to yellow 9


}