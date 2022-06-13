import { ReactElement} from "react";
import {Box, Stack, Typography} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export type Match = {
    player1: string;
    character1: string;
    player2: string;
    character2: string;
    did_p1_win: boolean;
    start_time: string;
}

export type MatchRowProps = {
    match: Match
}

const CharacterIcon = (props: { character: string }) => {
    const imageUrl = (char: string) => {
        if (char === 'Arizona') return 'resources/images/Arizona_Icon.jpg'
        if (char === 'Oleander') return 'resources/images/Oleander_Icon.jpg'
        if (char === 'Paprika') return 'resources/images/Paprika_Icon.jpg'
        if (char === 'Pom') return 'resources/images/Pom_Icon.jpg'
        if (char === 'Shanty') return 'resources/images/Shanty_Icon.jpg'
        if (char === 'Tianhuo') return 'resources/images/Tianhuo_Icon.jpg'
        if (char === 'Velvet') return 'resources/images/Velvet_Icon.jpg'
        else return 'resources/images/Unknown_Icon.jpg'
    }

    return (
        <Box
            component='img'
            alt={props.character}
            src={imageUrl(props.character)}
            borderRadius='50%'
            padding='0px 8px'
        />
    )
}

export const MatchRow = ({match}: MatchRowProps): ReactElement => {
    return (
        <>
            <Stack
                direction='row'
                data-testid='match-row'
                padding='5px'
            >
                <Stack
                    direction='row'
                    width='100%'
                    alignItems='center'
                    justifyContent='end'
                >
                     {match.did_p1_win
                         ? <EmojiEventsIcon
                             titleAccess='Player 1 Wins'
                             sx={{color: 'orange'}}
                         />
                         : <Box/>}
                    <Typography>{match.player1}</Typography>
                    <CharacterIcon character={match.character1} />
                </Stack>
                <Stack direction='column' justifyContent='center'>
                    <Typography>vs</Typography>
                </Stack>
                <Stack
                    direction='row'
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Stack
                        alignItems='center'
                        direction='row'
                    >
                        <CharacterIcon character={match.character2} />
                        <Typography>{match.player2}</Typography>
                        {match.did_p1_win
                            ? <Box/>
                            : <EmojiEventsIcon
                                titleAccess='Player 2 Wins'
                                sx={{color: 'orange'}}
                            />}
                    </Stack>
                    <OndemandVideoIcon titleAccess='Go To VOD'/>
                </Stack>
            </Stack>
        </>
    )
}