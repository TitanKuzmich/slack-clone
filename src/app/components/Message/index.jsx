import React from 'react'

import style from './style.module.scss'

const Message = ({message, timestamp, user, userImage}) => {
    return (
        <div className={style.message_container}>
            <img src={userImage} alt="ava"/>
            <div className={style.message_info}>
                <h4>
                    {user}{' '}
                    <span>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message