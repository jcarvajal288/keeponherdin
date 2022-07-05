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

    it('navigates through to the timestamps page', async () => {
        render(<App/>)
        const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
        const addButton = screen.getByLabelText('add-tournament')
        await userEvent.click(addButton)
        const linkTextBox = screen.getByLabelText('Link')
        expect(await linkTextBox).toBeDefined()
        await userEvent.type(linkTextBox, videoUrl)
        const titleField = screen.findByLabelText("Title")
        const channelField = screen.findByLabelText("Channel")
        const dateField = screen.findByLabelText("Date")
        //await userEvent.type(videoTitle)
    })
})