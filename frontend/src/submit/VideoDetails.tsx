import {Typography} from "@mui/material";

export type VideoDetailsProps = {
    setFormStep: (nextStep: string) => void;
}

export const VideoDetails = ({setFormStep}: VideoDetailsProps) => {
    return (
        <Typography>Title</Typography>
    )
}