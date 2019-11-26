import axios from 'axios'
import React, { Component } from 'react'
import MapGL from 'react-map-gl'

const HEATMAP_SOURCE_ID = 'heatmap-source'

interface IProps {
    mapboxToken: string
    mapStyle: string | object
    dataUrl: string
    startZoom: number
    startCoord: {
        latitude: number,
        longitude: number,
    },
    heatmap: object
    extra: object
}

interface IState {
    viewport: {
        latitude: number,
        longitude: number,
        zoom: number,
        bearing: number,
        pitch: number,
    },
}

export default class Headmap extends Component<IProps, IState> {
    public mapRef: React.RefObject<any>

    constructor(props) {
        super(props)

        this.state = {
            viewport: {
                latitude: this.props.startCoord.latitude,
                longitude: this.props.startCoord.longitude,
                zoom: this.props.startZoom,
                bearing: 0,
                pitch: 0,
            },
        }

        this.mapRef = React.createRef()
        this.handleMapLoaded = this.handleMapLoaded.bind(this)
    }

    public render() {
        const { viewport } = this.state

        return (
            <MapGL
                ref={this.mapRef}
                {...viewport}
                {...this.props.extra}
                width={'100%'}
                height={'100%'}
                mapStyle={this.props.mapStyle}
                onViewportChange={this.onViewportChange}
                onLoad={this.handleMapLoaded}
                mapboxApiAccessToken={this.props.mapboxToken}
            >
                {this.props.children}
            </MapGL>
        )
    }

    public componentDidUpdate() {
        const map = this.getMap()

        if (!map.isStyleLoaded()) {
            return
        }

        this.initHeatmapSource().then(() => {
            this.updateHeatmap()
        })
    }

    private async initHeatmapSource() {
        const map = this.getMap()

        const source = map.getSource(HEATMAP_SOURCE_ID)

        if (source) {
            return
        }

        const res = await axios.get(this.props.dataUrl)
        map.addSource(HEATMAP_SOURCE_ID, {
            type: 'geojson',
            data: res.data,
        })
    }

    private updateHeatmap() {
        const map = this.getMap()

        const layer = map.getLayer('heatmap-layer')
        if (layer) {
            map.removeLayer('heatmap-layer')
        }

        map.addLayer(this.createHeatmapLayer('heatmap-layer', HEATMAP_SOURCE_ID))
    }

    private createHeatmapLayer = (id: string, source: string) => {
        return {
            ...this.props.heatmap,
            id,
            source,
        }
    }

    private onViewportChange = viewport => {
        this.setState({ viewport })
    }

    private getMap = () => {
        return this.mapRef.current
            ? this.mapRef.current.getMap()
            : null
    }

    private handleMapLoaded = event => {
        this.initHeatmapSource().then(() => {
            this.updateHeatmap()
        })
    }
}
