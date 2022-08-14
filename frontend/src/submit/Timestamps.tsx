import {ReactElement, useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography} from "@mui/material";
import {Tournament} from "../tournaments/TournamentTable";
import UndoIcon from "@mui/icons-material/Undo";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {startTimeRegex, TimestampRow} from "./TimestampRow";
import {TFH_Versions} from "../tfhData";
import {GenericModal} from "../GenericModal";
import {useNavigate} from "react-router-dom";

export type TimestampsProps = {
    setFormStep: (nextStep: string) => void
    tournament: Tournament
    setTournament: (tournament: Tournament) => void
    getPlayerList: () => Promise<string[]>
    saveTournament: (tournament: Tournament) => Promise<void>
    saveTimestamps: (timestamps: Match[]) => Promise<void>
}

export const Timestamps = ({
    setFormStep,
    tournament,
    setTournament,
    getPlayerList,
    saveTournament,
    saveTimestamps
}: TimestampsProps): ReactElement => {

    const [timestamps, setTimestamps] = useState<Match[]>([])

    const [playerList, setPlayerList] = useState<string[]>([])

    const [validationErrorDialogOpen, setValidationErrorDialogOpen] = useState<boolean>(false)

    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getPlayerList().then(setPlayerList)
    }, [getPlayerList])

    const emptyMatch: Match = {
        player1: "",
        character1: "Arizona",
        player2: "",
        character2: "Arizona",
        did_p1_win: null,
        start_time: "",
        tournament_id: -1
    }

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, "00");
        const day = (date.getDate()+1).toString().padStart(2, "00");
        return `${year}-${month}-${day}`
    }

    const addNewTimestamp = () => {
        setTimestamps([...timestamps, Object.assign({}, emptyMatch)])
    }

    const validateTimestamp = (timestamp: Match, matchNum: number): string[] => {
        const validateStartTime = (start_time: string): string => {
            if (start_time.length === 0)
                return `Match ${matchNum} - Timestamp is required.`
            else if (!startTimeRegex.exec(start_time))
                return `Match ${matchNum} - Timestamp format is incorrect.`
            else return ''
        }

        const validatePlayer = (playerName: string, playerDesignation: string): string => {
            if (playerName.length === 0)
                return `Match ${matchNum} - ${playerDesignation} is required.`
            else return ''
        }

        const validateDidP1Win = (did_P1_win: boolean | null): string => {
            if (did_P1_win === null)
                return `Match ${matchNum} - Winner not set (click grey trophy icons).`
            else return ''
        }

        return [
            validateStartTime(timestamp.start_time),
            validatePlayer(timestamp.player1, 'Player 1'),
            validateDidP1Win(timestamp.did_p1_win),
            validatePlayer(timestamp.player2, 'Player 2')
        ]
    }

    const validateTournament = (): boolean => {
        if (timestamps.length === 0) {
            setValidationErrors(['Tournament needs at least one match'])
            setValidationErrorDialogOpen(true)
            return false
        } else {
            const newValidationErrors: string[] = timestamps.flatMap<string>((timestamp, index) => {
                return validateTimestamp(timestamp, index + 1)
            }).filter((error) => error !== '')
            setValidationErrors(newValidationErrors)
            const validationFailed = newValidationErrors.length > 0
            setValidationErrorDialogOpen(validationFailed)
            return !validationFailed
        }
    }

    const initiateSave = async () => {
        if (validateTournament()) {
            await saveTournament(tournament)
            await saveTimestamps(timestamps.map((timestamp: Match) => {
                return {
                    ...timestamp,
                    tournament_id: tournament.id
                }
            }))
            console.log('before navigate')
            navigate('/')
        }
    }

    return (
        <Stack
            direction='column'
        >
            <Paper
                sx={{
                    padding: '20px'
                }}
            >
                <TextField
                    label='Title'
                    variant='standard'
                    defaultValue={tournament.title}
                    fullWidth
                    sx={{
                        marginBottom: '10px'
                    }}
                />
                <TextField
                    variant='standard'
                    label='Channel'
                    defaultValue={tournament.tournament_organizer}
                    fullWidth
                    sx={{
                        marginBottom: '10px'
                    }}
                />
                <TextField
                    variant='standard'
                    label='Date'
                    defaultValue={formatDate(tournament.date)}
                    fullWidth
                    sx={{
                        marginBottom: '10px'
                    }}
                />
                <FormControl
                    fullWidth
                    variant='standard'
                >
                    <InputLabel
                        id='version-label'
                    >
                        Version
                    </InputLabel>
                    <Select
                        title="Version"
                        aria-labelledby={'version-label'}
                        value={tournament.game_version}
                        onChange={(event) => {
                            setTournament({
                                ...tournament,
                                game_version: event.target.value
                            })
                        }}
                    >
                        {TFH_Versions.map((version: string, index: number) => (
                            <MenuItem
                                key={index}
                                value={version}
                            >
                                {`${version}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Stack
                    direction='column'
                >
                    {timestamps.map((match: Match, index) => (
                        <TimestampRow
                            key={index}
                            thisTimestampId={index}
                            initialMatch={match}
                            timestamps={timestamps}
                            setTimestamps={setTimestamps}
                            tournament={tournament}
                            playerList={playerList}
                        />
                    ))}
                </Stack>
                <Stack
                    direction='row'
                    sx={{
                        paddingTop: '20px'
                    }}
                >
                    <Button
                        variant='contained'
                        startIcon={<UndoIcon/>}
                        onClick={() => setFormStep("EnterLink")}
                        sx={{
                            marginRight: '10px'
                        }}
                    >
                        Start Over
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<PlaylistAddIcon/>}
                        onClick={addNewTimestamp}
                        sx={{
                            marginRight: '10px'
                        }}
                    >
                        Add Match
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<SaveIcon/>}
                        onClick={initiateSave}
                        sx={{
                            marginRight: '10px'
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </Stack>
            </Paper>
            {validationErrorDialogOpen && (
                <GenericModal>
                    <Stack
                        direction='column'
                    >
                        <Typography
                            variant='h5'
                            color='error'
                        >
                            Validation Errors
                        </Typography>
                        {validationErrors.map((error: string, index) => (
                            <Typography
                                data-testid='validation-error'
                                key={index}
                            >
                                {error}
                            </Typography>
                        ))}
                        <Button
                            sx={{
                                fontWeight: '700',
                                fontSize: '16px',
                                alignSelf: 'end'
                            }}
                            onClick={() => setValidationErrorDialogOpen(false)}
                        >
                            Ok
                        </Button>
                    </Stack>
                </GenericModal>
            )}
        </Stack>
    )
}