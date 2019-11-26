import { latLonFromTuple, tupleFromLatLon } from './mapbox'

describe('lib mapbox', () => {
    describe('latLonFromTuple', () => {
        it('should properly create object', () => {
            const sample = latLonFromTuple([64.80454432430665, 60.12204261135669])

            expect(sample).toEqual({
                latitude: 60.12204261135669,
                longitude: 64.80454432430665,
            })
        })
    })

    describe('tupleFromLatLon', () => {
        it('should properly create object', () => {
            const sample = tupleFromLatLon({
                latitude: 60.12204261135669,
                longitude: 64.80454432430665,
            })

            expect(sample).toEqual([64.80454432430665, 60.12204261135669])
        })
    })
})
