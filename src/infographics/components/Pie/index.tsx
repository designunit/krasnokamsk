import * as React from 'react'
import Ratio from 'react-ratio'

import { ResponsivePie } from '@nivo/pie'

const NivoPie = ResponsivePie as any

interface IDataItem {
    id: string,
    label: string,
    value: number,
}

export interface IPieProps {
    style?: React.CSSProperties
    data: IDataItem[]
    color: (item: IDataItem) => string
    theme?: object
}

export const Pie: React.FC<IPieProps> = props => (
    <Ratio
        style={props.style}
        ratio={1}
    >
        <NivoPie
            data={props.data}
            margin={{
                top: 80,
                right: 80,
                bottom: 80,
                left: 80,
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={props.color}
            theme={props.theme}
            // colors={{ scheme: 'nivo' }}
            // borderWidth={1}
            // borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={5}
            radialLabelsTextXOffset={6}
            // radialLabelsTextColor='#333333'
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={8}
            radialLabelsLinkHorizontalLength={12}
            // radialLabelsLinkStrokeWidth={1}
            // radialLabelsLinkColor={{ from: 'color' }}
            // slicesLabelsSkipAngle={10}
            // slicesLabelsTextColor='#333333'
            // animate={true}
            // motionStiffness={90}
            // motionDamping={15}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                //     {
                //         id: 'lines',
                //         type: 'patternLines',
                //         background: 'inherit',
                //         color: 'rgba(255, 255, 255, 0.3)',
                //         rotation: -45,
                //         lineWidth: 6,
                //         spacing: 10,
                //     },
            ]}
            fill={[
                // {
                //     match: {
                //         id: 'Идут',
                //     },
                //     id: 'dots',
                // },
                // {
                //     match: {
                //         id: 'c',
                //     },
                //     id: 'dots',
                // },
                // {
                //     match: {
                //         id: 'go',
                //     },
                //     id: 'dots',
                // },
                // {
                //     match: {
                //         id: 'python',
                //     },
                //     id: 'dots',
                // },
                // {
                //     match: {
                //         id: 'scala',
                //     },
                //     id: 'lines',
                // },
                // {
                //     match: {
                //         id: 'lisp',
                //     },
                //     id: 'lines',
                // },
                // {
                //     match: {
                //         id: 'elixir',
                //     },
                //     id: 'lines',
                // },
                // {
                //     match: {
                //         id: 'javascript',
                //     },
                //     id: 'lines',
                // },
            ]}
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         translateY: 56,
        //         itemWidth: 100,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         symbolSize: 18,
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
