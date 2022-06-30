import {ReactElement, useEffect, useState} from "react";
import {Stack} from "@mui/material";
import {Tournament, TournamentTable} from "./TournamentTable";
import {Match} from "./MatchRow";

export type TournamentListProps = {
    getTournaments: () => Promise<Tournament[]>;
    getMatches: () => Promise<Match[]>;
}

export const TournamentList = ({getTournaments, getMatches}: TournamentListProps): ReactElement => {

    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        getTournaments().then(setTournaments)
    }, [getTournaments])

    useEffect(() => {
        getMatches().then(setMatches)
    }, [getMatches])

    return(
        <Stack
            sx={{marginTop: "20px"}}
            direction='column'
        >
            {tournaments.map((tournament: Tournament, index) => (
                <TournamentTable
                    key={index}
                    tournament={tournament}
                    matches={matches}
                />
            ))}
        </Stack>
    )
}