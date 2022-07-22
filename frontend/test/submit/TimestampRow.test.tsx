import {describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
import {TimestampRow, TimestampRowProps} from "../../src/submit/TimestampRow";
import {Match} from "../../src/tournaments/MatchRow";
import userEvent from "@testing-library/user-event";
import {Tournament} from "../../src/tournaments/TournamentTable";
import {act} from "react-dom/test-utils";

describe('TimestampRow', () => {

    const emptyMatch: Match = {
        player1: "",
        character1: "",
        player2: "",
        character2: "",
        did_p1_win: null,
        start_time: "",
        tournament_id: -1
    }

    const tournament: Tournament = {
        id: 1,
        title: "Rodeo Regional #100",
        date: new Date("2022-06-19T06:00:00Z"),
        game_version: "3.0",
        tournament_organizer: "Javamorris",
        vod_link: "https://www.youtube.com/watch?v=Z5PsPVKZlmo"
    }

    const renderTimestampRow = (props: Partial<TimestampRowProps>) => {
        render(<TimestampRow
            thisTimestampId={0}
            initialMatch={emptyMatch}
            timestamps={[]}
            setTimestamps={(_: Match[]) => {}}
            tournament={tournament}
            playerList={[]}
            {...props}
        />)
    }

    it('UI Elements', () => {
        renderTimestampRow({})
        expect(screen.getByLabelText('Timestamp')).toBeDefined()
        expect(screen.getByLabelText('Player 1')).toBeDefined()
        expect(screen.getByRole('button', { name: 'character1-select'})).toBeDefined()
        expect(screen.getByLabelText('Player 2')).toBeDefined()
        expect(screen.getByTestId("OndemandVideoIcon")).toBeDefined()
        expect(screen.getByTestId("SwapHorizIcon")).toBeDefined()
        expect(screen.getByTestId("DeleteIcon")).toBeDefined()
    })

    it('open character1 chooser by clicking the character icon', async () => {
        renderTimestampRow({})
        expect(screen.queryByRole('menuitem', { name: 'Arizona Arizona' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Oleander Oleander' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Paprika Paprika' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Pom Pom' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Shanty Shanty' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Tianhuo Tianhuo' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Velvet Velvet' })).toBeNull()
        await userEvent.click(screen.getByRole('button', { name: 'character1-select' }))
        expect(screen.getByRole('menuitem', { name: 'Arizona Arizona' }))
        expect(screen.getByRole('menuitem', { name: 'Oleander Oleander' }))
        expect(screen.getByRole('menuitem', { name: 'Paprika Paprika' }))
        expect(screen.getByRole('menuitem', { name: 'Pom Pom' }))
        expect(screen.getByRole('menuitem', { name: 'Shanty Shanty' }))
        expect(screen.getByRole('menuitem', { name: 'Tianhuo Tianhuo' }))
        expect(screen.getByRole('menuitem', { name: 'Velvet Velvet' }))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Oleander Oleander' }))
        expect(screen.queryByRole('menuitem', { name: 'Arizona Arizona' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Oleander Oleander' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Paprika Paprika' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Pom Pom' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Shanty Shanty' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Tianhuo Tianhuo' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Velvet Velvet' })).toBeNull()

        const character1select = screen.getByTitle('character1-select')
        expect(within(character1select).getByAltText('Oleander')).toBeDefined()
    })

    it('open character 2 chooser by clicking the character icon', async () => {
        renderTimestampRow({})
        expect(screen.queryByRole('menuitem', { name: 'Arizona Arizona' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Oleander Oleander' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Paprika Paprika' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Pom Pom' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Shanty Shanty' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Tianhuo Tianhuo' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Velvet Velvet' })).toBeNull()
        await userEvent.click(screen.getByRole('button', { name: 'character2-select' }))
        expect(screen.getByRole('menuitem', { name: 'Arizona Arizona' }))
        expect(screen.getByRole('menuitem', { name: 'Oleander Oleander' }))
        expect(screen.getByRole('menuitem', { name: 'Paprika Paprika' }))
        expect(screen.getByRole('menuitem', { name: 'Pom Pom' }))
        expect(screen.getByRole('menuitem', { name: 'Shanty Shanty' }))
        expect(screen.getByRole('menuitem', { name: 'Tianhuo Tianhuo' }))
        expect(screen.getByRole('menuitem', { name: 'Velvet Velvet' }))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Velvet Velvet' }))
        expect(screen.queryByRole('menuitem', { name: 'Arizona Arizona' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Oleander Oleander' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Paprika Paprika' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Pom Pom' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Shanty Shanty' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Tianhuo Tianhuo' })).toBeNull()
        expect(screen.queryByRole('menuitem', { name: 'Velvet Velvet' })).toBeNull()

        const character2select = screen.getByTitle('character2-select')
        expect(within(character2select).getByAltText('Velvet')).toBeDefined()
    })

    it('swaps player 1 and player 2 when the Swap button is clicked', async () => {
        renderTimestampRow({})
        await userEvent.type(screen.getByLabelText('Player 1'), 'player1')
        await userEvent.type(screen.getByLabelText('Player 2'), 'player2')
        await userEvent.click(screen.getByTitle('character1-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Paprika Paprika' }))
        await userEvent.click(screen.getByTitle('character2-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Pom Pom' }))
        await userEvent.click(screen.getByLabelText('Swap Players'))

        expect(screen.getByRole<HTMLInputElement>('combobox', { name: 'Player 1' }).value).toEqual('player2')
        expect(screen.getByRole<HTMLInputElement>('combobox', { name: 'Player 2' }).value).toEqual('player1')

        const character1select = screen.getByTitle('character1-select')
        expect(within(character1select).getByAltText('Pom')).toBeDefined()
        const character2select = screen.getByTitle('character2-select')
        expect(within(character2select).getByAltText('Paprika')).toBeDefined()
    })

    it('toggles did_p1_win when clicking the player trophy icons', async () => {
        renderTimestampRow({})
        expect(screen.getByTitle('Did Player 1 Win?')).toBeDefined()
        expect(screen.getByTitle('Did Player 2 Win?')).toBeDefined()
        await userEvent.click(screen.getByTitle('Did Player 1 Win?'))
        expect(screen.getByTitle('Player 1 Wins')).toBeDefined()
        expect(screen.getByTitle('Player 2 Loses')).toBeDefined()
        await userEvent.click(screen.getByTitle('Player 2 Loses'))
        expect(screen.getByTitle('Player 1 Loses')).toBeDefined()
        expect(screen.getByTitle('Player 2 Wins')).toBeDefined()
    })

    it('shows a list of existing players when the user enters a player name', async () => {
        const playerList = [
            'a',
            'ab',
            'abc',
            'eee',
        ]
        renderTimestampRow({
            playerList: playerList
        })
        const player1Field = screen.getByLabelText('Player 1')
        await userEvent.click(player1Field)
        await expectPlayerNamesToExist(playerList)
    })

    const expectPlayerNamesToExist = async (playerList: string[]) => {
        for (const player of playerList) {
            expect(await screen.findByText(player)).toBeDefined()
        }
    }

    describe('Validation', () => {

        it('displays helper text for an invalid timestamp', async () => {
            renderTimestampRow({})
            const timestampField = screen.getByLabelText('Timestamp')
            await userEvent.type(timestampField, ' ')
            await act(() => timestampField.blur())
            expect(timestampField.getAttribute('aria-invalid')).toEqual('true')

            await userEvent.clear(timestampField)
            await userEvent.type(timestampField, 'asdfasdf')
            await act(() => timestampField.blur())
            expect(timestampField.getAttribute('aria-invalid')).toEqual('true')

            await userEvent.clear(timestampField)
            await act(() => timestampField.blur())
            expect(timestampField.getAttribute('aria-invalid')).toEqual('false')
        })
    })
})