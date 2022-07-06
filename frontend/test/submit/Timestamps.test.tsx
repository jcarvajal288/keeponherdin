import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {Timestamps} from "../../src/submit/Timestamps";
import {Tournament} from "../../src/tournaments/TournamentTable";
import userEvent from "@testing-library/user-event";

/**
 * @vitest-environment jsdom
 */

describe('Timestamps', () => {

    const tournament: Tournament = {
        id: 1,
        title: "Rodeo Regional #100",
        date: new Date("2022-06-19T06:00:00Z"),
        game_version: "3.0",
        tournament_organizer: "Javamorris"
    }

    const renderTimestamps = () => {
        render(
            <Timestamps
                setFormStep={() => {}}
                tournament={tournament}
            />
        )
    }

    it('UI Elements start with values from previous step', () => {
        renderTimestamps()
        const titleField = screen.getByLabelText('Title');
        const channelField = screen.getByLabelText('Channel');
        const dateField = screen.getByLabelText('Date');
        const versionField = screen.getByLabelText('Version');
        expect(screen.getByRole("button", { name: 'Start Over'})).toBeDefined();
        expect(screen.getByRole("button", { name: 'Add Match'})).toBeDefined();
        expect(screen.getByRole("button", { name: 'Save'})).toBeDefined();
        expect(screen.getByRole("button", { name: 'Delete'})).toBeDefined();
        expect((titleField as HTMLInputElement).value).toEqual('Rodeo Regional #100')
        expect(channelField).toBeDefined()
        expect((channelField as HTMLInputElement).value).toEqual('Javamorris')
        expect(dateField).toBeDefined()
        expect((dateField as HTMLInputElement).value).toEqual('2022-06-20')
        expect(versionField).toBeDefined()
        expect((versionField as HTMLInputElement).value).toEqual('3.0')
    })

    it('can add a timestamp', async () => {
        renderTimestamps()
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        expect(await screen.findByLabelText('Timestamp')).toBeDefined()
    })
})
