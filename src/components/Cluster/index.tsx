import * as React from 'react'

import { Feature, Point } from 'geojson'
import Supercluster, { ClusterFeature } from 'supercluster'

export interface IClusterState {
    clusters: Array<Supercluster.ClusterFeature<any> | Supercluster.PointFeature<any>>
}

export interface IClusterProps<T> {
    /** Mapbox map object */
    map: mapboxgl.Map,

    /** Minimum zoom level at which clusters are generated */
    minZoom: number,

    /** Maximum zoom level at which clusters are generated */
    maxZoom: number,

    /** Cluster radius, in pixels */
    radius: number,

    /** (Tiles) Tile extent. Radius is calculated relative to this value */
    extent: number,

    /** Size of the KD-tree leaf node. Affects performance */
    nodeSize: number,

    /** ReactDOM element to use as a marker */
    // element: () => React.ReactNode,
    // element: any,

    /**
     * Callback that is called with the supercluster instance as an argument
     * after componentDidMount
     */
    /* eslint-disable react/no-unused-prop-types */
    // innerRef: () => void,
    /* eslint-enable react/no-unused-prop-types */

    renderCluster: (feature: ClusterFeature<T>, cluster: Supercluster) => React.ReactNode,
    renderFeature: (feature: Feature) => React.ReactNode,
    data: Array<Feature<Point, T>>
    getDataHash: (data: Array<Feature<Point, T>>) => string

    clusterMap: <P>(props: P) => any,
    clusterReduce: <P>(accumulated: any, props: P) => any
}

export class Cluster<T> extends React.Component<IClusterProps<T>, IClusterState> {
    private cluster: Supercluster
    private dataHash: string

    constructor(props) {
        super(props)

        this.state = {
            clusters: [],
        }
    }

    public componentDidMount() {
        this.createCluster(this.props)
        this.recalculate()

        this.props.map.on('moveend', this.recalculate)
    }

    public componentWillReceiveProps(newProps: IClusterProps<T>) {
        const dataHash = this.props.getDataHash(newProps.data)
        const shouldUpdate =
            this.dataHash !== dataHash ||
            newProps.data !== this.props.data ||
            newProps.minZoom !== this.props.minZoom ||
            newProps.maxZoom !== this.props.maxZoom ||
            newProps.radius !== this.props.radius ||
            newProps.extent !== this.props.extent ||
            newProps.nodeSize !== this.props.nodeSize

        this.dataHash = dataHash
        if (shouldUpdate) {
            this.createCluster(newProps)
            this.recalculate()
        }
    }

    public render() {
        return this.state.clusters.map(cluster => {
            if (cluster.properties.cluster) {
                return this.props.renderCluster(cluster, this.cluster)
            }

            return this.props.renderFeature(cluster)
        })
    }

    private createCluster = (props: IClusterProps<T>) => {
        const {
            minZoom,
            maxZoom,
            radius,
            extent,
            nodeSize,
            // innerRef,
        } = props
        const cluster = new Supercluster({
            minZoom,
            maxZoom,
            radius,
            extent,
            nodeSize,
            map: props.clusterMap,
            reduce: props.clusterReduce,
        })

        cluster.load(props.data)
        this.cluster = cluster
        // if (innerRef) innerRef(this.cluster);
    }

    private recalculate = () => {
        const zoom = this.props.map.getZoom()
        const bounds = this.props.map.getBounds().toArray()
        const bbox: any = bounds[0].concat(bounds[1])
        const clusters = this.cluster.getClusters(bbox, Math.floor(zoom))

        this.setState({
            clusters,
        })
    }
}
