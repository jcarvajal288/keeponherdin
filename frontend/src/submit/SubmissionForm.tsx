import {ReactElement, useEffect, useState} from "react";
import {Tournament} from "../tournaments/TournamentTable";
import {EnterLink} from "./EnterLink";
import {VideoDetails} from "./VideoDetails";
import {Box} from "@mui/material";
import {Timestamps} from "./Timestamps";

export const SubmissionForm = (): ReactElement => {

    const [formStep, setFormStep] = useState<string>("Enter Link");
    const [vodLink, setVodLink] = useState<string>("")
    const [tournament, setTournament] = useState<Tournament>({
        id: -1,
        title: "",
        date: new Date(),
        game_version: "3.0",
        tournament_organizer: "",
        vod_link: ""
    })

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
                            return <EnterLink
                                setFormStep={setFormStep}
                                setVodLink={setVodLink}
                            />
                        case "Video Details":
                            return <VideoDetails
                                setFormStep={setFormStep}
                                setTournament={setTournament}
                                vodLink={vodLink}
                            />
                        case "Timestamps":
                            return <Timestamps
                                setFormStep={setFormStep}
                                tournament={tournament}
                            />
                        default:
                            return <EnterLink
                                setFormStep={setFormStep}
                                setVodLink={setVodLink}
                            />
                    }
                })(formStep)
            }
        </Box>
    )
}