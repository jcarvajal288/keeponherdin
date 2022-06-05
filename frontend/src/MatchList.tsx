import {ReactElement, useState} from 'react'

export type Match = {
    player1: string;
    character1: string;
    player2: string;
    character2: string;
    did_p1_win: boolean;
    start_time: string;
}

export const MatchList = (): ReactElement => {
    return (
        <h1>Match</h1>
    )
}
