import {ReactElement, useState} from "react";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export const EnterLink = (): ReactElement => {
    const [touched, setTouched] = useState(false);

    const handleTouch = () => {
        setTouched(true)
    }

    return (
        <Paper
            elevation={1}
            sx={{
                width: '90%',
                marginLeft: '5%',
                marginTop: "60px",
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
                <TextField
                    id='enter-vod-link'
                    label='Link'
                    onFocus={handleTouch}
                    helperText={touched ? 'https://www.youtube.com/watch?v=***********' : ' '}
                    variant='standard'
                    fullWidth
                    sx={{
                        color: blue
                    }}
                />
            </Stack>
        </Paper>
    )
}