import {ReactElement, useState} from 'react'
import {Match, MatchRow} from "./MatchRow";
import {Box} from "@mui/material";

export type MatchListProps = {
    matches: Match[];
}

export const MatchList = ({matches}: MatchListProps): ReactElement => {
    return (
        <Box>
            {matches.map((match) => (
                <MatchRow match={match} />
            ))}
        </Box>
    )
}
