import {ReactElement} from 'react'
import './App.css'
import {useApi} from "./Api";
import {HeaderBar} from "./HeaderBar";
import {TournamentList} from "./tournaments/TournamentList";

const App = (): ReactElement => {
    const { getMatchesByTournament, getTournament} = useApi();

    return (
        <>
            <HeaderBar/>
            <TournamentList
                getTournament={getTournament}
                getMatchesByTournament={getMatchesByTournament}
            />
        </>
    )
}

export default App;
