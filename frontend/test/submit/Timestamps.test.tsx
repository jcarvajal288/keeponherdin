import {describe, expect, it, vi} from "vitest";
import {render, screen, within} from "@testing-library/react";
import {Timestamps, TimestampsProps} from "../../src/submit/Timestamps";
import {Tournament} from "../../src/tournaments/TournamentTable";
import userEvent from "@testing-library/user-event";
import {TFH_Versions} from "../../src/tfhData";
import {act} from "react-dom/test-utils";
import App from "../../src/App";
import {TimestampRowProps} from "../../src/submit/TimestampRow";
import {Match} from "../../src/tournaments/MatchRow";

/**
 * @vitest-environment jsdom
 */

describe('Timestamps', () => {

    const tournament: Tournament = {
        id: 1,
        title: "Rodeo Regional #100",
        date: new Date("2022-06-19T06:00:00Z"),
        game_version: TFH_Versions[0],
        tournament_organizer: "Javamorris",
        vod_link: "https://www.youtube.com/watch?v=Z5PsPVKZlmo"
    }

    const renderTimestamps = (props: Partial<TimestampsProps>) => {
        render(
            <Timestamps
                setFormStep={() => {}}
                tournament={tournament}
                setTournament={(_tournament) => {}}
                getPlayerList={() => Promise.resolve([])}
                saveTournament={() => Promise.resolve()}
                saveTimestamps={() => Promise.resolve()}
                {...props}
            />
        )
    }

    it('can pick a predefined game version', async () => {
        renderTimestamps({})
        expect(screen.queryByRole('option', { name: '2.0' })).toBeNull()
        await userEvent.click(screen.getByRole('button', { name: TFH_Versions[0] }))
        TFH_Versions.map(async (version) => {
            expect(await screen.findByRole('option', { name: version })).toBeDefined()
        })
        await userEvent.click(screen.getByRole('option', { name: '2.0'}))
        expect(screen.queryByRole('option', { name: '2.0' })).toBeNull()
        // TODO fix: expect(await screen.findByText('button', { name: '2.0' })).toBeDefined()
    })

    it('can add and delete a timestamp', async () => {
        renderTimestamps({})
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        expect(await screen.findByLabelText('Timestamp')).toBeDefined()
        await userEvent.click(screen.getByLabelText('Delete'))
        expect(await screen.queryByLabelText('Timestamp')).toBeNull()
    })

    it('can duplicate a timestamp', async () => {
        renderTimestamps({})
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        expect(await screen.findByLabelText('Timestamp')).toBeDefined()

        await userEvent.type(screen.getByLabelText('Timestamp'), '00h12m12s')
        await userEvent.type(screen.getByTestId('player1-textfield'), 'player 1')
        await userEvent.type(screen.getByRole('combobox', { name: 'Player 2'}), 'player 2')

        await userEvent.click(screen.getByLabelText('Duplicate'))
        const timestamps = await screen.findAllByTestId('timestamp-row')
        expect(timestamps).toHaveLength(2)

        expect(within(timestamps[1]).getByLabelText<HTMLInputElement>('Timestamp').value).toEqual('00h12m12s')
        expect(within(timestamps[1]).getByRole<HTMLInputElement>('combobox', { name: 'Player 1' }).value).toEqual('player 1')
        expect(within(timestamps[1]).getByRole<HTMLInputElement>('combobox', { name: 'Player 2' }).value).toEqual('player 2')
    })

    it('UI Elements start with values from previous step', async () => {
        renderTimestamps({})
        const titleField = screen.getByLabelText('Title');
        const channelField = screen.getByLabelText('Channel');
        const dateField = screen.getByLabelText('Date');
        const versionField = screen.getByRole('button', { name: TFH_Versions[0] })
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
    })

    it('rejects a tournament with no matches and can close error modal', async () => {
        renderTimestamps({})
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(await screen.findByText('Validation Errors')).toBeDefined()
        expect(await screen.findByText('Tournament needs at least one match')).toBeDefined()
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }))
        expect(await screen.queryByText('Validation Errors')).toBeNull()
    })

    it('rejects a tournament with one empty match and shows correct validation errors', async () => {
        renderTimestamps({})
        await userEvent.click(screen.getByRole('button', { name: 'Add Match' }))
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(await screen.findByText('Match 1 - Timestamp is required.')).toBeDefined()
        expect(await screen.findByText('Match 1 - Player 1 is required.')).toBeDefined()
        expect(await screen.findByText('Match 1 - Winner not set (click grey trophy icons).')).toBeDefined()
        expect(await screen.findByText('Match 1 - Player 2 is required.')).toBeDefined()
    })

    it('rejects a tournament with two invalid matches', async () => {
        renderTimestamps({})
        await userEvent.click(screen.getByRole('button', { name: 'Add Match' }))
        await userEvent.click(screen.getByRole('button', { name: 'Add Match' }))
        const timestamps = await screen.findAllByTestId('timestamp-row')
        expect(timestamps).toHaveLength(2)

        await userEvent.type(within(timestamps[0]).getByLabelText('Timestamp'), 'asdf')
        await userEvent.type(within(timestamps[0]).getByTestId('player1-textfield'), 'player 1')
        await userEvent.click(within(timestamps[0]).getByTitle('Did Player 1 Win?'))

        await userEvent.type(within(timestamps[1]).getByLabelText('Timestamp'), '01h23m45s')
        await userEvent.type(within(timestamps[1]).getByTestId('player2-textfield'), 'player 2')

        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(await screen.findAllByTestId('validation-error')).toHaveLength(4)
        expect(await screen.findByText('Match 1 - Timestamp format is incorrect.')).toBeDefined()
        expect(await screen.findByText('Match 1 - Player 2 is required.')).toBeDefined()
        expect(await screen.findByText('Match 2 - Player 1 is required.')).toBeDefined()
        expect(await screen.findByText('Match 2 - Winner not set (click grey trophy icons).')).toBeDefined()
    })


    it('calls the save api calls when saving a tournament', async () => {
        const saveTournamentSpy = vi.fn()
        const saveTimestampsSpy = vi.fn()
        const match: Match = {
            player1: "player1",
            character1: "Paprika",
            player2: "player2",
            character2: "Pom",
            did_p1_win: true,
            start_time: "0h12m24s",
            tournament_id: tournament.id
        }
        renderTimestamps({
            saveTournament: saveTournamentSpy,
            saveTimestamps: saveTimestampsSpy
        })
        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        await userEvent.type(await screen.findByLabelText('Timestamp'), '0h12m24s')
        await userEvent.type(screen.getByLabelText('Player 1'), match.player1)
        await userEvent.type(screen.getByLabelText('Player 2'), match.player2)
        await userEvent.click(screen.getByTitle('Did Player 1 Win?'))
        await userEvent.click(screen.getByTitle('character1-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Paprika Paprika' }))
        await userEvent.click(screen.getByTitle('character2-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Pom Pom' }))

        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(await screen.queryByTestId('validation-error')).toBeNull()
        expect(saveTournamentSpy).toHaveBeenCalledWith(tournament)
        expect(saveTimestampsSpy).toHaveBeenCalledWith([match])
    })
})
