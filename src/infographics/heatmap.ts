import { flatMap } from 'lodash'

const MAPBOX_MAX_ZOOM = 22
/**
 * MapboxGL interpolate expression
 * ["interpolate",
 *  interpolation: ["linear"] | ["exponential", base] | ["cubic-bezier", x1, y1, x2, y2 ],
 *  input: number,
 *  stop_input_1: number, stop_output_1: OutputType,
 *  stop_input_n: number, stop_output_n: OutputType, ...
 * ]: OutputType (number, array<number>, or Color)
 *
 */
export class HeatmapBuilder {
    public static new() {
        return new HeatmapBuilder()
    }

    private field: string
    private radius: number
    private minZoom: number
    private maxZoom: number
    private intencity: number[]
    private heatmapColor: Array<{ value: number, color: string }>

    public setField(value: string) {
        this.field = value

        return this
    }

    public setRadius(value: number) {
        this.radius = value

        return this
    }

    public setMinZoom(value: number) {
        this.minZoom = value

        return this
    }

    public setMaxZoom(value: number) {
        this.maxZoom = value

        return this
    }

    public setIntencity(minZoomValue: number, maxZoomValue: number) {
        this.intencity = [minZoomValue, maxZoomValue]

        return this
    }

    public addColor(value: number, color: string) {
        if (!this.heatmapColor) {
            this.heatmapColor = []
        }

        this.heatmapColor.push({
            color,
            value,
        })

        return this
    }

    public build(): any {
        const weight = !this.field ? null : (
            ['interpolate', ['linear'], ['get', this.field],
                0, 0,
                11, 1,
            ]
        )

        const conf: any = {
            type: 'heatmap',
        }

        if (this.minZoom) {
            conf.minzoom = this.minZoom
        }

        if (this.maxZoom) {
            conf.maxzoom = this.maxZoom
        }

        if (weight) {
            conf.paint = {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': ['interpolate', ['linear'], ['get', this.field],
                    0, 0,
                    11, 1,
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                // Transition from heatmap to circle layer by zoom level
                // 'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
            }
        }

        return this.mergeIntencity(this.mergeHeatmapColor(this.mergePaint(conf)))
    }

    private mergeIntencity(conf) {
        const minZoom = this.minZoom ? this.minZoom : 0
        const maxZoom = this.maxZoom ? this.maxZoom : MAPBOX_MAX_ZOOM

        if (this.intencity) {
            return {
                ...conf,
                paint: {
                    ...conf.paint,
                    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'],
                        minZoom, this.intencity[0],
                        maxZoom, this.intencity[1],
                    ],
                },
            }
        }

        return conf
    }

    private mergeHeatmapColor(conf) {
        if (this.heatmapColor) {
            return {
                ...conf,
                paint: {
                    ...conf.paint,
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        ...this.createHeatmapColor(),
                    ],
                },
            }
        }

        return conf
    }

    private createHeatmapColor() {
        return flatMap(this.heatmapColor, x => [x.value, x.color])
    }

    private mergePaint(conf) {
        // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'],
        //     0, 2,
        //     MAX_ZOOM_LEVEL, 20,
        // ],

        if (this.radius) {
            return {
                ...conf,
                paint: {
                    ...conf.paint,
                    'heatmap-radius': this.radius,
                },
            }
        }

        return conf
    }
}
