import { useState } from 'react'

import styles from './Modal.module.css'

export default function Modal(props) {

    const [animation, setAnimation] = useState('open')
    const [display, setDisplay]     = useState(true)

    const hide = async (ms) => {

        setAnimation('close')

        await new Promise(r => setTimeout(r, ms))

        setDisplay(false)

    }

    return(
        <div>
            { display
                ? <div className={animation === "close" ? styles.modal_close : styles.modal_open} onClick = {() => hide(1000)}>
                    <button >{props.children}</button>
                </div>
                : null
            }
        </div>
    )

}
