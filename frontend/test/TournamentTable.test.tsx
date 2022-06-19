import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react';
import {Tournament, TournamentTable} from "../src/TournamentTable";

const tournament: Tournament = {
    title: "Rodeo Regional #100",
    date: new Date("2022-06-19"),
    gameVersion: "3.0",
    tournamentOrganizer: "Javamorris"
}

describe('TournamentTable', () => {

    const renderTournamentTable = (tournament: Tournament) => {
        return render(
            <TournamentTable tournament={tournament}/>
        )
    }

    it('shows the tournament information', () => {
        const infoString = '2022-06-19 | 3.0 | Javamorris';
        renderTournamentTable(tournament);
        expect(screen.getByText('Rodeo Regional #100')).toBeDefined();
        expect(screen.getByText(infoString)).toBeDefined();
    })
})