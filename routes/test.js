const puppeteer = require('puppeteer')
const fs = require('fs')

function point(lat, lng, properties) {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lng, lat],
        },
        properties,
    }
}

function lineString(coordinates, properties) {
    return {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates,
        },
        properties,
    }
}

function collection(features) {
    return {
        type: 'FeatureCollection',
        features,
    }
}

function platformsToGeojson(platforms) {
    return collection(platforms.map(
        x => point(
            parseFloat(x['lat']),
            parseFloat(x['lon']),
            x
        )
    ))
}

function reverseCoords(line) {
    return line.map(x => x.reverse())
}

function geometryToGeojson(geometry) {
    return collection(geometry.map(
        line => lineString(reverseCoords(line), {})
    ))
}

async function fetchRoute(url, filePrefix) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const result = await page.evaluate(() => {
        return {
            geometry: window.geometry,
            platforms: window.platforms,
        }
    });

    const ps = platformsToGeojson(result.platforms)
    const ls = geometryToGeojson(result.geometry)

    fs.writeFileSync(`${filePrefix}_platform.geojson`, JSON.stringify(ps, null, 4))
    fs.writeFileSync(`${filePrefix}_geometry.geojson`, JSON.stringify(ls, null, 4))

    await browser.close()
}

async function main() {
    const routes = [
        ['https://кондуктор24.рф/краснокамск/автобус/4-41', 'краснокамск-автобус-4-41'],
        ['https://кондуктор24.рф/краснокамск/автобус/10-39', 'краснокамск-автобус-10-39'],
        ['https://кондуктор24.рф/краснокамск/автобус/14-23', 'краснокамск-автобус-14-23'],
        ['https://кондуктор24.рф/краснокамск/автобус/18-20', 'краснокамск-автобус-18-20'],
        ['https://кондуктор24.рф/краснокамск/автобус/107-пригородный-1', 'краснокамск-автобус-107-пригородный-1'],
        ['https://кондуктор24.рф/краснокамск/автобус/203-пригородный', 'краснокамск-автобус-203-пригородный'],
        ['https://кондуктор24.рф/краснокамск/автобус/522-пригородный', 'краснокамск-автобус-522-пригородный'],
        ['https://кондуктор24.рф/краснокамск/автобус/6-41', 'краснокамск-автобус-6-41'],
        ['https://кондуктор24.рф/краснокамск/автобус/11-24', 'краснокамск-автобус-11-24'],
        ['https://кондуктор24.рф/краснокамск/автобус/15-24', 'краснокамск-автобус-15-24'],
        ['https://кондуктор24.рф/краснокамск/автобус/20-21', 'краснокамск-автобус-20-21'],
        ['https://кондуктор24.рф/краснокамск/автобус/146-2', 'краснокамск-автобус-146-2'],
        ['https://кондуктор24.рф/краснокамск/автобус/205-2', 'краснокамск-автобус-205-2'],
        ['https://кондуктор24.рф/краснокамск/автобус/529-пригородный', 'краснокамск-автобус-529-пригородный'],
        ['https://кондуктор24.рф/краснокамск/автобус/7-40', 'краснокамск-автобус-7-40'],
        ['https://кондуктор24.рф/краснокамск/автобус/12-23', 'краснокамск-автобус-12-23'],
        ['https://кондуктор24.рф/краснокамск/автобус/16-20', 'краснокамск-автобус-16-20'],
        ['https://кондуктор24.рф/краснокамск/автобус/100-3', 'краснокамск-автобус-100-3'],
        ['https://кондуктор24.рф/краснокамск/автобус/196-пригородный', 'краснокамск-автобус-196-пригородный'],
        ['https://кондуктор24.рф/краснокамск/автобус/207-пригородный', 'краснокамск-автобус-207-пригородный'],
        ['https://кондуктор24.рф/краснокамск/электропоезд/пермь-2-балезино', 'краснокамск-электропоезд-пермь-2-балезино'],
        ['https://кондуктор24.рф/краснокамск/электропоезд/пермь-2-менделеево', 'краснокамск-электропоезд-пермь-2-менделеево'],
        ['https://кондуктор24.рф/краснокамск/электропоезд/пермь-2-верещагино', 'краснокамск-электропоезд-пермь-2-верещагино'],
        ['https://кондуктор24.рф/краснокамск/электропоезд/пермь-2-григорьевская', 'краснокамск-электропоезд-пермь-2-григорьевская'],
        ['https://кондуктор24.рф/краснокамск/маршрутное-такси/160-3', 'краснокамск-маршрутное-такси-160-3'],
        ['https://кондуктор24.рф/краснокамск/маршрутное-такси/539', 'краснокамск-маршрутное-такси-539'],
    ]

    for (const [url, prefix] of routes) {
        console.log('fetch', url)
        await fetchRoute(url, prefix)
        // fetchRoute('https://кондуктор24.рф/краснокамск/автобус/4-41', '4')
    }
}

main()
