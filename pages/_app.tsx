import * as  React from 'react'

import App from 'next/app'

import 'antd/dist/antd.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export default class MyApp extends App {
    public render() {
        const { Component, pageProps } = this.props

        return (
            <>
                <style global jsx>{`
                    #__next {
                        height: 100%;
                    }
                `}</style>

                <Component {...pageProps} />
            </>
        )
    }
}
