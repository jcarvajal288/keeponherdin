import {Match} from "./tournaments/MatchRow";
import {useCallback} from "react";
import axios, {AxiosResponse} from "axios";
import {Tournament} from "./tournaments/TournamentTable";

type Api = {
    getMatches: () => Promise<Match[]>
    getMatchesByTournament: () => Promise<Match[][]>
    getTournament: (id: number) => Promise<Tournament | null>
    getPlayerList: () => Promise<string[]>
}

axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000`
const httpClient = axios.create({
    headers: { Accept: 'application/json' }
});

export const useApi = (): Api => {

    const getMatches = useCallback(
        (): Promise<Match[]> =>
            httpClient
                .get('/api/matches')
                .then((response: AxiosResponse) => {
                    return response.data as Match[];
                })
                .catch(() => Promise.resolve([])),
        [],
    )

    const getMatchesByTournament = useCallback(
        (): Promise<Match[][]> =>
            httpClient
                .get('/api/matches?sort=tournament')
                .then((response: AxiosResponse) => {
                    return response.data as Match[][];
                })
                .catch(() => Promise.resolve([[]])),
        [],
    )

    const getTournament = useCallback(
        (id: number): Promise<Tournament> =>
            httpClient
                .get(`/api/tournaments/${id}`)
                .then((response: AxiosResponse) => {
                    return response.data as Tournament
                })
                .catch(() => Promise.reject(null)),
        [],
    )

    const getPlayerList = useCallback(
        (): Promise<string[]> =>
            httpClient
                .get('/api/players')
                .then((response: AxiosResponse) => {
                    return response.data as string[];
                })
                .catch(() => Promise.resolve([])),
        [],
    )

    return {
        getMatches,
        getMatchesByTournament,
        getTournament,
        getPlayerList
    }
}