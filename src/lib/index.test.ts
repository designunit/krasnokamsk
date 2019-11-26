import { createIndex } from '.'

describe('lib', () => {
    describe('createIndex', () => {
        it('should properly create index by selector', () => {
            const sample = [
                {name: 'a', value: 'A'},
                {name: 'b', value: 'B'},
                {name: 'c', value: 'C'},
                {name: 'd', value: 'D'},
                {name: 'e', value: 'E'},
                {name: 'f', value: 'F'},
            ]
            const index = createIndex(sample, x => x.name)

            expect(index).toEqual({
                a: { name: 'a', value: 'A' },
                b: { name: 'b', value: 'B' },
                c: { name: 'c', value: 'C' },
                d: { name: 'd', value: 'D' },
                e: { name: 'e', value: 'E' },
                f: { name: 'f', value: 'F' },
            })
        })
    })
})
