import React from 'react'
import { useSpring, animated } from 'react-spring';

/*
    HOC SlideDown
    Các component được truyền vào SlideDown sẽ nhận animation là propSpring
    Ứng với từng component khác nhau thì sẽ có nội dung khác nhau
*/

export default function SlideDown(Component) {

    const propSpring = useSpring({
        to: {
            marginTop: '0'
        },
        from: {
            marginTop: '-100px'
        },
        config: {
            duration: 1000
        }
    })

    return (
        <div>
            <animated.div style={propSpring}>
                <Component />
            </animated.div>
        </div>
    )
}
