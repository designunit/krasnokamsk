import { removeMatrixKeyByIndex } from './lib'

describe('infographics lib', () => {
    describe('removeMatrixKeyByIndex', () => {
        it('should properly swap item with next item', () => {
            const result = removeMatrixKeyByIndex(2, [
                ['aa', 'ab', 'ac', 'ad', 'ae'],
                ['ba', 'bb', 'bc', 'bd', 'be'],
                ['ca', 'cb', 'cc', 'cd', 'ce'],
                ['da', 'db', 'dc', 'dd', 'de'],
                ['ea', 'eb', 'ec', 'ed', 'ee'],
            ])

            expect(result).toEqual([
                ['aa', 'ab', 'ad', 'ae'],
                ['ba', 'bb', 'bd', 'be'],
                ['da', 'db', 'dd', 'de'],
                ['ea', 'eb', 'ed', 'ee'],
            ])
        })
    })
})
