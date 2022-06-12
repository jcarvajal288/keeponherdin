import {ReactElement, useState} from 'react'
import {Match, MatchRow} from "./MatchRow";
import {Box, Divider, Stack} from "@mui/material";

export type MatchListProps = {
    matches: Match[];
}

export const MatchList = ({matches}: MatchListProps): ReactElement => {
    return (
        <Box
            padding='50px'
        >
            <Stack
                direction='column'
                divider={<Divider orientation='horizontal' flexItem />}
            >
                {matches.map((match: Match) => (
                    <MatchRow match={match} />
                ))}
            </Stack>
        </Box>
    )
}
