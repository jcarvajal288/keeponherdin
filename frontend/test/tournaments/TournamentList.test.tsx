import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react';
import {Tournament} from "../../src/tournaments/TournamentTable";
import {TournamentList, TournamentListProps} from "../../src/tournaments/TournamentList";

/**
 * @vitest-environment jsdom
 */

const tournaments: Tournament[] = [
    {
        id: 1,
        title: "Rodeo Regional #100",
        date: new Date("2022-06-19"),
        gameVersion: "3.0",
        tournamentOrganizer: "Javamorris"
    },
    {
        id: 1,
        title: "Mad Cow Melee #56",
        date: new Date("2022-05-10"),
        gameVersion: "2.11",
        tournamentOrganizer: "Free"
    },
    {
        id: 1,
        title: "Mexican Mash Series #445",
        date: new Date("2021-11-23"),
        gameVersion: "2.8.1",
        tournamentOrganizer: "Vixy"
    },
]

describe('TournamentList', () => {

    const renderTournamentList = (props: Partial<TournamentListProps> = {}) => {
        return render(
            <TournamentList
                getTournaments={() => Promise.resolve([])}
                getMatches={(_) => Promise.resolve([])}
                {...props}
            />
        )
    }

    it('displays several tournaments', async () => {
        renderTournamentList({ getTournaments: () => Promise.resolve(tournaments) });
        expect(await screen.findAllByTestId('tournament-table')).toHaveLength(tournaments.length);
        expect(screen.getByText("Rodeo Regional #100")).toBeDefined();
        expect(screen.getByText("2022-06-19 | 3.0 | Javamorris")).toBeDefined();
        expect(screen.getByText("Mad Cow Melee #56")).toBeDefined();
        expect(screen.getByText("2022-05-10 | 2.11 | Free")).toBeDefined();
        expect(screen.getByText("Mexican Mash Series #445")).toBeDefined();
        expect(screen.getByText("2021-11-23 | 2.8.1 | Vixy")).toBeDefined();
    })
})