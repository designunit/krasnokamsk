export function round(value: number, n: number): number {
    return Math.round(value * n) / n
}

export function constrain(value: number, min: number, max: number): number {
    if (value < min) {
        return min
    } else if (value > max) {
        return max
    } else {
        return value
    }
}
