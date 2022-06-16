import {describe, expect, it} from "vitest";
import App from "../src/App";
import {render, screen} from "@testing-library/react";

describe('Header Bar', () =>  {
    it('UI elements', () => {
        render(<App/>)
        expect(screen.getByText("Can't Escape From Crossup Flop")).toBeDefined();
    });
});