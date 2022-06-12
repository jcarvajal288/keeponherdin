import {ReactElement, useState} from 'react'
import { MatchList } from './MatchList'
import './App.css'

import matches from "../test/resources/sampleMatches.json";

const App = (): ReactElement => {
  const [count, setCount] = useState(0)

  return (
    <MatchList matches={matches}/>
  )
}

export default App;
