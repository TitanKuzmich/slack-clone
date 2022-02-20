import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {Send} from "@material-ui/icons"
import {auth, db} from "lib/firebase"
import firebase from "firebase/compat"
import {useAuthState} from "react-firebase-hooks/auth"

import style from './style.module.scss'

const ChatInput = ({channelName, roomId, bottomRef}) => {
    const [user] = useAuthState(auth)
    const [value, setValue] = useState("")

    const dispatch = useDispatch()

    const sendMessage = () => {
        if(!roomId) return

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user?.displayName,
                userImage: user?.photoURL
                    || "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
            })
            .then(() => {
                bottomRef?.current?.scrollIntoView({behavior: "smooth"})
            })
        setValue("")
    }

    const onEnterKeyPress = (event) => {
        const charCode = event.keyCode

        if (charCode === 13) {
            sendMessage()
        }
    }

    return (
        <div className={style.chat_input}>
            <div className={style.chat_input_wrapper}>
                <input
                    placeholder={`Message for ${channelName}`}
                    value={value}
                    onKeyDown={onEnterKeyPress}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                />
                <div
                    className={style.chat_input_send}
                    onClick={sendMessage}
                >
                    <Send/>
                </div>
            </div>
        </div>
    )
}

export default ChatInput