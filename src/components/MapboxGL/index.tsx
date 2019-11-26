import * as React from 'react'

import { Map } from 'mapbox-gl'
import ReactMapGL, { PointerEvent, ViewState } from 'react-map-gl'

export interface IMapboxGLProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    mapStyle: string
    onLoad: (map: Map) => void
    onClick: (event: PointerEvent) => void
    onMouseMove?: (event: PointerEvent) => void
    viewport: ViewState
    extra?: object
    onChangeViewport: (value: ViewState) => void
    scrollZoom?: boolean
}

export const MapboxGL: React.FC<IMapboxGLProps> = props => {
    const mapRef = React.useRef<ReactMapGL>()
    const onLoad = React.useCallback(() => {
        props.onLoad(mapRef.current.getMap())
    }, [])

    return (
        <div>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100%;

                    position: relative;
                }
            `}</style>

            <ReactMapGL
                {...props.viewport}
                {...props.extra}
                width={'100%'}
                height={'100%'}
                ref={mapRef}
                scrollZoom={props.scrollZoom}
                onLoad={onLoad}
                mapStyle={props.mapStyle}
                mapboxApiAccessToken={props.mapboxToken}
                onViewportChange={props.onChangeViewport}
                onClick={props.onClick}
                onMouseMove={props.onMouseMove}
                attributionControl={false}
            >
                {props.children}
            </ReactMapGL>
        </div>
    )
}
