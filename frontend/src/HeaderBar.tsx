import {ReactElement} from "react";
import {AppBar, Stack, Typography} from "@mui/material";
import { blue } from "@mui/material/colors";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link as RouterLink} from 'react-router-dom';

export const titleSlogan = "Can't Escape From Crossup Flop"
export const headerBarHeight = "48px"

export const HeaderBar = (): ReactElement => {

    return (
        <AppBar
            sx={{backgroundColor: blue, height: headerBarHeight}}
        >
            <Stack
                direction='row'
                alignItems='center'
                height='100%'
            >
                <RouterLink
                    to='/'
                    style={{ textDecoration: 'none' }}
                >
                    <Typography
                        paddingLeft='20px'
                        fontSize='20px'
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold'
                        }}
                    >
                        {titleSlogan}
                    </Typography>
                </RouterLink>
                <RouterLink
                    to='/add'
                    data-testid='add-tournament-button'
                >
                    <AddBoxIcon
                        aria-label='add-tournament'
                        sx={{
                            color: '#FFFFFF',
                            marginTop: '3px',
                            paddingLeft: '20px'
                        }}
                    />
                </RouterLink>
            </Stack>
        </AppBar>
    )
}
