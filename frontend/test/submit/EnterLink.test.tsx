import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {EnterLink} from "../../src/submit/EnterLink";
import userEvent from "@testing-library/user-event";

describe('EnterLink', () => {

    const renderEnterLink = () => {
        render(
            <EnterLink
                setFormStep={() => {}}
                setVodLink={(_vodLink: string) => {}}
            />
        )
    }

    it('UI elements', () => {
        renderEnterLink()
        expect(screen.getByTestId("OndemandVideoIcon")).toBeDefined()
        expect(screen.getByLabelText('Link')).toBeDefined()
    })

    it('displays helper text when the Link field is clicked', async () => {
        renderEnterLink()
        expect(screen.queryByText('https://www.youtube.com/watch?v=***********')).toBeNull()
        await userEvent.click(screen.getByLabelText('Link'))
        expect(screen.getByText('https://www.youtube.com/watch?v=***********')).toBeDefined()
    })
})
