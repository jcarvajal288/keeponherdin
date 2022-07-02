import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../src/App";

describe('App', () => {

    it('navigates to `enter link` page when add-tournament is clicked', async () => {
        render(<App/>)
        const addButton = screen.getByLabelText('add-tournament')
        await userEvent.click(addButton)
        expect(await screen.getByText('Enter Link:')).toBeDefined()
    })
})