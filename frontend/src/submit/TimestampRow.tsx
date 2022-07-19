import React, {Dispatch, ReactElement, SetStateAction, useState} from "react";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    TextField, touchRippleClasses,
    Typography
} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {CharacterIcon} from "../tournaments/CharacterIcon";
import {Tournament} from "../tournaments/TournamentTable";
import {TFH_Characters} from "../tfhData";

export type TimestampRowProps = {
    thisTimestampId: number
    initialMatch: Match
    timestamps: Match[]
    setTimestamps: (_: Match[]) => void
    tournament: Tournament
}

export const TimestampRow = ({
        thisTimestampId,
        initialMatch,
        timestamps,
        setTimestamps,
        tournament
    }: TimestampRowProps): ReactElement => {

    const [ match, setMatch ] = useState<Match>(initialMatch)

    const startTimeRegex = /^(\d+h)?[0-5]\dm[0-5]\ds$/

    const [p1AnchorElement, setP1AnchorElement] = useState<null | HTMLElement>(null)
    const [p2AnchorElement, setP2AnchorElement] = useState<null | HTMLElement>(null)
    const openP1 = Boolean(p1AnchorElement)
    const openP2 = Boolean(p2AnchorElement)
    const handleP1CharacterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setP1AnchorElement(event.currentTarget)
    }
    const handleP2CharacterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setP2AnchorElement(event.currentTarget)
    }
    const handleP1CharacterMenuClose = () => {
        setP1AnchorElement(null)
    }
    const handleP2CharacterMenuClose = () => {
        setP2AnchorElement(null)
    }

    const swapPlayers = () => {
        const newMatch = {
            ...match,
            player1: match.player2,
            character1: match.character2,
            player2: match.player1,
            character2: match.character1,
        }
        setMatch(newMatch)
    }

    const duplicateThisRow = () => {
        setTimestamps([...timestamps, match])
    }

    const deleteThisRow = () => {
        const newTimestamps = timestamps.filter(
            timestamp => timestamp !== timestamps[thisTimestampId]
        )
        setTimestamps(newTimestamps)
    }

    const setPlayer1Win = (didP1Win: boolean) => {
        setMatch({
            ...match,
            did_p1_win: didP1Win
        })
    }

    const convertTimestampToSeconds = (timestamp: string): number => {
        const h_index = timestamp.indexOf('h')
        const m_index = timestamp.indexOf('m')
        const s_index = timestamp.indexOf('s')
        const hours = parseInt(timestamp.substring(0, h_index), 10)
        const minutes = parseInt(timestamp.substring(h_index+1, m_index), 10)
        const seconds = parseInt(timestamp.substring(m_index+1, s_index), 10)
        return (hours * 3600) + (minutes * 60) + seconds
    }

    const fullVodUrl = `${tournament.vod_link}?t=${convertTimestampToSeconds(match.start_time)}`

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            data-testid='timestamp-row'
            sx={{
                marginTop: '5px'
            }}
        >
            <Box
                width='11%'
                sx={{
                    marginRight: '5px'
                }}
            >
                <TextField
                    label='Timestamp'
                    name='Timestamp'
                    variant='standard'
                    defaultValue={match.start_time}
                    error={match.start_time !== '' && !startTimeRegex.exec(match.start_time)}
                    helperText='**h**m**s'
                    onChange={(event) => {
                        const newMatch = {
                            ...match,
                            start_time: event.target.value
                        }
                        setMatch(newMatch)
                    }}
                />
            </Box>
            <Box width='30%'>
                <TextField
                    label='Player 1'
                    title='Player 1'
                    variant='standard'
                    value={match.player1}
                    helperText=' '
                    onChange={(event) => {
                        const newMatch = {
                            ...match,
                            player1: event.target.value,
                        }
                        setMatch(newMatch)
                    }}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                width='20%'
            >
                <IconButton
                    onClick={(_event) => setPlayer1Win(true)}
                >
                    <EmojiEventsIcon
                        titleAccess={
                            ((did_p1_win: boolean | null) => {
                                switch (did_p1_win) {
                                    case true:
                                        return "Player 1 Wins"
                                    case false:
                                        return "Player 1 Loses"
                                    default:
                                        return "Did Player 1 Win?"
                                }
                            })(match.did_p1_win)
                        }
                        sx={{
                            ...(match.did_p1_win
                                ? { color: 'orange' }
                                : { color: 'gray' }
                            )
                        }}
                    />
                </IconButton>
                <IconButton
                    title='character1-select'
                    aria-controls={openP1 ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openP1? 'true' : undefined}
                    onClick={handleP1CharacterClick}
                    sx={{
                        width: '25%'
                    }}
                >
                    <CharacterIcon character={match.character1}/>
                </IconButton>
                <CharacterMenu
                    anchorElement={p1AnchorElement}
                    setAnchorElement={setP1AnchorElement}
                    open={openP1}
                    onClose={handleP1CharacterMenuClose}
                    setCharacter={(character: string) => {
                        match.character1 = character
                    }}
                />
                <Typography>vs</Typography>
                <IconButton
                    title='character2-select'
                    aria-controls={openP2 ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openP2 ? 'true' : undefined}
                    onClick={handleP2CharacterClick}
                    sx={{
                        width: '25%'
                    }}
                >
                    <CharacterIcon character={match.character2}/>
                </IconButton>
                <CharacterMenu
                    anchorElement={p2AnchorElement}
                    setAnchorElement={setP2AnchorElement}
                    open={openP2}
                    onClose={handleP2CharacterMenuClose}
                    setCharacter={(character: string) => {
                        match.character2 = character
                    }}
                />
                <IconButton
                    onClick={(_event) => setPlayer1Win(false)}
                >
                    <EmojiEventsIcon
                        titleAccess={
                            ((did_p1_win: boolean | null) => {
                                switch(did_p1_win) {
                                    case true: return "Player 2 Loses"
                                    case false: return "Player 2 Wins"
                                    default: return "Did Player 2 Win?"
                                }
                            })(match.did_p1_win)
                        }
                        sx={{
                            ...(match.did_p1_win !== null && !match.did_p1_win
                                    ? { color: 'orange' }
                                    : { color: 'gray' }
                            )
                        }}
                    />
                </IconButton>
            </Stack>
            <Box width='30%'>
                <TextField
                    label='Player 2'
                    title='Player 2'
                    variant='standard'
                    helperText=' '
                    value={match.player2}
                    onChange={(event) => {
                        const newMatch = {
                            ...match,
                            player2: event.target.value,
                        }
                        setMatch(newMatch)
                    }}
                    fullWidth
                />
            </Box>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                width='15%'
            >
                <IconButton
                    title='Go to VOD'
                    aria-label='Go to VOD'
                    target="_blank"
                    href={fullVodUrl}
                    sx={{
                        color: 'black',
                        width: "25%"
                    }}
                >
                    <OndemandVideoIcon/>
                </IconButton>
                <IconButton
                    title='Swap Players'
                    aria-label='Swap Players'
                    onClick={swapPlayers}
                    sx={{
                        color: 'black',
                        width: "25%"
                    }}
                >
                    <SwapHorizIcon/>
                </IconButton>
                <IconButton
                    title='Duplicate'
                    aria-label='Duplicate'
                    onClick={duplicateThisRow}
                    sx={{
                        color: 'black',
                        width: "25%"
                    }}
                >
                    <ContentCopyIcon/>
                </IconButton>
                <IconButton
                    title='Delete'
                    aria-label='Delete'
                    onClick={deleteThisRow}
                    sx={{
                        color: 'black',
                        width: "25%"
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
    setAnchorElement: Dispatch<SetStateAction<HTMLElement | null>>
    open: boolean
    onClose: () => void
    setCharacter: (character: string) => void
}

const CharacterMenu = ({anchorElement, setAnchorElement, open, onClose, setCharacter }: CharacterMenuProps): ReactElement => {
    return (
        <Menu
            anchorEl={anchorElement}
            open={open}
            onClose={onClose}
        >
            {TFH_Characters.map((characterName: string, index: number) => (
                <MenuItem
                    key={index}
                    onClick={(_) => {
                        setCharacter(characterName)
                        setAnchorElement(null)
                    }}
                >
                    <ListItemIcon>
                        <CharacterIcon character={characterName}/>
                    </ListItemIcon>
                    <ListItemText>{characterName}</ListItemText>
                </MenuItem>
            ))}
        </Menu>
    )
}