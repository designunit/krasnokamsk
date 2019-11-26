import * as React from 'react'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PhotoMap = dynamic(() => import('../src/infographics/components/PhotoMap'), {
    ssr: false,
})

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN // Set your mapbox token here

const Page: NextPage<{}> = () => {
    return (
        <PhotoMap
            mapboxToken={MAPBOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/dark-v9'}
            dataUrl={'https://dir.ams3.digitaloceanspaces.com/uray/dataset.geojson'}
            size={50}
            startZoom={13}
            startCoord={{
                latitude: 60.12380893107247,
                longitude: 64.79488837184576,
            }}
            extra={{
                dragPan: true,
                dragRotate: false,
                scrollZoom: true,
                touchZoom: true,
                touchRotate: true,
                keyboard: true,
                doubleClickZoom: true,
                minZoom: 9,
                maxZoom: 22,
                minPitch: 0,
                maxPitch: 0,
            }}
        />
    )
}

export default Page
