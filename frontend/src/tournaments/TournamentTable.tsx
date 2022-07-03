import {Stack, Typography} from "@mui/material";
import {ReactElement, useEffect, useState} from "react";
import {Match} from "./MatchRow";
import {MatchList} from "./MatchList";
import {matches} from "../../test/tournaments/MatchList.test";

export type Tournament = {
    id: number;
    title: string;
    date: Date;
    game_version: string;
    tournament_organizer: string;
}

export type TournamentTableProps = {
    getTournament: (id: number) => Promise<Tournament | null>;
    matches: Match[];
}

export const TournamentTable = ({getTournament, matches}: TournamentTableProps): ReactElement => {

    const [tournament, setTournament] = useState<Tournament | null>(null);

    useEffect(() => {
        if (matches.length === 0) {
            setTournament(null)
        } else {
            const id = matches[0].tournament_id;
            getTournament(id).then(setTournament)
        }
    }, [matches])

    const formatDate = (date: Date) => {
        const isoDate = new Date(date);
        const year = isoDate.getFullYear();
        const month = (isoDate.getMonth()+1).toString().padStart(2, "00");
        const day = (isoDate.getDate()+1).toString().padStart(2, "00");
        return `${year}-${month}-${day}`
    }

    if(!tournament) return (<></>);
    return (
        <>
            <Stack
                direction='column'
                data-testid={'tournament-table'}
                paddingTop='30px'
            >
                <Stack
                    direction='column'
                    paddingLeft='50px'
                >
                    <Typography>{tournament.title}</Typography>
                    <Typography>
                        {`${formatDate(tournament.date)} | ${tournament.game_version} | ${tournament.tournament_organizer}`}
                    </Typography>
                </Stack>
                <MatchList matches={matches} />
            </Stack>
        </>
    )
}