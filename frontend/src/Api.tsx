import {Match} from "./tournaments/MatchRow";
import {useCallback} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {formatDate, Tournament} from "./tournaments/TournamentTable";

type Api = {
    getMatches: () => Promise<Match[]>
    getMatchesByTournament: () => Promise<Match[][]>
    getTournament: (id: number) => Promise<Tournament | null>
    getPlayerList: () => Promise<string[]>
    saveTournament: (tournament: Tournament) => Promise<{ id: number }>
    saveTimestamps: (timestamps: Match[]) => Promise<void>
}

const serializeTournament = (tournament: Tournament) => {
    return {
        ...tournament,
        date: formatDate(tournament.date)
    }
}

axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000`

const googleClient = axios.create({
    headers: {
        'Metadata-Flavor': 'Google'
    }
})

const fetchAuthToken = async () => {
    const audience = 'https://keeponherdin-backend-4yoikpttcq-uc.a.run.app'
    const url = `https://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${audience}`
    const token = googleClient
        .get(url)
        .then((response: AxiosResponse) => {
            return response.data
        })
        .catch(() => 'token fetch failed')
    console.log(token)
    return token
    // // const {GoogleAuth} = require('google-auth-library')
    // const auth = new GoogleAuth();
    // const client = await auth.getIdTokenClient(audience)
    // const fullUrl = audience + url
    // const res = await client.request({url: fullUrl})
    // return res.data
}

const httpClient = axios.create({
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${fetchAuthToken()}`
        }
    });

export const useApi = (): Api => {

    const getMatches = useCallback(
        (): Promise<Match[]> => {
            const url = '/api/matches'
            return httpClient
                .get(url)
                .then((response: AxiosResponse) => {
                    return response.data as Match[];
                })
                .catch(() => Promise.resolve([]))
        },
        []
    )

    const getMatchesByTournament = useCallback(
        (): Promise<Match[][]> => {
            return httpClient
                .get('/api/matches?sort=tournament')
                .then((response: AxiosResponse) => {
                    return response.data as Match[][];
                })
                .catch(() => Promise.resolve([[]]))
        },
        []
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
        (tournament: Tournament): Promise<{ id: number }> =>
            httpClient
                .post('/api/tournaments', serializeTournament(tournament))
                .then((response: AxiosResponse) => Promise.resolve(response.data))
                .catch((error: AxiosError) => Promise.reject(error)),
        [],
    )

    const saveTimestamps = useCallback(
        (timestamps: Match[]): Promise<void> =>
            httpClient
                .post('/api/matches', timestamps)
                .then((_: AxiosResponse) => Promise.resolve())
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