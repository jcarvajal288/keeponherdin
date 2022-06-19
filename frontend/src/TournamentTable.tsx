import {Stack, Typography} from "@mui/material";
import {ReactElement} from "react";

export type Tournament = {
    title: string;
    date: Date;
    gameVersion: string;
    tournamentOrganizer: string;
}

export type TournamentTableProps = {
    tournament: Tournament
}

export const TournamentTable = ({tournament}: TournamentTableProps): ReactElement => {

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, "00");
        const day = (date.getDate()+1).toString().padStart(2, "00");
        return `${year}-${month}-${day}`
    }

    return (
        <>
            <Stack
                direction='row'
                data-testid={'tournament-table'}
            >
                <Typography>{tournament.title}</Typography>
                <Typography>
                    {`${formatDate(tournament.date)} | ${tournament.gameVersion} | ${tournament.tournamentOrganizer}`}
                </Typography>
            </Stack>
        </>
    )
}