import { describe, expect, it } from 'vitest'
import {render, screen} from "@testing-library/react";
import { MatchRow, Match } from "../../src/tournaments/MatchRow";

const testMatches: Match[] = [
    {
        player1: "Vixy",
        character1: "Velvet",
        player2: "Oscar",
        character2: "Pom",
        did_p1_win: true,
        start_time: "00h45m32s",
        tournament_id: 1
    },
    {
        player1: "Barlowe",
        character1: "Tianhuo",
        player2: "Amaron",
        character2: "Oleander",
        did_p1_win: false,
        start_time: "00h45m32s",
        tournament_id: 1
    },
]

describe("MatchRow", () => {

    const renderMatchRow = (match: Match) => {
        return render(
            <MatchRow match={match}/>
        );
    };

    it('displays the match data', () => {
        renderMatchRow(testMatches[0]);
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByAltText("Velvet")).toBeDefined();
        expect(screen.getByAltText("Pom")).toBeDefined();
        expect(screen.getByText("Oscar")).toBeDefined();
        expect(screen.getByTestId("OndemandVideoIcon")).toBeDefined()
    })

    it('awards a trophy to the winner', () => {
        renderMatchRow(testMatches[0]);
        expect(screen.getByTitle('Player 1 Wins')).toBeDefined();
        expect(screen.queryByTitle('Player 2 Wins')).toThrow(TypeError);

        renderMatchRow(testMatches[1]);
        expect(screen.queryByTitle('Player 1 Wins')).toThrow(TypeError);
        expect(screen.getByTitle('Player 2 Wins')).toBeDefined();
    })
});
