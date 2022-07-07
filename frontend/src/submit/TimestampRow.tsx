import {ReactElement, useState} from "react";
import {Box, IconButton, Stack, TextField, Typography} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {CharacterIcon} from "../tournaments/CharacterIcon";

export type TimestampRowProps = {
    timestampId: number
    initialMatch: Match
    timestamps: Match[]
    setTimestamps: (_: Match[]) => void
}

export const TimestampRow = ({
        timestampId,
        initialMatch,
        timestamps,
        setTimestamps
    }: TimestampRowProps): ReactElement => {

    const [ match, setMatch] = useState<Match>(initialMatch)

    const deleteThisRow = () => {
        console.log('in delete')
        const newTimestamps = timestamps.filter(
            timestamp => timestamp !== timestamps[timestampId]
        )
        setTimestamps(newTimestamps)
    }

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
                alignItems='center'
                width='15%'
            >
                <OndemandVideoIcon/>
                <SwapHorizIcon/>
                <ContentCopyIcon/>
                <IconButton
                    title='Delete Timestamp'
                    aria-label='Delete Timestamp'
                    onClick={deleteThisRow}
                    sx={{
                        color: 'black'
                    }}
                >
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </Stack>
    )
}