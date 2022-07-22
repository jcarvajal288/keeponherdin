import {ReactElement, useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField} from "@mui/material";
import {Tournament} from "../tournaments/TournamentTable";
import UndoIcon from "@mui/icons-material/Undo";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {TimestampRow} from "./TimestampRow";
import {TFH_Versions} from "../tfhData";

type TimestampProps = {
    setFormStep: (nextStep: string) => void
    tournament: Tournament
    setTournament: (tournament: Tournament) => void
    getPlayerList: () => Promise<string[]>
}

export const Timestamps = ({setFormStep, tournament, setTournament, getPlayerList}: TimestampProps): ReactElement => {

    const [timestamps, setTimestamps] = useState<Match[]>([])

    const [playerList, setPlayerList] = useState<string[]>([])

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
                    <InputLabel>Version</InputLabel>
                    <Select
                        value={0}
                        title="Version"
                        label="Version"
                        defaultValue={0}
                        onChange={(event) => {
                            setTournament({
                                ...tournament,
                                game_version: TFH_Versions[event.target.value as number]
                            })
                        }}
                    >
                        {TFH_Versions.map((version: string, index: number) => (
                            <MenuItem
                                key={index}
                                value={index}
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
        </Stack>
    )
}