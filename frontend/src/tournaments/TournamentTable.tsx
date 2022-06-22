import {Stack, Typography} from "@mui/material";
import {ReactElement, useEffect, useState} from "react";
import {Match} from "./MatchRow";
import {MatchList} from "./MatchList";

export type Tournament = {
    id: number;
    title: string;
    date: Date;
    game_version: string;
    tournament_organizer: string;
}

export type TournamentTableProps = {
    tournament: Tournament;
    getMatches: (tournamentId: number) => Promise<Match[]>;
}

export const TournamentTable = ({tournament, getMatches}: TournamentTableProps): ReactElement => {

    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        getMatches(tournament.id).then(setMatches)
    }, [getMatches])

    const formatDate = (date: Date) => {
        const isoDate = new Date(date);
        const year = isoDate.getFullYear();
        const month = (isoDate.getMonth()+1).toString().padStart(2, "00");
        const day = (isoDate.getDate()+1).toString().padStart(2, "00");
        return `${year}-${month}-${day}`
    }

    return (
        <>
            <Stack
                direction='column'
                data-testid={'tournament-table'}
                paddingTop='30px'
            >
                <Typography>{tournament.title}</Typography>
                <Typography>
                    {`${formatDate(tournament.date)} | ${tournament.game_version} | ${tournament.tournament_organizer}`}
                </Typography>
                <MatchList matches={matches} />
            </Stack>
        </>
    )
}