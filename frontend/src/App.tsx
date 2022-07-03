import {ReactElement} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {useApi} from "./Api";
import {HeaderBar} from "./HeaderBar";
import {TournamentList} from "./tournaments/TournamentList";
import {EnterLink} from "./submit/EnterLink";
import {SubmissionForm} from "./submit/SubmissionForm";

const App = (): ReactElement => {
    const { getMatchesByTournament, getTournament} = useApi();

    return (
        <>
            <BrowserRouter>
                <HeaderBar/>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <TournamentList
                                getTournament={getTournament}
                                getMatchesByTournament={getMatchesByTournament}
                            />
                        }
                    />
                    <Route
                        path='/add'
                        element={
                            <SubmissionForm/>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
