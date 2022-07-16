import {describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
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
        tournament_organizer: "Javamorris",
        vod_link: "https://www.youtube.com/watch?v=Z5PsPVKZlmo"
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

    it('can add and delete a timestamp', async () => {
        renderTimestamps()
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        expect(await screen.findByLabelText('Timestamp')).toBeDefined()
        await userEvent.click(screen.getByLabelText('Delete'))
        expect(await screen.queryByLabelText('Timestamp')).toBeNull()
    })

    it('can duplicate a timestamp', async () => {
        renderTimestamps()
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        expect(await screen.findByLabelText('Timestamp')).toBeDefined()

        await userEvent.type(screen.getByLabelText('Timestamp'), '00h12m12s')
        await userEvent.type(screen.getByLabelText('Player 1'), 'player 1')
        await userEvent.type(screen.getByLabelText('Player 2'), 'player 2')

        await userEvent.click(screen.getByLabelText('Duplicate'))
        const timestamps = await screen.findAllByTestId('timestamp-row')
        expect(timestamps).toHaveLength(2)
        expect(within(timestamps[1]).getByLabelText<HTMLInputElement>('Timestamp').value).toEqual('00h12m12s')
        expect(within(timestamps[1]).getByLabelText<HTMLInputElement>('Player 1').value).toEqual('player 1')
        expect(within(timestamps[1]).getByLabelText<HTMLInputElement>('Player 2').value).toEqual('player 2')
    })
})
