import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react';
import {Tournament, TournamentTable, TournamentTableProps} from "../../src/tournaments/TournamentTable";
import {matches} from "./MatchList.test";

const tournament: Tournament = {
    id: 1,
    title: "Rodeo Regional #100",
    date: new Date("2022-06-19T06:00:00Z"),
    game_version: "3.0",
    tournament_organizer: "Javamorris",
    vod_link: "https://www.youtube.com/watch?v=Z5PsPVKZlmo"
}

describe('TournamentTable', () => {

    const renderTournamentTable = (props: Partial<TournamentTableProps>) => {
        return render(
            <TournamentTable
                getTournament={(_: number) => {
                    return Promise.resolve(tournament)
                }}
                matches={[]}
                {...props}
            />
        )
    }

    it('shows the tournament information and matches', async () => {
        const infoString = '2022-06-20 | 3.0 | Javamorris';
        renderTournamentTable({
            getTournament: (_: number) => {
                return Promise.resolve(tournament)
            },
            matches: matches
        });
        expect(await screen.findAllByTestId('match-row')).toHaveLength(matches.length);
        expect(screen.getByText('Rodeo Regional #100')).toBeDefined();
        expect(screen.getByText(infoString)).toBeDefined();
        expect(screen.getByText("Vixy")).toBeDefined();
        expect(screen.getByText("Barlowe")).toBeDefined();
        expect(screen.getByText("Fresh")).toBeDefined();
    })
})