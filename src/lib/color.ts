const white = ['#ffffff', '#fff', 'white', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)']
const black = ['#000000', '#000', 'black', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)']

export function isWhite(color: string): boolean {
    return white.includes(color)
}

export function isBlack(color: string): boolean {
    return black.includes(color)
}
