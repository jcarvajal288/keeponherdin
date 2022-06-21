import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react';
import {Tournament, TournamentTable, TournamentTableProps} from "../../src/tournaments/TournamentTable";
import {matches} from "./MatchList.test";

const tournament: Tournament = {
    id: 1,
    title: "Rodeo Regional #100",
    date: new Date("2022-06-19"),
    game_version: "3.0",
    tournament_organizer: "Javamorris"
}

describe('TournamentTable', () => {

    const renderTournamentTable = ({tournament, getMatches}: TournamentTableProps) => {
        return render(
            <TournamentTable
                tournament={tournament}
                getMatches={getMatches}/>
        )
    }

    it('shows the tournament information and matches', async () => {
        const infoString = '2022-06-19 | 3.0 | Javamorris';
        renderTournamentTable( { tournament: tournament, getMatches: (_) => Promise.resolve(matches) });
        expect(screen.getByText('Rodeo Regional #100')).toBeDefined();
        expect(screen.getByText(infoString)).toBeDefined();
        expect(await screen.findAllByTestId('match-row')).toHaveLength(matches.length);
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByText("Barlowe")).toBeDefined();
        expect(screen.getByText("Fresh")).toBeDefined();
    })
})