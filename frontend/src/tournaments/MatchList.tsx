import {ReactElement} from 'react'
import {Match, MatchRow} from "./MatchRow";
import {Box, Divider, Stack} from "@mui/material";

export type MatchListProps = {
    matches: Match[];
}

export const MatchList = ({matches}: MatchListProps): ReactElement => {

    return (
        <Box
            paddingLeft='50px'
            paddingRight='50px'
        >
            <Stack
                direction='column'
                divider={<Divider orientation='horizontal' flexItem />}
            >
                {matches.map((match: Match, index) => (
                    <MatchRow
                        key={index}
                        match={match}
                    />
                ))}
            </Stack>
        </Box>
    )
}
