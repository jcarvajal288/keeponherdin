import {ReactElement, useState} from "react";
import {Tournament} from "../tournaments/TournamentTable";
import {EnterLink} from "./EnterLink";
import {VideoDetails} from "./VideoDetails";
import {Box} from "@mui/material";
import {Timestamps} from "./Timestamps";
import {Match} from "../tournaments/MatchRow";
import {TFH_Versions} from "../tfhData";

type SubmissionFormProps = {
    getPlayerList: () => Promise<string[]>
    saveTournament: (tournament: Tournament) => Promise<{ id: number }>
    saveTimestamps: (timestamps: Match[]) => Promise<void>
}

export const SubmissionForm = ({ getPlayerList, saveTournament, saveTimestamps }: SubmissionFormProps): ReactElement => {

    const [formStep, setFormStep] = useState<string>("Enter Link");
    const [vodLink, setVodLink] = useState<string>("")
    const [tournament, setTournament] = useState<Tournament>({
        id: -1,
        title: "",
        date: new Date(),
        game_version: TFH_Versions[0],
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
                                setTournament={setTournament}
                                getPlayerList={getPlayerList}
                                saveTournament={saveTournament}
                                saveTimestamps={saveTimestamps}
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