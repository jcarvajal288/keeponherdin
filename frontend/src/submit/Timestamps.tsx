import {ReactElement} from "react";
import {TextField} from "@mui/material";
import {Tournament} from "../tournaments/TournamentTable";

type TimestampProps = {
    setFormStep: (nextStep: string) => void
    tournament: Tournament
}

export const Timestamps = ({setFormStep, tournament}: TimestampProps): ReactElement => {
    return (
        <TextField label='Version'/>
    )
}