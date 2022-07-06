import {ReactElement, useState} from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {CharacterIcon} from "../tournaments/CharacterIcon";

export type TimestampRowProps = {
    initialMatch: Match
}

export const TimestampRow = ({initialMatch}: TimestampRowProps): ReactElement => {

    const [ match, setMatch] = useState<Match>(initialMatch)

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
        >
            <Box
                width='10%'
                sx={{
                    marginRight: '5px'
                }}
            >
                <TextField
                    label='Timestamp'
                    variant='standard'
                    defaultValue={match.start_time}
                />
            </Box>
            <Box width='30%'>
                <TextField
                    label='Player 1'
                    variant='standard'
                    defaultValue={match.player1}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                width='15%'
            >
                <CharacterIcon character={match.character1}/>
                <Typography>vs</Typography>
                <CharacterIcon character={match.character2}/>
            </Stack>
            <Box width='30%'>
                <TextField
                    label='Player 2'
                    variant='standard'
                    defaultValue={match.player2}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                justifyContent='space-between'
                width='15%'
            >
                <OndemandVideoIcon/>
                <SwapHorizIcon/>
                <ContentCopyIcon/>
                <DeleteIcon/>
            </Stack>
        </Stack>
    )
}