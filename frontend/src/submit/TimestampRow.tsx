import {ReactElement, useState} from "react";
import {Stack, TextField} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";

export type TimestampRowProps = {
    initialMatch: Match
}

export const TimestampRow = ({initialMatch}: TimestampRowProps): ReactElement => {

    const [ match, setMatch] = useState<Match>(initialMatch)

    return (
        <Stack
            direction='row'
        >
            <TextField
                label='Timestamp'
                defaultValue={match.start_time}
            />
            <TextField
                label='Player 1'
                defaultValue={match.player1}
            />
            <TextField
                label='Player 2'
                defaultValue={match.player2}
            />
            <OndemandVideoIcon/>
            <SwapHorizIcon/>
            <ContentCopyIcon/>
            <DeleteIcon/>
        </Stack>
    )
}