import {ReactElement, useEffect, useState} from "react";
import {Stack} from "@mui/material";
import {Tournament, TournamentTable} from "./TournamentTable";
import {Match} from "./MatchRow";

export type TournamentListProps = {
    getTournaments: () => Promise<Tournament[]>;
    getMatches: (tournamentId: number) => Promise<Match[]>;
}

export const TournamentList = ({getTournaments, getMatches}: TournamentListProps): ReactElement => {

    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        getTournaments().then(setTournaments)
    }, [getTournaments])

    return(
        <Stack
            direction='column'
        >
            {tournaments.map((tournament: Tournament, index) => (
                <TournamentTable
                    key={index}
                    tournament={tournament}
                    getMatches={getMatches}
                />
            ))}
        </Stack>
    )
}