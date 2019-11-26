import { reduceChartMatrix } from './app'

describe('infographics app', () => {
    describe('reduceChartMatrix', () => {
        it('should not change fullfil matrix', () => {
            const matrix = [
                [0, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1],
                [1, 1, 0, 1, 1, 1],
                [1, 1, 1, 0, 1, 1],
                [1, 1, 1, 1, 0, 1],
                [1, 1, 1, 1, 1, 0],
            ]
            const keys = ['a', 'b', 'c', 'd', 'e', 'f']

            expect(reduceChartMatrix(matrix, keys)).toEqual([
                matrix, keys,
            ])
        })

        it('should properly reduce matrix', () => {
            const matrix = [
                [0, 1, 1, 1, 0, 1],
                [1, 0, 1, 1, 0, 1],
                [1, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 0, 1],
                [0, 0, 0, 0, 0, 0], // should be removed
                [1, 1, 1, 1, 0, 0],
            ]               // should be removed
            const keys = ['a', 'b', 'c', 'd', 'e', 'f']

            expect(reduceChartMatrix(matrix, keys)).toEqual([
                [
                    [0, 1, 1, 1, 1],
                    [1, 0, 1, 1, 1],
                    [1, 1, 0, 1, 1],
                    [1, 1, 1, 0, 1],
                    [1, 1, 1, 1, 0],
                ],
                ['a', 'b', 'c', 'd', 'f'],
            ])
        })
    })
})
