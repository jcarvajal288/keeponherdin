import {ReactElement, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export const EnterLink = (): ReactElement => {
    const [touched, setTouched] = useState(false);

    const handleTouch = () => {
        setTouched(true)
    }

    return (
        <Stack
            sx={{marginTop: "60px"}}
            direction='row'
            alignItems='center'
            paddingLeft='50px'
            paddingRight='50px'
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
    )
}