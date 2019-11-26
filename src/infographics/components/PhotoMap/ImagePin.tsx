import * as React from 'react'

interface IImagePinProps {
    size: number
    src: string
    visible: boolean
    onLoadImage: () => void
    onMouseOver: () => void
    onMouseLeave: () => void
}

export const ImagePin: React.FC<IImagePinProps> = React.memo(props => {
    return (
        <div
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
            style={{
                width: `${props.size}px`,
                height: `${props.size}px`,
                opacity: Number(props.visible),
            }}
        >
            <style jsx>{`
                div {
                    width: 50px;
                    height: 50px;

                    transition: all 100ms ease-in;
                    transform: translate(-50%, -50%);

                    cursor: pointer;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;

                    background-color: white;
                    border: 2px solid white;
                    border-radius: 3px;
                    //border-radius: 0%;
                }
            `}</style>

            <img
                src={props.src}
                onLoad={props.onLoadImage}
            />
        </div>
    )
})
