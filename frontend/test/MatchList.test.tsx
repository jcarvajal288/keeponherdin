import { describe, expect, it } from 'vitest'
import { MatchList, Match } from "../src/MatchList";
import {render, screen} from '@testing-library/react';

/**
 * @vitest-environment jsdom
 */

import matches from "./resources/sampleMatches.json";

describe('MatchList', () => {

    const renderMatchList = () => {
        return render(
            <MatchList/>
        );
    };

    it('displays existing matches', () => {
        renderMatchList();
        expect(screen.getByText("Bob")).toBeDefined();
        expect(screen.getByText("Tianhuo")).toBeDefined();
    })
});