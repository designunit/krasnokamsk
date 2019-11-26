export const endNumberRegexp = /(\d+)$/

export function makeUnique(text: string, samples: string[]): string {
    const matchedSamples: Array<[string, number]> = samples
        .filter(x => x.startsWith(text))
        .map(x => [x, getEndNumber(x)])

    if (!matchedSamples.length) {
        return text
    }

    const maxName: string = matchedSamples
        .reduce((max, next) => {
            if (max[1] < next[1]) {
                return next
            } else {
                return max
            }
        })[0]

    return incrementEndNumber(maxName)
}

export function incrementEndNumber(text: string): string {
    const end = getEndNumber(text)
    if (end) {
        return text.replace(endNumberRegexp, `${end + 1}`)
    }

    return text + ' 1'
}

export function getEndNumber(text: string): number | null {
    const m = endNumberRegexp.exec(text)
    if (m) {
        return Number(m[1])
    }

    return null
}
