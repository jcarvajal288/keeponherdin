import { describe, expect, it } from 'vitest'
import {MatchList, MatchListProps} from "../../src/tournaments/MatchList";
import {render, screen} from '@testing-library/react';
import {Match} from "../../src/tournaments/MatchRow";


/**
 * @vitest-environment jsdom
 */

export const matches: Match[] = [
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
        tournament_id: 2
    },
    {
        player1: "Fresh",
        character1: "Paprika",
        player2: "DigitalDog",
        character2: "Shanty",
        did_p1_win: true,
        start_time: "01:05:32",
        tournament_id: 3
    },
]


describe('MatchList', () => {

    const renderMatchList = (matches: Match[]) => {
        return render(
            <MatchList matches={matches} />
        );
    };

    it('displays several matches', async () => {
        renderMatchList(matches);
        expect(await screen.findAllByTestId('match-row')).toHaveLength(matches.length);
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByText("Barlowe")).toBeDefined();
        expect(screen.getByText("Fresh")).toBeDefined();
    })
});