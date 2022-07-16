import React, {ReactElement, useState} from "react";
import {FormControl, Paper, Stack, TextField, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import {Tournament} from "../tournaments/TournamentTable";

export type EnterLinkProps = {
    setFormStep: (nextStep: string) => void;
    setVodLink: (vodLink: string) => void;
}

export const EnterLink = ({setFormStep, setVodLink}: EnterLinkProps): ReactElement => {
    const [touched, setTouched] = useState(false);
    const validYoutubeLink = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/

    const handleTouch = () => {
        setTouched(true)
    }

    const handleSubmit = (vodLink: string) => {
        setVodLink(vodLink)
        setFormStep("Video Details")
    }

    const submitIfValidLink = (event: { target: { value: string; }; }) => {
        if(validYoutubeLink.exec(event.target.value)) {
            handleSubmit(event.target.value)
        }
    }

    return (
        <Paper
            elevation={1}
            sx={{
                width: '90%',
                marginLeft: '5%',
            }}
        >
            <Stack
                sx={{
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}
                direction='row'
                alignItems='center'
            >
                <OndemandVideoIcon
                    color='primary'
                    sx={{
                        paddingRight: '10px',
                    }}
                />
                <FormControl
                    fullWidth
                >
                    <TextField
                        id='enter-vod-link'
                        label='Link'
                        onFocus={handleTouch}
                        helperText={touched ? 'https://www.youtube.com/watch?v=***********' : ' '}
                        variant='standard'
                        fullWidth
                        onChange={submitIfValidLink}
                        sx={{
                            color: blue
                        }}
                    />
                </FormControl>
            </Stack>
        </Paper>
    )
}