import {Match} from "./MatchRow";
import {useCallback} from "react";
import axios, {AxiosResponse} from "axios";

type Api = {
    getMatches: () => Promise<Match[]>;
}

const httpClient = axios.create({ headers: { Accept: 'application/json' } });

export const useApi = (): Api => {
    const getMatches = useCallback(
        (): Promise<Match[]> =>
            httpClient
                .get('http://localhost:8000/api/matches')
                .then((response: AxiosResponse) => {
                    console.log(response.data);
                    return response.data as Match[];
                })
                .catch(() => Promise.resolve([])),
        [],
    )

    return {
        getMatches,
    }
}