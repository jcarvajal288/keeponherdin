import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Stack, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link as RouterLink} from 'react-router-dom';

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
                    padding='20px'
                    fontSize='20px'
                    fontWeight='bold'
                >
                    Can't Escape From Crossup Flop
                </Typography>
                <RouterLink
                    to='/add'
                    data-testid='add-tournament-button'
                >
                    <AddBoxIcon
                        aria-label='add-tournament'
                    />
                </RouterLink>
            </Stack>
        </AppBar>
    )
}
