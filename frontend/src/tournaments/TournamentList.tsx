import {ReactElement, useEffect, useState} from "react";
import {Stack} from "@mui/material";
import {Tournament, TournamentTable} from "./TournamentTable";

export type TournamentListProps = {
    getTournaments: () => Promise<Tournament[]>;
}

export const TournamentList = ({getTournaments}: TournamentListProps): ReactElement => {

    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        getTournaments().then(setTournaments)
    }, [getTournaments])

    return(
        <Stack
            direction='column'
        >
            {tournaments.map((tournament: Tournament) => (
                <TournamentTable tournament={tournament} />
            ))}
        </Stack>
    )
}