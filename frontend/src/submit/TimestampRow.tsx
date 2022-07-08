import React, {ReactElement, useState} from "react";
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {CharacterIcon} from "../tournaments/CharacterIcon";

export type TimestampRowProps = {
    thisTimestampId: number
    initialMatch: Match
    timestamps: Match[]
    setTimestamps: (_: Match[]) => void
}

export const TimestampRow = ({
        thisTimestampId,
        initialMatch,
        timestamps,
        setTimestamps
    }: TimestampRowProps): ReactElement => {

    const [ match, setMatch] = useState<Match>(initialMatch)

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)
    const handleCharacterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget)
    }
    const handleCharacterMenuClose = () => {
        setAnchorElement(null)
    }

    const duplicateThisRow = () => {
        setTimestamps([...timestamps, Object.assign({}, timestamps[thisTimestampId])])
    }

    const deleteThisRow = () => {
        const newTimestamps = timestamps.filter(
            timestamp => timestamp !== timestamps[thisTimestampId]
        )
        setTimestamps(newTimestamps)
    }

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            data-testid='timestamp-row'
        >
            <Box
                width='10%'
                sx={{
                    marginRight: '5px'
                }}
            >
                <TextField
                    label='Timestamp'
                    name='Timestamp'
                    variant='standard'
                    defaultValue={match.start_time}
                    onChange={(event) => match.start_time = event.target.value}
                />
            </Box>
            <Box width='30%'>
                <TextField
                    label='Player 1'
                    variant='standard'
                    defaultValue={match.player1}
                    onChange={(event) => match.player1 = event.target.value}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                width='15%'
            >
                <IconButton
                    title='character1-select'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleCharacterClick}
                >
                    <CharacterIcon character={match.character1}/>
                </IconButton>
                <CharacterMenu
                    anchorElement={anchorElement}
                    open={open}
                    onClose={handleCharacterMenuClose}
                />
                <Typography>vs</Typography>
                <IconButton
                    title='character2-select'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleCharacterClick}
                >
                    <CharacterIcon character={match.character2}/>
                </IconButton>
                <CharacterMenu
                    anchorElement={anchorElement}
                    open={open}
                    onClose={handleCharacterMenuClose}
                />
            </Stack>
            <Box width='30%'>
                <TextField
                    label='Player 2'
                    variant='standard'
                    defaultValue={match.player2}
                    onChange={(event) => match.player2 = event.target.value}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                width='15%'
            >
                <OndemandVideoIcon/>
                <SwapHorizIcon/>
                <IconButton
                    title='Duplicate'
                    aria-label='Duplicate'
                    onClick={duplicateThisRow}
                    sx={{
                        color: 'black'
                    }}
                >
                    <ContentCopyIcon/>
                </IconButton>
                <IconButton
                    title='Delete'
                    aria-label='Delete'
                    onClick={deleteThisRow}
                    sx={{
                        color: 'black'
                    }}
                >
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </Stack>
    )
}

type CharacterMenuProps = {
    anchorElement: null | HTMLElement
    open: boolean
    onClose: () => void
}

const CharacterMenu = ({anchorElement, open, onClose }: CharacterMenuProps): ReactElement => {
    return (
        <Menu
            anchorEl={anchorElement}
            open={open}
            onClose={onClose}
        >
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Arizona'/>   
                </ListItemIcon>
                <ListItemText>Arizona</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Oleander'/>
                </ListItemIcon>
                <ListItemText>Oleander</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Paprika'/>
                </ListItemIcon>
                <ListItemText>Paprika</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Pom'/>
                </ListItemIcon>
                <ListItemText>Pom</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Shanty'/>
                </ListItemIcon>
                <ListItemText>Shanty</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Tianhuo'/>
                </ListItemIcon>
                <ListItemText>Tianhuo</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <CharacterIcon character='Velvet'/>
                </ListItemIcon>
                <ListItemText>Velvet</ListItemText>
            </MenuItem>
        </Menu>
    )
}