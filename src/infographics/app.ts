import { flatMap } from 'lodash'

import { removeByIndex } from '../lib/array'
import { removeMatrixKeyByIndex, sum } from './lib'

export function reduceChartMatrix(matrix: number[][], keys: string[]): [number[][], string[]] {
    let newMatrix = matrix
    let newKeys = keys

    let i = 0
    while (true) {
        if (i >= newMatrix.length) {
            break
        }

        const row = newMatrix[i]
        if (sum(row) === 0) {
            newMatrix = removeMatrixKeyByIndex(i, newMatrix)
            newKeys = removeByIndex(newKeys, i)

            continue
        }

        i++
    }

    return [newMatrix, newKeys]
}

export function createPieData<T>(items: T[], keys: string[], powerFn: (item: T) => number) {
    return keys
        .map(key => {
            const value = sum(items.map(x => {
                if (x[key]) {
                    return powerFn(x)
                }

                return 0
            }))

            return {
                id: key,
                label: key,
                value,
            }
        })
        .filter(x => x.value > 0)
}

export function getItemAttributes<T>(item: T, attributeKeys: string[]): string[] {
    return attributeKeys
        .filter(key => item[key] === 1)

}

export function createTree<T>(
    items: T[],
    powerFn: (item: T) => number,
    rootLevel: any[],
    branchLevel: any[],
    attributeColors: any,
    extra: any,
): any {
    const hasAny = (x: T, keys: string[]) => {
        const ks = getItemAttributes(x, keys)

        return ks.length > 0
    }

    const createInnerBranch = (xs: T[], branchConfig: any) => {
        if ('split' in branchConfig) {
            const splitted = branchConfig.split
                .map(key => {
                    const itemsInBranch = xs.filter(x => {
                        return hasAny(x, [key])
                    })
                    const value = sum(itemsInBranch.map(x => powerFn(x)))
                    if (value === 0) {
                        return null
                    }

                    return {
                        name: key,
                        value,
                        color: attributeColors[key],
                    }
                })
                .filter(Boolean)

            if (splitted.length === 0) {
                return null
            }

            return splitted
        } else {
            return null
        }
    }

    const createRootBranch = (xs: T[], branchConfig: any) => {
        const filterKeys = branchConfig.filter
        const itemsInBranch = xs.filter(x => {
            return hasAny(x, filterKeys)
        })
        const children = flatMap(
            branchLevel, bl => createInnerBranch(itemsInBranch, bl),
        ).filter(Boolean)

        return {
            name: branchConfig.branch,
            color: branchConfig.color,
            children,
        }
    }

    const tree = {
        ...extra,
        children: rootLevel.map((level, index) => {
            return createRootBranch(items, level)
        }),
    }

    return tree
}
