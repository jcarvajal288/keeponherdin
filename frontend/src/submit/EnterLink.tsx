import React, {ReactElement, useState} from "react";
import {FormControl, Paper, Stack, TextField, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export type EnterLinkProps = {
    setFormStep: (nextStep: string) => void;
}

export const EnterLink = ({setFormStep}: EnterLinkProps): ReactElement => {
    const [touched, setTouched] = useState(false);
    const validYoutubeLink = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/

    const handleTouch = () => {
        setTouched(true)
    }

    const handleSubmit = () => {
        setFormStep("Video Details")
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            handleSubmit()
        }
    }

    const submitIfValidLink = (event: { target: { value: string; }; }) => {
        if(validYoutubeLink.exec(event.target.value)) {
            handleSubmit()
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
                    onSubmit={handleSubmit}
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