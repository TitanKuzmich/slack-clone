import React, {useEffect, useRef} from 'react'
import {useSelector} from "react-redux"
import {useCollection, useDocument} from "react-firebase-hooks/firestore"

import {db} from "lib/firebase"
import ChatInput from "components/ChatInput"
import Message from "components/Message"
import {InfoOutlined, StarBorderOutlined} from "@material-ui/icons"

import style from './style.module.scss'

const Chat = () => {
    const bottomRef = useRef(null)
    const {roomId} = useSelector((state) => state.app)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId
        && db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [roomId, loading])

    return (

        <>
            {roomMessages && roomDetails && (
                <div className={style.chat_wrapper}>
                    <div className={style.chat_header}>
                        <div className={style.chat_header__left}>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlined/>
                        </div>

                        <div className={style.chat_header__right}>
                            <p>
                                <InfoOutlined/> Details
                            </p>
                        </div>
                    </div>
                    <div className={style.chat_container}>
                        <div className={style.chat_messages}>
                            {roomMessages?.docs.map((doc) => (
                                <Message
                                    key={doc.id}
                                    message={doc.data().message}
                                    timestamp={doc.data().timestamp}
                                    user={doc.data().user}
                                    userImage={doc.data().userImage}
                                />
                            ))}

                            <div ref={bottomRef} className={style.chat_bottom}/>
                        </div>


                        <ChatInput
                            bottomRef={bottomRef}
                            channelName={roomDetails?.data().name}
                            roomId={roomId}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Chat