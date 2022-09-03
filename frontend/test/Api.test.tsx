import {afterAll, beforeAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node';
import {Match} from "../src/tournaments/MatchRow";
import {matchRequestUrl, MockedRequest, rest} from "msw";
import {renderHook} from "@testing-library/react";
import {useApi} from "../src/Api";

const matches: Match[] = [
    {
        player1: "Vixy",
        character1: "Velvet",
        player2: "Oscar",
        character2: "Pom",
        did_p1_win: false,
        start_time: "00:30:12",
        tournament_id: 1
    },
    {
        player1: "Barlowe",
        character1: "Tianhuo",
        player2: "Amaron",
        character2: "Oleander",
        did_p1_win: true,
        start_time: "00:45:32",
        tournament_id: 1
    },
    {
        player1: "Fresh",
        character1: "Paprika",
        player2: "DigitalDog",
        character2: "Shanty",
        did_p1_win: true,
        start_time: "01:05:32",
        tournament_id: 1
    },
]

describe('Api', () => {

    const mockServer = setupServer();
    beforeAll(() => {
        mockServer.listen();
    })

    afterAll(() => {
        mockServer.restoreHandlers();
    })

    afterAll(() => {
        mockServer.close();
    })

    const waitForRequest = (method: string, url: string) => {
        let requestId = ''
        return new Promise<MockedRequest>((resolve, reject) => {
            mockServer.events.on('request:start', (req) => {
                const matchesMethod = req.method.toLowerCase() === method.toLowerCase()
                const matchesUrl = matchRequestUrl(req.url, url).matches

                if (matchesMethod && matchesUrl) {
                    requestId = req.id
                }
            })

            mockServer.events.on('request:match', (req) => {
                if (req.id === requestId) {
                    resolve(req)
                }
            })

            mockServer.events.on('request:unhandled', (req) => {
                if (req.id === requestId) {
                    reject(
                        new Error(`The ${req.method} ${req.url.href} request was unhandled.`)
                    )
                }
            })
        })
    }

    it('getMatches returns existing matches', async () => {
        mockServer.use(rest.get('http://localhost:8000/api/matches', (req, res, ctx) => res(ctx.json(matches))));
        const { result } = renderHook(() => useApi());
        await expect(result.current.getMatches()).resolves.toEqual(matches);
    })

    // it('includes a gc ID token in an Authorization: Bearer ID_TOKEN header', async () => {
    //     mockServer.use(rest.get('http://localhost:8000/api/matches', (req, res, ctx) => res(ctx.json(matches))));
    //     const pendingRequest = waitForRequest('GET', '/api/matches')
    //
    //     const { result } = renderHook(() => useApi());
    //     await result.current.getMatches()
    //
    //     const request = await pendingRequest
    //     expect(request.headers.get('Authorization: Bearer')).toBeDefined()
    // }, 20000)
})
