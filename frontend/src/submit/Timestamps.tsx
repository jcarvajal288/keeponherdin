import {ReactElement, useState} from "react";
import {Button, Paper, Stack, TextField} from "@mui/material";
import {Tournament} from "../tournaments/TournamentTable";
import UndoIcon from "@mui/icons-material/Undo";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Match} from "../tournaments/MatchRow";
import {TimestampRow} from "./TimestampRow";

type TimestampProps = {
    setFormStep: (nextStep: string) => void
    tournament: Tournament
}

export const Timestamps = ({setFormStep, tournament}: TimestampProps): ReactElement => {

    const [timestamps, setTimestamps] = useState<Match[]>([])

    const emptyMatch: Match = {
        player1: "",
        character1: "Arizona",
        player2: "",
        character2: "Arizona",
        did_p1_win: true,
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
                <TextField
                    variant='standard'
                    label='Version'
                    defaultValue="3.0"
                    fullWidth
                />
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