import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {HeaderBar, titleSlogan} from "../src/HeaderBar";
import {MemoryRouter, Route, Routes} from "react-router-dom";

describe('Header Bar', () =>  {

    const renderHeaderBar = () => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path={'/'}
                        element={
                            <HeaderBar/>
                        }
                    />
                </Routes>
            </MemoryRouter>
        )
    }

    it('UI elements', () => {
        renderHeaderBar()
        expect(screen.getByText(titleSlogan)).toBeDefined()
        expect(screen.getByLabelText('add-tournament')).toBeDefined()
    });

});