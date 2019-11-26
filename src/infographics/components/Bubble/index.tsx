import * as React from 'react'
import Ratio from 'react-ratio'

import { ResponsiveBubble } from '@nivo/circle-packing'

const NivoBubble = ResponsiveBubble as any

export interface IChordProps {
    style?: React.CSSProperties
    tree: any
}

export const Bubble: React.FC<IChordProps> = props => (
    <Ratio
        style={props.style}
        ratio={1}
    >
        <NivoBubble
            root={props.tree}
            margin={{
                top: 30,
                right: 30,
                bottom: 30,
                left: 30,
            }}
            identity='name'
            value='value'
            // colors={{
            //     scheme: 'nivo',
            // }}
            padding={6}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2.5]],
            }}
            // borderWidth={2}
            // borderColor={{ from: 'color' }}
            // colorBy={'color'}
            colors={(node) => {
                // console.log('color node', node.name, node.color)
                return node.color
                // return 100
                // return 'hsl(188, 70%, 50%)'
                // return Math.round(Math.random() * 255)
                // return 'rgb(255, 0, 255)'
            }}
            // defs={[
            //     {
            //         id: 'lines',
            //         type: 'patternLines',
            //         // background: 'none',
            //         color: 'inherit',
            //         // color: 'skyblue',
            //         rotation: -45,
            //         lineWidth: 2,
            //         spacing: 4,
            //     },
            // ]}
            isZoomable={false}
            // fill={[{ match: { depth: 0 }, id: 'lines' }]}
        animate={false}
        // motionStiffness={90}
        // motionDamping={12}
        />
    </Ratio>
)
