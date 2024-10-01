import { expect } from 'chai';
import { capitalizeText } from '../../src/helpers/utils';

describe('#Utils Tests', () => {
    describe('#capitalizeText()', () => {
        it('Single word', () => {
            const text = capitalizeText(['one']);
            expect(text).to.equal('One');
        });

        it('Multiple words', () => {
            const text = capitalizeText(['one two']);
            expect(text).to.equal('One Two');
        });

        it('All caps words', () => {
            const text = capitalizeText(['ONE TWO THREE FOUR']);
            expect(text).to.equal('ONE TWO THREE FOUR');
        });

        it('All lowercase words', () => {
            const text = capitalizeText(['one two three four five']);
            expect(text).to.equal('One Two Three Four Five');
        });

        it('Mixed case words', () => {
            const text = capitalizeText(['One tWo three FOUR FiVe SIx']);
            expect(text).to.equal('One TWo Three FOUR FiVe SIx');
        });

        it('Words with numbers', () => {
            const text = capitalizeText(['3 Words with 5 numbers 123']);
            expect(text).to.equal('3 Words With 5 Numbers 123');
        });

        it('Words punctuation', () => {
            const text = capitalizeText([
                'These. are. words? With, punctuation!',
            ]);
            expect(text).to.equal('These. Are. Words? With, Punctuation!');
        });

        it('And becomes &', () => {
            const text = capitalizeText(['Salt and pepper']);
            expect(text).to.equal('Salt & Pepper');
        });
    });
});
