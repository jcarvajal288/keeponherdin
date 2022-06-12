import { ReactElement} from "react";
import {Box, Stack, Typography} from "@mui/material";

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
                data-testid='match-row'
                direction='row'
                justifyContent='center'
                alignItems='center'
                padding='5px'
            >
                <Typography>{match.player1}</Typography>
                <CharacterIcon character={match.character1} />
                <Typography>VS</Typography>
                <CharacterIcon character={match.character2} />
                <Typography>{match.player2}</Typography>
            </Stack>
        </>
    )
}