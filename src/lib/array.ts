import { initial, tail, zip } from 'lodash'

export function moveItemByIndex<T>(items: T[], index: number, direction: number): T[] {
    const item = items[index]

    const no = items.filter((x, i) => i !== index)
    no.splice(index + direction, 0, item)

    return no
}

export function removeByIndex<T>(items: T[], index: number): T[] {
    const newItems = [...items]
    newItems.splice(index, 1)

    return newItems
}

export function arrayToDomains<T>(items: T[]): Array<[T, T]> {
    return zip(
        initial(items),
        tail(items),
    )
}

export function all(list: boolean[]): boolean {
    return list.reduce((acc, x) => acc && x, true)
}
