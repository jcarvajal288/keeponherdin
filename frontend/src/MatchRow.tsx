import { ReactElement} from "react";
import {Stack, Typography} from "@mui/material";

export type Match = {
    player1: string;
    character1: string;
    player2: string;
    character2: string;
    did_p1_win: boolean;
    start_time: string;
}

export type MatchRowProps = {
    match: Match
}

export const MatchRow = ({match}: MatchRowProps): ReactElement => {
    return (
        <>
            <Stack
                data-testid='match-row'
                direction='row'
            >
                <Typography>{match.player1}</Typography>
                <Typography>{match.character1}</Typography>
                <Typography>VS</Typography>
                <Typography>{match.player2}</Typography>
                <Typography>{match.character2}</Typography>
            </Stack>
        </>
    )
}