export function mapFromArray<K, T>(key: (item: T) => K, items: T[]): Map<K, T> {
    return items.reduce(
        (acc, item) => {
            acc.set(key(item), item)

            return acc
        },
        new Map<K, T>(),
    )
}

export function setUnion<T>(a: Set<T>, b: Set<T>): Set<T> {
    const union = new Set<T>()

    a.forEach(x => union.add(x))
    b.forEach(x => union.add(x))

    return union
}

export function isSubset<T>(set: Set<T>, subset: Set<T>): boolean {
    const union = setUnion(set, subset)

    return union.size === set.size
}

export function createIndex<T>(items: T[], selector: (item: T) => string): { [name: string]: T } {
    return items.reduce((index, item) => {
        const key = selector(item)
        index[key] = item

        return index
    }, {})
}
