import * as React from 'react'
import Ratio from 'react-ratio'

import { ResponsiveChord } from '@nivo/chord'

const NivoChord = ResponsiveChord as any

export interface IChordProps {
    style?: React.CSSProperties
    matrix: number[][]
    keys: string[]
    color: (item: { id: string }) => string
    theme?: object
}

export const Chord: React.FC<IChordProps> = props => (
    <Ratio
        style={props.style}
        ratio={1}
    >
        <NivoChord
            matrix={props.matrix}
            keys={props.keys}
            margin={{
                top: 80,
                right: 80,
                bottom: 80,
                left: 80,
            }}
            // valueFormat='.2f'
            padAngle={0.02}
            // innerRadiusRatio={0.96}
            // innerRadiusOffset={0.02}

            // arcOpacity={1}
            // arcBorderWidth={1}
            // arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            // ribbonOpacity={0.5}
            // ribbonBorderWidth={1}
            // ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
            // enableLabel={true}
            // label='id'
            labelOffset={15}
            theme={props.theme}
            labelRotation={-90}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
            colors={props.color}
        // isInteractive={true}
        // arcHoverOpacity={1}
        // arcHoverOthersOpacity={0.25}
        // ribbonHoverOpacity={0.75}
        // ribbonHoverOthersOpacity={0.25}
        // animate={true}
        // motionStiffness={90}
        // motionDamping={7}
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 70,
        //         itemWidth: 80,
        //         itemHeight: 14,
        //         itemsSpacing: 0,
        //         itemTextColor: '#999',
        //         itemDirection: 'left-to-right',
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000',
        //                 },
        //             },
        //         ],
        //     },
        // ]}
        />
    </Ratio>
)
