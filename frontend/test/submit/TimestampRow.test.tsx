import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {TimestampRow} from "../../src/submit/TimestampRow";
import {Match} from "../../src/tournaments/MatchRow";

describe('TimestampRow', () => {

    const emptyMatch: Match = {
        player1: "",
        character1: "",
        player2: "",
        character2: "",
        did_p1_win: true,
        start_time: "",
        tournament_id: -1
    }

    it('UI Elements', () => {
        render(<TimestampRow initialMatch={emptyMatch}/>)
        expect(screen.getByLabelText('Timestamp')).toBeDefined()
        expect(screen.getByLabelText('Player 1')).toBeDefined()
        expect(screen.getByLabelText('Player 2')).toBeDefined()
        expect(screen.getByTestId("OndemandVideoIcon")).toBeDefined()
        expect(screen.getByTestId("SwapHorizIcon")).toBeDefined()
        expect(screen.getByTestId("DeleteIcon")).toBeDefined()
    })
})