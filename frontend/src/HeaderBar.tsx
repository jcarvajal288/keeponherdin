import {ReactElement} from "react";
import {AppBar, Stack, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";

export const HeaderBar = (): ReactElement => {
    return (
        <AppBar
            sx={{backgroundColor: blue, height: "40px"}}
        >
            <Stack
                direction='row'
                alignItems='center'
                height='100%'
            >
                <Typography
                    fontSize='20px'
                    fontWeight='bold'
                >
                    Keep On Herdin'
                </Typography>
            </Stack>
        </AppBar>
    )
}
