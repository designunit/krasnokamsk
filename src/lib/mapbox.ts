import { ILatLon } from '../app/types'

export function latLonFromTuple(latLng: [number, number]): ILatLon {
    return {
        latitude: latLng[1],
        longitude: latLng[0],
    }
}

export function tupleFromLatLon(latLon: ILatLon): [number, number] {
    return [latLon.longitude, latLon.latitude]
}
