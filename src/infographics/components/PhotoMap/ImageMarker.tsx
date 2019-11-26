import * as React from 'react'

import { Marker } from 'react-map-gl'
import { ImagePin } from './ImagePin'

interface IImageMarkerProps {
    latitude: number
    longitude: number
    size: number
    src: string
}

export const ImageMarker: React.FC<IImageMarkerProps> = React.memo(props => {
    const [loaded, setLoaded] = React.useState(false)
    const [over, setOver] = React.useState(false)
    const onLoadImage = React.useCallback(() => {
        setLoaded(true)
    }, [])
    const onMouseOver = React.useCallback(() => {
        setOver(true)
    }, [])
    const onMouseLeave = React.useCallback(() => {
        setOver(false)
    }, [])

    const size = over
        ? props.size * 1.5
        : props.size
    const className = over
        ? 'imagemarker--highlighted'
        : ''

    return (
        <Marker
            latitude={props.latitude}
            longitude={props.longitude}
            className={className}
        >
            <style global jsx>{`
                .imagemarker--highlighted {
                    z-index: 1000;
                }
            `}</style>

            <ImagePin
                size={size}
                src={props.src}
                visible={loaded}
                onLoadImage={onLoadImage}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        </Marker>
    )
})
