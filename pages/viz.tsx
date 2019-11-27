// tslint:disable:no-string-literal
// tslint:disable:max-line-length

import 'nprogress/nprogress.css'

import * as React from 'react'

import { Select, Slider } from 'antd'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import NProgress from 'nprogress'
import { FullscreenControl } from 'react-map-gl'
import Ratio from 'react-ratio'
import { useRequest } from 'use-request-hook'

import { HeatmapBuilder } from '../src/infographics/heatmap'

const Heatmap = dynamic(() => import('../src/infographics/components/Heatmap'), {
    ssr: false,
})
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN // Set your mapbox token here

interface IHeatmapWrapperProps {
    style?: React.CSSProperties
    aspectRatio: number
    heatmapBuilder: HeatmapBuilder
    heatmapKeys: Array<{
        key: string,
        title: string,
    }>
    mapStyle: string
    dataUrl: string
    startCoord: {
        latitude: number,
        longitude: number,
    }
    startZoom: number
    startIntensity: number
    startRadius: number
    extra?: object
    radiusRange: [number, number]
    intensityRange: [number, number]
    showFullscreenControl: boolean
    showControls: boolean
}

const HeatmapWrapper: React.FC<IHeatmapWrapperProps> = props => {
    const [heatmapRadius, setHeatmapRadius] = React.useState(props.startRadius)
    const [heatmapIntensity, setHeatmapIntensity] = React.useState(props.startIntensity)
    const [heatmapKey, setHeatmapKey] = React.useState(props.heatmapKeys[0].key)
    const heatmap = props.heatmapBuilder
        .setField(heatmapKey)
        .setRadius(heatmapRadius)
        .setMinZoom(9)
        .setMaxZoom(22)
        .setIntencity(1, heatmapIntensity)
        .build()

    const onChangeHeatmapKey = React.useCallback(
        (value: string) => setHeatmapKey(value),
        [],
    )
    const onChangeHeatmapRadius = React.useCallback(
        (value: number) => setHeatmapRadius(value),
        [],
    )
    const onChangeHeatmapIntensity = React.useCallback(
        (value: number) => setHeatmapIntensity(value),
        [],
    )
    const showHeatmapKeySelector = props.heatmapKeys.length > 1

    return (
        <div style={props.style}>
            <Ratio
                ratio={props.aspectRatio}
                style={{
                    marginBottom: 10,
                }}
            >
                <Heatmap
                    heatmap={heatmap}
                    mapboxToken={MAPBOX_TOKEN}
                    mapStyle={props.mapStyle}
                    dataUrl={props.dataUrl}
                    startCoord={props.startCoord}
                    startZoom={props.startZoom}
                    extra={props.extra}
                >
                    {!props.showFullscreenControl ? null : (
                        <div
                            style={{
                                position: 'absolute',
                                right: 5,
                                top: 5,
                            }}
                        >
                            <FullscreenControl />
                        </div>
                    )}
                </Heatmap>
            </Ratio>

            {!showHeatmapKeySelector ? null : (
                <Select
                    onChange={onChangeHeatmapKey}
                    size={'small'}
                    defaultValue={heatmapKey}
                    style={{
                        width: '100%',
                    }}
                >
                    {props.heatmapKeys.map(({ key, title }) => (
                        <Select.Option key={key} value={key}>
                            {title}
                        </Select.Option>
                    ))}
                </Select>
            )}

            {!props.showControls ? null : (
                <>
                    <Slider
                        min={props.radiusRange[0]}
                        max={props.radiusRange[1]}
                        onChange={onChangeHeatmapRadius}
                        value={heatmapRadius}
                    />

                    <Slider
                        min={props.intensityRange[0]}
                        max={props.intensityRange[1]}
                        onChange={onChangeHeatmapIntensity}
                        value={heatmapIntensity}
                    />
                </>
            )}
        </div>
    )
}

