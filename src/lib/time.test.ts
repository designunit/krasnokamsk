import { isValidDate } from './time'

describe('lib time', () => {
    describe('isValidDate', () => {
        it('should properly match valid date string', () => {
            expect(isValidDate('2019-08-29T02:14:16.880Z')).toBeTruthy()
        })

        it('should properly match invalid any non date string', () => {
            expect(isValidDate('wtf')).toBeFalsy()
        })

        it('should properly match invalid any non string objects', () => {
            expect(isValidDate({})).toBeFalsy()
            expect(isValidDate(true)).toBeFalsy()
            expect(isValidDate([])).toBeFalsy()
            expect(isValidDate(() => {
                return undefined
            })).toBeFalsy()
        })

        it('should properly match invalid null/undefined', () => {
            expect(isValidDate(null)).toBeFalsy()
            expect(isValidDate(undefined)).toBeFalsy()
        })
    })
})
