import * as  React from 'react'

import App, { Container } from 'next/app'

import 'antd/dist/antd.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export default class MyApp extends App {
    public render() {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <style global jsx>{`
                    #__next {
                        height: 100%;
                    }
                `}</style>

                <Component {...pageProps} />
            </Container >
        )
    }
}
