import { Feature, FeatureCollection, Geometry, Point } from 'geojson'
import { IFeatureIndex } from '../app/types'

export function createGeojson<T, G extends Geometry = Geometry>(
    features: Array<Feature<G, T>>,
): FeatureCollection<G, T> {
    return {
        type: 'FeatureCollection',
        features,
    }
}

export function createPointFeature<T>(latLng: [number, number], properties: T): Feature<Point, T> {
    return {
        type: 'Feature',
        geometry: {
            coordinates: latLng,
            type: 'Point',
        },
        properties,
    }

}

export function changeFeatureProperties<T, K, G extends Geometry = Geometry>(
    feature: Feature<G, T>,
    properties: K,
): Feature<G, K> {
    return {
        ...feature,
        properties,
    }
}

export function mapFeatureProperties<T, K>(
    geojson: FeatureCollection<Geometry, T>,
    mapFn: (feature: Feature<Geometry, T>, index: number) => K,
): FeatureCollection<Geometry, K> {
    return {
        ...geojson,
        features: geojson.features.map((feature, index) => ({
            ...feature,
            properties: mapFn(feature, index),
        })),
    }
}

export function replaceFeatureWithProperties<T, G extends Geometry = Geometry>(
    geojson: FeatureCollection<G, T>,
    featureIndex: number,
    mapProperties: (feature: Feature<G, T>, index: number) => T,
): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: geojson.features.map((feature, index) => featureIndex !== index ? feature : ({
            ...feature,
            properties: mapProperties(feature, index),
        })),
    }
}

export function addFeature<T, G extends Geometry = Geometry>(
    geojson: FeatureCollection<G, T>,
    feature: Feature<G, T>,
): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: [
            ...geojson.features,
            feature,
        ],
    }
}

export function updateFeaturePointLocation<T>(feature: Feature<Point, T>, latLng: [number, number]): Feature<Point, T> {
    return {
        ...feature,
        geometry: {
            coordinates: latLng,
            type: 'Point',
        },
    }
}

export function filterFeatures<T, G extends Geometry>(
    geojson: FeatureCollection<G, T>,
    predicatFn: (feature: Feature<G, T>) => boolean,
): FeatureCollection<G, T> {
    return {
        ...geojson,
        features: geojson.features.filter(predicatFn),
    }
}
