import {ReactElement, useEffect, useState} from 'react'
import { MatchList } from './MatchList'
import './App.css'
import {useApi} from "./Api";
import {HeaderBar} from "./HeaderBar";
import {TournamentList} from "./TournamentList";

// import matches from "../test/resources/sampleMatches.json";

const App = (): ReactElement => {
    const { getMatches, getTournaments} = useApi();

    return (
        <>
            <HeaderBar/>
            {/*<MatchList getMatches={getMatches}/>*/}
            <TournamentList getTournaments={getTournaments}/>
        </>
    )
}

export default App;