const Page: NextPage = () => {
    const heatmapStyle = 'mapbox://styles/mapbox/dark-v9'

    const showControls = false
    const nivoTheme = null

    const heatmapBuilder = HeatmapBuilder
        .new()
        .setMinZoom(9)
        .setMaxZoom(22)
        .addColor(0, 'rgba(0, 172, 239, 0)') // #00acef
        // .addColor(0, 'rgb(0, 0, 0)')
        .addColor(1 * 0.08333, '#00a0dd')
        .addColor(2 * 0.08333, '#5191cb')
        .addColor(3 * 0.08333, '#857fbc')
        .addColor(4 * 0.08333, '#a96dad')
        .addColor(5 * 0.08333, '#ca4f9b')
        .addColor(6 * 0.08333, '#eb068c')
        .addColor(7 * 0.08333, '#eb5287')
        .addColor(8 * 0.08333, '#f07782')
        .addColor(9 * 0.08333, '#f29378')
        .addColor(10 * 0.08333, '#f7b269')
        .addColor(11 * 0.08333, '#fcd045')
        .addColor(12 * 0.08333, '#fcf107')
        .addColor(13 * 0.08333, '#85c9c8')
        .addColor(14 * 0.08333, '#298ab2')

    return (
        <main>
            <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;

                    align-items: center;

                    padding: 0;
                }

                .wrapper {
                    width: 60%;
                }

                h1 {
                    text-transform: uppercase;
                    font-weight: 800;
                    margin-top: 2em;
                    font-size: 3em;
                    line-height: 1.25em;
                }

                h2 {
                    font-weight: 800;
                    font-size: 2em;
                    margin-top: 2em;
                    text-transform: uppercase;
                }

                h3 {
                    font-size: 2em;
                    margin-top: 2em;
                }

                h4 {
                    margin: 0;
                    text-align: right;
                    text-transform: uppercase;
                }

                p {
                    margin-top: 2em;
                }

                a {
                    text-decoration: none;
                    padding: 0 8px;
                }

                a:link, a:visited {
                    background-color:  #ff0066;
                    color: white;

                }
                a:hover, a:active {
                    background-color: black;
                }

                ul {
                    list-style: none;
                    margin-left: 0;
                    padding-left: 1em;
                    text-indent: -1em;
                    margin-bottom: 2em;
                }

                ul li:before {
                    content: '/';
                    display: block;
                    float: left;
                    width: 1em;
                    font-weight: bolder;
                }

                @media screen and (max-width: 1280px) {
                    .wrapper {
                        width: 70%;
                    }
                }

                @media screen and (max-width: 800px) {
                    .wrapper {
                        width: 90%;
                    }
                }

                @media screen and (max-width: 31.25em) {
                    main {
                        padding: 0 10px;
                    }

                    .wrapper {
                        width: 100%;
                    }

                    h1 {
                        font-size: 2.5em;
                    }
                }
            `}</style>

            <div className={'wrapper'}>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/PPL_COUNT_PT.geojson'}
                    startCoord={{
                        longitude: 55.747912085591821,
                        latitude: 58.078609704810887,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'PPL_ALL_8',
                            title: 'с 8:00 до 12:00',
                        },
                        {
                            key: 'PPL_ALL_12',
                            title: 'с 12:00 до 17:00',
                        },
                        {
                            key: 'PPL_ALL_17',
                            title: 'с 17:00 до 19:00',
                        },
                        {
                            key: 'PPL_ALL_19',
                            title: 'с 19:00 до 21:00',
                        },
                    ]}
                    extra={{}}
                />
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/PPL_COUNT_PT.geojson'}
                    startCoord={{
                        longitude: 55.747912085591821,
                        latitude: 58.078609704810887,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'STAY_8',
                            title: 'с 8:00 до 12:00',
                        },
                        {
                            key: 'STAY_12',
                            title: 'с 12:00 до 17:00',
                        },
                        {
                            key: 'STAY_17',
                            title: 'с 17:00 до 19:00',
                        },
                        {
                            key: 'STAY_19',
                            title: 'с 19:00 до 21:00',
                        },
                    ]}
                    extra={{}}
                />
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/PPL_COUNT_PT.geojson'}
                    startCoord={{
                        longitude: 55.747912085591821,
                        latitude: 58.078609704810887,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'WAY_8',
                            title: 'с 8:00 до 12:00',
                        },
                        {
                            key: 'WAY_12',
                            title: 'с 12:00 до 17:00',
                        },
                        {
                            key: 'WAY_17',
                            title: 'с 17:00 до 19:00',
                        },
                        {
                            key: 'WAY_19',
                            title: 'с 19:00 до 21:00',
                        },
                    ]}
                    extra={{}}
                />
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/PPL_COUNT_PT.geojson'}
                    startCoord={{
                        longitude: 55.747912085591821,
                        latitude: 58.078609704810887,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'KDS_8',
                            title: 'с 8:00 до 12:00',
                        },
                        {
                            key: 'KDS_12',
                            title: 'с 12:00 до 17:00',
                        },
                        {
                            key: 'KDS_17',
                            title: 'с 17:00 до 19:00',
                        },
                        {
                            key: 'KDS_19',
                            title: 'с 19:00 до 21:00',
                        },
                    ]}
                    extra={{}}
                />

            </div>
        </main>
    )
}

export default Page
