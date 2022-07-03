import {ReactElement} from "react";
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
                    paddingLeft='20px'
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
                        textDecoration='none'
                        sx={{
                            color: '#FFFFFF',
                            marginTop: '3px',
                            paddingLeft: '10px'
                        }}
                    />
                </RouterLink>
            </Stack>
        </AppBar>
    )
}
