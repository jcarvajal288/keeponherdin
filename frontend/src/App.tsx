import {ReactElement, useEffect, useState} from 'react'
import { MatchList } from './MatchList'
import './App.css'
import {useApi} from "./Api";
import {HeaderBar} from "./HeaderBar";

// import matches from "../test/resources/sampleMatches.json";

const App = (): ReactElement => {
    const { getMatches, } = useApi();

    return (
        <>
            <HeaderBar/>
            <MatchList getMatches={getMatches}/>
        </>
    )
}

export default App;
