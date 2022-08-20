import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../src/App";
import { titleSlogan } from "../src/HeaderBar";
import {TFH_Versions} from "../src/tfhData";

describe('App', () => {

    it('navigates to `enter link` page and back to home', async () => {
        render(<App/>)
        const addButton = screen.getByLabelText('add-tournament')
        await userEvent.click(addButton)
        expect(await screen.getByLabelText('Link')).toBeDefined()
        await userEvent.click(screen.getByText(titleSlogan))
        expect(await screen.queryByLabelText('Link')).toBeNull()
    })

    it('navigates to video details page and then starts over', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        const addButton = screen.getByLabelText('add-tournament')
        await userEvent.click(addButton)
        const linkTextBox = screen.getByLabelText('Link')
        expect(await linkTextBox).toBeDefined()
        await userEvent.type(linkTextBox, videoUrl)
        expect(screen.findByLabelText("Title")).toBeDefined()
        await userEvent.click(screen.getByRole("button", { name: 'Start Over'}))
        expect(await screen.findByLabelText('Link')).toBeDefined()
    })

    it('navigates through to the timestamps page and back', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        const addButton = screen.getByLabelText('add-tournament')
        await userEvent.click(addButton)

        const linkTextBox = screen.getByLabelText('Link')
        expect(await linkTextBox).toBeDefined()
        await userEvent.type(linkTextBox, videoUrl)

        const titleField = screen.getByLabelText("Title")
        const channelField = screen.getByLabelText("Channel")
        const dateField = screen.getByLabelText("Date")
        await userEvent.type(titleField, 'asdf')
        await userEvent.type(channelField, 'asdf')
        await userEvent.type(dateField, '2022-11-11')
        await userEvent.click(screen.getByRole("button", { name: 'Next'}))
        expect(await screen.findByRole('button', { name: TFH_Versions[0] })).toBeDefined()
        await userEvent.click(screen.getByRole("button", { name: 'Start Over'}))
        expect(await screen.findByLabelText('Link')).toBeDefined()
    })

    const navigateToTimestampsScreen = async (videoUrl: string) => {
        await userEvent.click(screen.getByLabelText('add-tournament'))
        await userEvent.type(screen.getByLabelText('Link'), videoUrl)

        await userEvent.type(screen.getByLabelText("Title"), 'asdf')
        await userEvent.type(screen.getByLabelText("Channel"), 'asdf')
        await userEvent.type(screen.getByLabelText("Date"), '2022-11-11')
        await userEvent.click(screen.getByRole("button", {name: 'Next'}))
    }

    it('vod icon links to vod at the correct time stamp', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        await navigateToTimestampsScreen(videoUrl);

        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        await userEvent.type(await screen.findByLabelText('Timestamp'), '0h12m24s')
        const timestampField = screen.getByLabelText('Timestamp')
        expect((timestampField as HTMLInputElement).value).toEqual('0h12m24s')
        expect((await screen.findByRole('link', { name: 'Go to VOD' })).getAttribute('href'))
            .toEqual(`${videoUrl}?t=744`)
    })

    it('can pick a predefined game version', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        await navigateToTimestampsScreen(videoUrl);

        await userEvent.click(screen.getByRole('button', { name: TFH_Versions[0] }))
        TFH_Versions.map(async (version) => {
            expect(await screen.findByRole('option', { name: version })).toBeDefined()
        })
        await userEvent.click(screen.getByRole('option', { name: '2.0'}))
        expect(await screen.findByRole('button', { name: '2.0' })).toBeDefined()
    })

    it('routes back to the tournament list after successfully saving a tournament', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        await navigateToTimestampsScreen(videoUrl);

        await userEvent.click(screen.getByRole("button", { name: 'Add Match'}))
        await userEvent.type(await screen.findByLabelText('Timestamp'), '0h12m24s')
        await userEvent.type(screen.getByLabelText('Player 1'), 'player1')
        await userEvent.type(screen.getByLabelText('Player 2'), 'player2')
        await userEvent.click(screen.getByTitle('Did Player 1 Win?'))
        await userEvent.click(screen.getByTitle('character1-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Paprika Paprika' }))
        await userEvent.click(screen.getByTitle('character2-select'))
        await userEvent.click(screen.getByRole('menuitem', { name: 'Pom Pom' }))

        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(await screen.queryByTestId('validation-error')).toBeNull()
        expect(await screen.findByText('Home Page')).toBeDefined()
    }, 10000)
})