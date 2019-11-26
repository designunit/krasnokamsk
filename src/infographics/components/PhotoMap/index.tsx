import * as React from 'react'

import { Feature, Point } from 'geojson'
import { ViewState } from 'react-map-gl'

import { Map } from 'mapbox-gl'
import { Cluster } from '../../../components/Cluster'
import { MapboxGL } from '../../../components/MapboxGL'
import { ImageMarker } from './ImageMarker'
import { useFeatures } from './useFeatures'

interface IProperties {
    url: string
    value: number
}

interface IPhotoMapProps {
    mapboxToken: string
    mapStyle: string | object
    dataUrl: string
    size: number
    startZoom: number
    startCoord: {
        latitude: number,
        longitude: number,
    },
    extra: object
}

const PhotoMap: React.FC<IPhotoMapProps> = props => {
    const features = useFeatures<Point, IProperties>(props.dataUrl)
    const [map, setMap] = React.useState<Map>(null)
    const [viewport, setViewport] = React.useState<ViewState>({
        latitude: props.startCoord.latitude,
        longitude: props.startCoord.longitude,
        zoom: props.startZoom,
        bearing: 0,
        pitch: 0,
    })
    const onChangeViewport = React.useCallback((newViewport: ViewState) => {
        setViewport(newViewport)
    }, [])
    const onLoad = React.useCallback((mapInstance: Map) => {
        setMap(mapInstance)
    }, [])
    const onClick = React.useCallback(() => {
        // tslint:disable-next-line:no-console
        console.log('click')
    }, [])
    const renderFeature = React.useCallback((f: Feature<Point, IProperties>) => (
        <ImageMarker
            key={f.id}
            longitude={f.geometry.coordinates[0]}
            latitude={f.geometry.coordinates[1]}
            size={props.size}
            src={f.properties.url}
        />
    ), [])
    const renderCluster = React.useCallback((cluster) => {
        const clusterId = cluster.properties.cluster_id
        const [longitude, latitude] = cluster.geometry.coordinates
        const clusterSize = cluster.properties.point_count

        const url = cluster.properties.url
        const size = Math.min(
            props.size + clusterSize,
            100,
        )

        return (
            <ImageMarker
                key={`cluster-${clusterId}`}
                longitude={longitude}
                latitude={latitude}
                size={size}
                src={url}
            />
        )
    }, [])
    const getDataHash = React.useCallback(() => '', [])
    const clusterMap = React.useCallback((props: any) => ({
        url: props.url,
    }), [])
    const clusterReduce = React.useCallback((acc, props: any) => ({
        urls: props.url,
    }), [])

    return (
        <MapboxGL
            viewport={viewport}
            extra={props.extra}
            zoom={props.startZoom}
            onLoad={onLoad}
            onClick={onClick}
            center={[
                props.startCoord.latitude,
                props.startCoord.longitude,
            ]}
            mapStyle={props.mapStyle as string}
            mapboxToken={props.mapboxToken}
            onChangeViewport={onChangeViewport}
        >
            {!map ? null : (
                <Cluster
                    map={map}
                    minZoom={0}
                    maxZoom={22}
                    radius={50}
                    extent={512}
                    nodeSize={64}
                    data={features}
                    getDataHash={getDataHash}
                    clusterMap={clusterMap}
                    clusterReduce={clusterReduce}
                    renderCluster={renderCluster}
                    renderFeature={renderFeature}
                />
            )}
        </MapboxGL>
    )
}

export default PhotoMap
