import { all, arrayToDomains, moveItemByIndex, removeByIndex } from './array'

describe('lib array', () => {
    describe('moveItemByIndex', () => {
        it('should properly swap item with next item', () => {
            const sample = ['q', 'w', 'e', 'r', 't', 'y']
            const result = moveItemByIndex(sample, 2, 1)

            expect(result).toEqual(
                ['q', 'w', 'r', 'e', 't', 'y'],
            )
        })

        it('should properly swap item with prev item', () => {
            const sample = ['q', 'w', 'e', 'r', 't', 'y']
            const result = moveItemByIndex(sample, 2, -1)

            expect(result).toEqual(
                ['q', 'e', 'w', 'r', 't', 'y'],
            )
        })
    })

    describe('moveItemByIndex', () => {
        it('should properly map items to domains', () => {
            const sample = arrayToDomains(['q', 'w', 'e', 'r', 't', 'y'])

            expect(sample).toEqual([
                ['q', 'w'],
                ['w', 'e'],
                ['e', 'r'],
                ['r', 't'],
                ['t', 'y'],
            ])
        })
    })

    describe('removeByIndex', () => {
        it('should return remove element by index', () => {
            expect(removeByIndex(['a', 'b', 'c', 'd', 'e', 'f'], 3)).toEqual([
                'a', 'b', 'c', 'e', 'f',
            ])
        })

        it('should not modify input array', () => {
            const sample = ['a', 'b', 'c', 'd', 'e', 'f']
            const result = removeByIndex(sample, 3)

            expect(sample === result).toBeFalsy()
            expect(sample[3]).toEqual('d')
        })
    })

    describe('all', () => {
        it('should return true if all items is true', () => {
            expect(all([true, true, true, true, true])).toBeTruthy()
        })

        it('should return false if any item is false', () => {
            expect(all([true, true, false, true, true])).toBeFalsy()
        })
    })
})
