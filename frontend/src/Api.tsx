import {Match} from "./tournaments/MatchRow";
import {useCallback} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {formatDate, Tournament} from "./tournaments/TournamentTable";

const {GoogleAuth} = require('./google-auth-library')
// import {GoogleAuth} from "./google-auth-library.js"
const auth = new GoogleAuth();

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

axios.defaults.baseURL = `${window.location.protocol}//${import.meta.env.VITE_BACKEND_HOSTNAME}:8000`

const googleClient = axios.create({
    headers: {
        'Metadata-Flavor': 'Google'
    }
})

const fetchAuthToken = async () => {
    const audience = import.meta.env.VITE_FRONTEND_HOSTNAME
    // const url = `https://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${audience}`
    // const token = googleClient
    //     .get(url)
    //     .then((response: AxiosResponse) => {
    //         return response.data
    //     })
    //     .catch(() => 'token fetch failed')
    // console.log(token)
    // return token
    const client = await auth.getIdTokenClient(audience)
    const clientHeaders = await client.getRequestHeaders()
    console.log(clientHeaders)
    return clientHeaders['Authorization']
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