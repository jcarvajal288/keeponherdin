import {ReactElement, useEffect, useState} from 'react'
import {Match, MatchRow} from "./MatchRow";
import {Box, Divider, Stack} from "@mui/material";

export type MatchListProps = {
    getMatches: () => Promise<Match[]>;
}

export const MatchList = ({getMatches}: MatchListProps): ReactElement => {

    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        getMatches().then(setMatches)
    }, [getMatches])

    return (
        <Box
            padding='50px'
        >
            <Stack
                direction='column'
                // divider={<Divider orientation='horizontal' flexItem />}
            >
                {matches.map((match: Match) => (
                    <MatchRow match={match} />
                ))}
            </Stack>
        </Box>
    )
}
