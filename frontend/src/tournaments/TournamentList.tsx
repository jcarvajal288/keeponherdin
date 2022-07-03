import {ReactElement, useEffect, useState} from "react";
import {Stack} from "@mui/material";
import {Tournament, TournamentTable} from "./TournamentTable";
import {Match} from "./MatchRow";
import {headerBarHeight} from "../HeaderBar";

export type TournamentListProps = {
    getTournament: (id: number) => Promise<Tournament | null>;
    getMatchesByTournament: () => Promise<Match[][]>;
}

export const TournamentList = ({getTournament, getMatchesByTournament}: TournamentListProps): ReactElement => {

    const [matchesByTournament, setMatchesByTournament] = useState<Match[][]>([[]]);

    useEffect(() => {
        getMatchesByTournament().then(setMatchesByTournament)
    }, [getMatchesByTournament])

    return (
        <Stack
            sx={{marginTop: headerBarHeight}}
            direction='column'
        >
            {matchesByTournament.map((matches: Match[], index) => (
                <TournamentTable
                    key={index}
                    getTournament={getTournament}
                    matches={matches}
                />
            ))}
        </Stack>
    )
}