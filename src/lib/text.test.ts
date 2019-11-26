import { getEndNumber, incrementEndNumber, makeUnique } from './text'

describe('lib text', () => {
    describe('getEndNumber', () => {
        it('should extract number at the end of string', () => {
            expect(getEndNumber('hello 1234')).toBe(1234)
        })

        it('should return null if string does not contain a number at the end', () => {
            expect(getEndNumber('1234 hello')).toBeNull()
        })
    })

    describe('incrementEndNumber', () => {
        it('should return string with incremented number at the end of string', () => {
            expect(incrementEndNumber('hello 1234')).toBe('hello 1235')
        })

        it('should initialize number if it does not contain a number at the end of string', () => {
            expect(incrementEndNumber('1234 hello')).toBe('1234 hello 1')
        })
    })

    describe('makeUnique', () => {
        it('should return a non-modified string if it unique', () => {
            const sample = makeUnique('hello', [
                'unique',
                'text',
            ])

            expect(sample).toBe('hello')
        })

        it('should return a modified string with a number at the end if list of samples includes it', () => {
            const sample = makeUnique('hello', [
                'hello',
                'unique',
                'text',
            ])

            expect(sample).toBe('hello 1')
        })

        it('should return a modified string with incremented number at the end if list of samples includes it', () => {
            const sample = makeUnique('hello', [
                'hello 1',
                'unique',
                'text',
            ])

            expect(sample).toBe('hello 2')
        })
    })
})
