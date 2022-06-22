import {ReactElement} from 'react'
import './App.css'
import {useApi} from "./Api";
import {HeaderBar} from "./HeaderBar";
import {TournamentList} from "./tournaments/TournamentList";

const App = (): ReactElement => {
    const { getMatches, getTournaments} = useApi();

    return (
        <>
            <HeaderBar/>
            <TournamentList
                getTournaments={getTournaments}
                getMatches={getMatches}
            />
        </>
    )
}

export default App;
