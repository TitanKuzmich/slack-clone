import React, {useState} from 'react'
import {Picker} from 'emoji-mart'

import {SentimentSatisfiedOutlined, Send} from "@material-ui/icons"
import {auth, db} from "lib/firebase"
import firebase from "firebase/compat"
import {useAuthState} from "react-firebase-hooks/auth"

import style from './style.module.scss'

const ChatInput = ({channelName, roomId, bottomRef}) => {
    const [user] = useAuthState(auth)

    const [value, setValue] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)

    const onEmojiClick = (e) => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)

        console.log(emoji)
        setValue(value + emoji)
    }

    const sendMessage = () => {
        if (!roomId) return

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
                <div className={style.upload_wrapper}>

                </div>
                <input
                    placeholder={`Message for ${channelName}`}
                    value={value}
                    onKeyDown={onEnterKeyPress}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                />
                <p className={style.emoji_picker} onClick={() => setShowEmoji(!showEmoji)}>
                    <SentimentSatisfiedOutlined />
                </p>
                {showEmoji && (
                    <Picker
                        emoji="point_up"
                        style={{
                            position: "absolute",
                            bottom: "35px",
                            right: "35px",
                        }}
                        onSelect={onEmojiClick}
                    />
                )}
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