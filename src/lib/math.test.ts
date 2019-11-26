import { constrain, round } from './math'

describe('lib math', () => {
    describe('round', () => {
        it('should properly trim number', () => {
            const sample = round(147.71239410235, 1000)

            expect(sample).toEqual(147.712)
        })
    })

    describe('constrain', () => {
        it('should get value in range', () => {
            const sample = constrain(17.4575637, 10, 20)

            expect(sample).toEqual(17.4575637)
        })

        it('should get min value in range if value is less than min', () => {
            const sample = constrain(1.4575637, 5, 20)

            expect(sample).toEqual(5)
        })

        it('should get max value in range if value is more than max', () => {
            const sample = constrain(17.4575637, 5, 15)

            expect(sample).toEqual(15)
        })
    })
})
