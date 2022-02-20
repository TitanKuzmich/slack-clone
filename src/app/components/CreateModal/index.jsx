import React, {useEffect, useRef, useState} from 'react'

import {Close} from "@material-ui/icons"
import {db} from "lib/firebase"

import style from './style.module.scss'

const CreateModal = ({setOpen}) => {
    const [channelName, setChannelName] = useState("")
    const modalRef = useRef(null)

    const addChannel = () => {
        if(channelName) {
            db.collection('rooms').add({
                name: channelName
            })
                .then(() => {
                    setOpen(false)
                })
                .catch(e => console.log(e.message))
        }

    }

    const disableWindowScroll = () => window.scrollTo(
        window.pageYOffset || document.documentElement.scrollTop,
        window.pageXOffset || document.documentElement.scrollLeft
    )

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef?.current && !modalRef?.current.contains(event.target)) setOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [modalRef])

    useEffect(() => {
        window.addEventListener('scroll', disableWindowScroll)
        return () => window.removeEventListener("scroll", disableWindowScroll)
    }, [])

    return (
        <div className={style.modal_cover}>
            <div className={style.modal_wrapper} ref={modalRef}>
                <div className={style.modal_header}>
                    <span>Add new channel</span>
                    <div onClick={() => setOpen(false)}>
                        <Close />
                    </div>
                </div>
                <div className={style.modal_content}>
                    <div className={style.modal_input}>
                        <input
                            value={channelName}
                            placeholder="Enter channel name"
                            onChange={(e) => setChannelName(e.target.value)}
                            type="text"
                        />
                    </div>
                </div>

                <div className={style.modal_footer}>
                    <div
                        className={style.modal_submit}
                        onClick={addChannel}
                    >
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal