import { describe, expect, it } from 'vitest'
import MatchList from "../src/MatchList";
import { render, screen } from '@testing-library/react';

/**
 * @vitest-environment jsdom
 */

describe('MatchList', () => {

    const renderMatchList = () => {
        return render(
            <MatchList/>
        );
    };

    it('displays "Match"', () => {
        renderMatchList();
        expect(screen.findByText("Match"));
    })
});