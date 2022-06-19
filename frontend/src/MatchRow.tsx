import { ReactElement} from "react";
import {Box, Paper, Stack, Typography} from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import arizonaIcon from '/resources/images/Arizona_Icon.jpg'
import oleanderIcon from '/resources/images/Oleander_Icon.jpg'
import paprikaIcon from '/resources/images/Paprika_Icon.jpg'
import pomIcon from '/resources/images/Pom_Icon.jpg'
import shantyIcon from '/resources/images/Shanty_Icon.jpg'
import tianhuoIcon from '/resources/images/Tianhuo_Icon.jpg'
import velvetIcon from '/resources/images/Velvet_Icon.jpg'

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
        if (char === 'Arizona') return arizonaIcon
        if (char === 'Oleander') return oleanderIcon
        if (char === 'Paprika') return paprikaIcon
        if (char === 'Pom') return pomIcon
        if (char === 'Shanty') return shantyIcon
        if (char === 'Tianhuo') return tianhuoIcon
        if (char === 'Velvet') return velvetIcon
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
                    maxWidth='40%'
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
                {/*<OndemandVideoIcon titleAccess='Go To VOD'/>*/}
            </Stack>
        </>
        // <>
        //     <Stack
        //         direction='row'
        //         data-testid='match-row'
        //         padding='5px'
        //         alignItems='center'
        //         component={Paper}
        //         bgcolor='#E4E4E4'
        //     >
        //         <Stack
        //             direction='row'
        //             width='100%'
        //             alignItems='center'
        //             justifyContent='flex-end'
        //         >
        //             <Stack
        //                 direction='row'
        //                 maxWidth='80%'
        //             >
        //                 {match.did_p1_win
        //                     ? <EmojiEventsIcon
        //                         titleAccess='Player 1 Wins'
        //                         sx={{color: 'orange'}}
        //                     />
        //                     : <Box/>}
        //                 <Typography noWrap>{match.player1}</Typography>
        //                 <CharacterIcon character={match.character1} />
        //             </Stack>
        //         </Stack>
        //         <Stack
        //             direction='column'
        //             display='flex'
        //         >
        //             <Typography>vs</Typography>
        //         </Stack>
        //         <Stack
        //             direction='row'
        //             width='100%'
        //             alignItems='center'
        //             justifyContent='space-between'
        //         >
        //             <Stack
        //                 alignItems='center'
        //                 direction='row'
        //                 position='absolute'
        //                 maxWidth='40%'
        //             >
        //                 <CharacterIcon character={match.character2} />
        //                 <Typography
        //                     noWrap
        //                 >{match.player2}</Typography>
        //                 {match.did_p1_win
        //                     ? <Box/>
        //                     : <EmojiEventsIcon
        //                         titleAccess='Player 2 Wins'
        //                         sx={{color: 'orange'}}
        //                     />}
        //             </Stack>
        //         </Stack>
        //         <OndemandVideoIcon titleAccess='Go To VOD'/>
        //     </Stack>
        // </>
    )
}