import {Match} from "./tournaments/MatchRow";
import {useCallback} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Tournament} from "./tournaments/TournamentTable";

type Api = {
    getMatches: () => Promise<Match[]>
    getMatchesByTournament: () => Promise<Match[][]>
    getTournament: (id: number) => Promise<Tournament | null>
    getPlayerList: () => Promise<string[]>
    saveTournament: (tournament: Tournament) => Promise<void>
    saveTimestamps: (timestamps: Match[]) => Promise<void>
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

    const saveTournament = useCallback(
        (tournament: Tournament): Promise<void> =>
            httpClient
                .post('api/tournaments', tournament)
                .then((_) => Promise.resolve())
                .catch((error: AxiosError) => Promise.reject(error)),
        [],
    )

    const saveTimestamps = useCallback(
        (timestamps: Match[]): Promise<void> =>
            httpClient
                .post('api/matches', timestamps)
                .then((_) => Promise.resolve())
                .catch((error: AxiosError) => Promise.reject(error)),
        [],
    )

    return {
        getMatches,
        getMatchesByTournament,
        getTournament,
        getPlayerList,
        saveTournament,
        saveTimestamps
    }
}