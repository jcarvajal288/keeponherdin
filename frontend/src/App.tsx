import {ReactElement, useState} from 'react'
import { MatchList } from './MatchList'
import './App.css'

const App = (): ReactElement => {
  const [count, setCount] = useState(0)

  return (
    <MatchList/>
  )
}

export default App;
