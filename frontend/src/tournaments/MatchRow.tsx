import { ReactElement} from "react";
import {Box, Stack, Typography} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {CharacterIcon} from "./CharacterIcon";

export type Match = {
    player1: string;
    character1: string;
    player2: string;
    character2: string;
    did_p1_win: boolean | null;
    start_time: string;
    tournament_id: number;
}

export type MatchRowProps = {
    match: Match
}

export const MatchRow = ({match}: MatchRowProps): ReactElement => {
    return (
        <>
            <Stack
                direction='row'
                data-testid='match-row'
                justifyContent='space-between'
                padding='5px'
            >
                <Stack
                    direction='row'
                    width='100%'
                >
                    <Stack
                        alignItems='center'
                        width='100%'
                        maxWidth='50%'
                        flexDirection='row-reverse'
                    >
                        <CharacterIcon character={match.character1} />
                        <Typography
                            noWrap
                        >
                            {match.player1}
                        </Typography>
                        {match.did_p1_win
                            ? <EmojiEventsIcon
                                titleAccess='Player 1 Wins'
                                sx={{color: 'orange'}}
                            />
                            : <Box/>}
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <Typography>vs</Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        width='100%'
                        maxWidth='47%'
                        alignItems='center'
                    >
                        <CharacterIcon character={match.character2} />
                        <Typography
                            noWrap
                        >
                            {match.player2}
                        </Typography>
                        {match.did_p1_win
                            ? <Box/>
                            : <EmojiEventsIcon
                                titleAccess='Player 2 Wins'
                                sx={{color: 'orange'}}
                            />}
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    alignItems='center'
                >
                    <OndemandVideoIcon
                        titleAccess='Go To VOD'
                        color='primary'
                    />
                </Stack>
            </Stack>
        </>
    )
}