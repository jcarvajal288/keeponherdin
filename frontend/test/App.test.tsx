import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../src/App";
import { titleSlogan } from "../src/HeaderBar";

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
        expect(await screen.findByLabelText('Version')).toBeDefined()
        await userEvent.click(screen.getByRole("button", { name: 'Start Over'}))
        expect(await screen.findByLabelText('Link')).toBeDefined()
    })
})