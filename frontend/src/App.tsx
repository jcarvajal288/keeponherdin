import {ReactElement, useEffect, useState} from 'react'
import { MatchList } from './MatchList'
import './App.css'
import {useApi} from "./Api";

// import matches from "../test/resources/sampleMatches.json";

const App = (): ReactElement => {
    const { getMatches, } = useApi();

    return (
        <MatchList getMatches={getMatches}/>
    )
}

export default App;
