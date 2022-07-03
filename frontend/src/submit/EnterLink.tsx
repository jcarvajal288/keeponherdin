import {ReactElement, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
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

        >
            <OndemandVideoIcon/>
            <TextField
                id='enter-vod-link'
                label='Link'
                onFocus={handleTouch}
                helperText={touched ? 'https://www.youtube.com/watch?v=***********' : ' '}
                variant='standard'
            />
        </Stack>
    )
}