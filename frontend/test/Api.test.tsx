import {afterAll, beforeAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node';
import {Match} from "../src/MatchRow";
import {rest} from "msw";
import {renderHook} from "@testing-library/react";
import {useApi} from "../src/Api";

const matches: Match[] = [
    {
        player1: "Vixy",
        character1: "Velvet",
        player2: "Oscar",
        character2: "Pom",
        did_p1_win: false,
        start_time: "00:30:12"
    },
    {
        player1: "Barlowe",
        character1: "Tianhuo",
        player2: "Amaron",
        character2: "Oleander",
        did_p1_win: true,
        start_time: "00:45:32"
    },
    {
        player1: "Fresh",
        character1: "Paprika",
        player2: "DigitalDog",
        character2: "Shanty",
        did_p1_win: true,
        start_time: "01:05:32"
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

    it('getMatches returns existing matches', async () => {
        mockServer.use(rest.get('/api/matches', (req, res, ctx) => res(ctx.json(matches))));
        const { result } = renderHook(() => useApi());
        await expect(result.current.getMatches()).resolves.toEqual(matches);
    })
})
