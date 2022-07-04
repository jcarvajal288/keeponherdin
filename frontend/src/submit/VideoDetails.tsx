import {Button, Paper, Stack, TextField} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import UndoIcon from '@mui/icons-material/Undo';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export type VideoDetailsProps = {
    setFormStep: (nextStep: string) => void;
}

export const VideoDetails = ({setFormStep}: VideoDetailsProps) => {

    return (
        <Stack
            direction='column'
        >
            <Paper
                sx={{
                    padding: '20px'
                }}
            >
                <TextField
                    id='titleField'
                    label='Title'
                    variant='standard'
                    fullWidth
                />
                <TextField
                    id='channelField'
                    label='Channel'
                    variant='standard'
                    fullWidth
                    sx={{
                        paddingTop: '5px'
                    }}
                />
                <Stack
                    direction='row'
                    alignItems='end'
                    sx={{
                        paddingTop: '5px'
                    }}
                >
                    <EventIcon
                        color='action'
                        sx={{
                            paddingRight: '5px'
                        }}
                    />
                    <TextField
                        id='dateField'
                        label='Date'
                        variant='standard'
                        fullWidth
                    />
                </Stack>
            </Paper>
            <Stack
                direction='row'
                sx={{
                    paddingTop: '20px'
                }}
            >
                <Button
                    variant='contained'
                    startIcon={<UndoIcon/>}
                    sx={{
                        marginRight: '10px'
                    }}
                >
                    Start Over
                </Button>
                <Button
                    variant='contained'
                    startIcon={<ArrowRightAltIcon/>}
                >
                    Next
                </Button>
            </Stack>
        </Stack>
    )
}