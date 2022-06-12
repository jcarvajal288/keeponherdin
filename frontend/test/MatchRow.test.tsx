import { describe, expect, it } from 'vitest'
import {render, screen} from "@testing-library/react";
import { MatchRow, Match } from "../src/MatchRow";

const testMatch: Match = {
    player1: "Vixy",
    character1: "Velvet",
    player2: "Oscar",
    character2: "Pom",
    did_p1_win: false,
    start_time: "00:45:32"
}

describe("MatchRow", () => {

    const renderMatchRow = (match: Match) => {
        return render(
            <MatchRow match={match}/>
        );
    };

    it('displays the match data', () => {
        renderMatchRow(testMatch);
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByAltText("Velvet")).toBeDefined();
        expect(screen.getByAltText("Pom")).toBeDefined();
        expect(screen.getByText("Oscar")).toBeDefined();
    })
});
