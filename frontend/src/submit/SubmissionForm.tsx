import {ReactElement, useEffect, useState} from "react";
import {Tournament} from "../tournaments/TournamentTable";
import {EnterLink} from "./EnterLink";
import {VideoDetails} from "./VideoDetails";
import {Box} from "@mui/material";

export const SubmissionForm = (): ReactElement => {

    const [formStep, setFormStep] = useState<string>("Enter Link");

    return (
        <Box
            marginTop='60px'
            width='90%'
            marginLeft='5%'
        >
            {
                ((formStep: string) => {
                    switch (formStep) {
                        case "Enter Link":
                            return <EnterLink setFormStep={setFormStep}/>
                        case "Video Details":
                            return <VideoDetails setFormStep={setFormStep}/>
                        default:
                            return <EnterLink setFormStep={setFormStep}/>
                    }
                })(formStep)
            }
        </Box>
    )
}