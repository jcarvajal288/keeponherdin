import {describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
import {VideoDetails} from "../../src/submit/VideoDetails";
import userEvent from "@testing-library/user-event";

describe('Video Details', () => {

    const renderVideoDetails = () => {
        render(<VideoDetails setFormStep={() => {}}/>)
    }

    it('UI Elements', () => {
        renderVideoDetails()
        expect(screen.getByLabelText("Title")).toBeDefined();
        expect(screen.getByLabelText("Channel")).toBeDefined();
        expect(screen.getByLabelText("Date")).toBeDefined();
        expect(screen.getByRole("button", { name: 'Start Over'})).toBeDefined();
        expect(screen.getByRole("button", { name: 'Next'})).toBeDefined();
    })

    // TODO: https://developers.google.com/youtube/v3/docs/videos/list
    // it('fetches video details on load', async () => {
    //     const videoUrl = 'https://www.youtube.com/watch?v=Z5PsPVKZlmo'
    //     const title = "Them's Fightin' Herds (TFH) Tourney: Rodeo Regional #38"
    //     renderVideoDetails()
    //     const titleField = screen.getByLabelText('Title')
    //     expect(await within(titleField).getByText(title))
    // })

    it('disables the next button until all values are valid', async () => {
        renderVideoDetails()
        const titleField = screen.getByLabelText("Title")
        const channelField = screen.getByLabelText("Channel")
        const dateField = screen.getByLabelText("Date")
        const nextButton = screen.getByRole("button", { name: 'Next'})

        expect(nextButton).toHaveProperty('disabled', true)
        await userEvent.type(titleField, 'Video Title')
        expect(nextButton).toHaveProperty('disabled', true)
        await userEvent.type(channelField, 'Channel Name')
        expect(nextButton).toHaveProperty('disabled', true)
        await userEvent.type(dateField, '2022-04-23')
        expect(nextButton).toHaveProperty('disabled', false)
    })
})
