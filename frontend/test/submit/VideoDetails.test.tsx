import {describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
import {VideoDetails} from "../../src/submit/VideoDetails";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

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

    describe('Validation', () => {

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

        const checkStringValidation = async (inputField: HTMLElement) => {

            await userEvent.type(inputField, ' ')
            await act(() => inputField.blur())
            expect(await screen.findByText('required')).toBeDefined()

            await userEvent.clear(inputField)
            await userEvent.type(inputField, 'asdfasdf')
            await act(() => inputField.blur())
            expect(screen.queryByText('required')).toBeNull()

            await userEvent.clear(inputField)
            await act(() => inputField.blur())
            expect(await screen.findByText('required')).toBeDefined()
        }

        it('displays helper text for an invalid title', async () => {
            renderVideoDetails()
            const titleField = screen.getByLabelText("Title")
            await checkStringValidation(titleField);
        })

        it('displays helper text for an invalid channel', async () => {
            renderVideoDetails()
            const channelField = screen.getByLabelText("Channel")
            await checkStringValidation(channelField);
        })

        it('displays helper text for an invalid date', async () => {
            renderVideoDetails()
            const dateField = screen.getByLabelText("Date")

            await userEvent.type(dateField, 'asdfasdf')
            expect(await screen.findByText('must be in the form YYYY-MM-DD')).toBeDefined()

            await userEvent.clear(dateField)
            await userEvent.type(dateField, '2022-04-23')
            expect(await screen.queryByText('must be in the form YYYY-MM-DD')).toBeNull()
        })
    })
})
