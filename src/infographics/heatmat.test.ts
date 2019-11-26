import { HeatmapBuilder } from './heatmap'

describe('HeatmapBuilder', () => {
    it('should has properly defaults', () => {
        const sample = HeatmapBuilder
            .new()
            .build()

        expect(sample).toEqual({
            type: 'heatmap',
        })
    })

    it('should properly configure with setField', () => {
        const sample = HeatmapBuilder
            .new()
            .setField('Количество')
            .build()

        expect(sample.paint['heatmap-weight'][2][1]).toEqual('Количество')
    })

    it('should properly configure with setRadius', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setRadius(value)
            .build()

        expect(sample.paint['heatmap-radius']).toEqual(value)
    })

    it('should properly configure with setMinZoom', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setMinZoom(value)
            .build()

        expect(sample.minzoom).toEqual(value)
    })

    it('should properly configure with setMaxZoom', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setMaxZoom(value)
            .build()

        expect(sample.maxzoom).toEqual(value)
    })

    it('should properly configure with setIntencity', () => {
        const value1 = Math.random()
        const value2 = Math.random()

        const sample = HeatmapBuilder
            .new()
            .setIntencity(value1, value2)
            .build()

        expect(sample.paint['heatmap-intensity']).toEqual(['interpolate', ['linear'], ['zoom'],
            0, value1,
            22, value2,
        ])
    })

    it('should properly configure with addColor', () => {
        const sample = HeatmapBuilder
            .new()
            .addColor(0, 'rgba(33,102,172,0)')
            .addColor(0.2, 'rgb(103,169,207)')
            .addColor(0.4, 'rgb(209,229,240)')
            .addColor(0.6, 'rgb(253,219,199)')
            .addColor(0.8, 'rgb(239,138,98)')
            .addColor(0.9, 'rgb(255,201,101)')
            .build()

        expect(sample.paint['heatmap-color']).toEqual([
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            0.9,
            'rgb(255,201,101)',
        ])
    })
})
