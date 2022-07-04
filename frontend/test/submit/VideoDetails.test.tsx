import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {VideoDetails} from "../../src/submit/VideoDetails";

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
})
