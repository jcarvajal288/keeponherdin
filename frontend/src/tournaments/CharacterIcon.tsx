import arizonaIcon from '/resources/images/Arizona_Icon.jpg'
import oleanderIcon from '/resources/images/Oleander_Icon.jpg'
import paprikaIcon from '/resources/images/Paprika_Icon.jpg'
import pomIcon from '/resources/images/Pom_Icon.jpg'
import shantyIcon from '/resources/images/Shanty_Icon.jpg'
import tianhuoIcon from '/resources/images/Tianhuo_Icon.jpg'
import velvetIcon from '/resources/images/Velvet_Icon.jpg'
import {Box} from "@mui/material";

export const CharacterIcon = (props: { character: string }) => {
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

