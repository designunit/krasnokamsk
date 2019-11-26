import * as React from 'react'

import axios from 'axios'
import { Feature, FeatureCollection, Geometry } from 'geojson'

export function useFeatures<G extends Geometry, T>(url: string) {
    const [features, setFeatures] = React.useState<Array<Feature<G, T>>>([])

    React.useEffect(() => {
        (async () => {
            const res = await axios.get<FeatureCollection<G, T>>(url)

            setFeatures(res.data.features)
        })()
    }, [url])

    return features
}
