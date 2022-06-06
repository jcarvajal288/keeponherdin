import { describe, expect, it } from 'vitest'
import { MatchList } from "../src/MatchList";
import {render, screen} from '@testing-library/react';
import {Match} from "../src/MatchRow";

/**
 * @vitest-environment jsdom
 */

//import matches from "./resources/sampleMatches.json";

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


describe('MatchList', () => {

    const renderMatchList = (matches: Match[]) => {
        return render(
            <MatchList matches={matches}/>
        );
    };

    it('displays several matches', () => {
        renderMatchList(matches);
        expect(screen.getAllByTestId('match-row')).toHaveLength(matches.length);
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByText("Barlowe")).toBeDefined();
        expect(screen.getByText("Fresh")).toBeDefined();
    })
});