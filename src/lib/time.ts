import { isNullOrUndefined } from 'util'

export async function sleep(ms): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export function isValidDate(value: any): boolean {
    if (typeof value === 'boolean') {
        return false
    } else if (isNullOrUndefined(value)) {
        return false
    }

    const date = new Date(value)

    return !isNaN(date.getDate())
}
