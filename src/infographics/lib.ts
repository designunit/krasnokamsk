import { range } from 'lodash'

export function sum(data: number[]): number {
    return data.reduce((a, b) => a + b, 0)
}

export function createMatrix<T>(powerFn: (item: T) => number, order: string[], data: T[]): number[][] {
    const matrixPower = (x, y) => {
        if (x === y) {
            return 0
        }

        return sum(data.map(item => {
            if (item[x] && item[y]) {
                return powerFn(item)
            } else {
                return 0
            }
        }))
    }

    return order.map(x => range(order.length)
        .map(i => {
            const y = order[i]

            return matrixPower(x, y)
        }),
    )
}

/**
 *
 * delete row and column by index
 *
 * @param deleteIndex
 * @param matrix
 */
export function removeMatrixKeyByIndex<T>(deleteIndex: number, matrix: T[][]): T[][] {
    return matrix
        .filter((row, ri) => ri !== deleteIndex)
        .map((col, ci) => col.filter((x, i) => i !== deleteIndex))
}
