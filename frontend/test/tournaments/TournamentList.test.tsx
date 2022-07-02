import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react';
import {Tournament} from "../../src/tournaments/TournamentTable";
import {TournamentList, TournamentListProps} from "../../src/tournaments/TournamentList";
import {matches} from "./MatchList.test";
import {Match} from "../../src/tournaments/MatchRow";

/**
 * @vitest-environment jsdom
 */

const tournaments: Tournament[] = [
    {
        id: 1,
        title: "Rodeo Regional #100",
        date: new Date("2022-06-19T06:00:00Z"),
        game_version: "3.0",
        tournament_organizer: "Javamorris"
    },
    {
        id: 2,
        title: "Mad Cow Melee #56",
        date: new Date("2022-05-10T06:00:00Z"),
        game_version: "2.11",
        tournament_organizer: "Free"
    },
    {
        id: 3,
        title: "Mexican Mash Series #445",
        date: new Date("2021-11-23T06:00:00Z"),
        game_version: "2.8.1",
        tournament_organizer: "Vixy"
    },
]

describe('TournamentList', () => {

    const renderTournamentList = (props: Partial<TournamentListProps> = {}) => {
        return render(
            <TournamentList
                getTournament={(id: number) => {
                    return Promise.resolve(tournaments[id-1])
                }}
                getMatchesByTournament={() => {
                    const matchArray = matches.map((match: Match) => [match])
                    return Promise.resolve(matchArray)
                }}
                {...props}
            />
        )
    }

    it('displays several tournaments', async () => {
        renderTournamentList();
        expect(await screen.findAllByTestId('tournament-table')).toHaveLength(tournaments.length);
        expect(screen.getByText("Rodeo Regional #100")).toBeDefined();
        expect(screen.getByText("2022-06-20 | 3.0 | Javamorris")).toBeDefined();
        expect(screen.getByText("Mad Cow Melee #56")).toBeDefined();
        expect(screen.getByText("2022-05-11 | 2.11 | Free")).toBeDefined();
        expect(screen.getByText("Mexican Mash Series #445")).toBeDefined();
        expect(screen.getByText("2021-11-24 | 2.8.1 | Vixy")).toBeDefined();
    })
})