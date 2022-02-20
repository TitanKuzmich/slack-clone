import React from 'react'
import { Avatar } from '@material-ui/core'
import {AccessTime, HelpOutline, Search} from '@material-ui/icons'
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "lib/firebase"

import style from './style.module.scss'

const Header = () => {
    const [user] = useAuthState(auth)

    return (
        <div className={style.header_container}>
            <div className={style.header_left}>
                <div className={style.header_avatar}>
                    <Avatar
                        src={user?.photoURL}
                        alt={user?.displayName}
                    />
                </div>
                <AccessTime />
            </div>

            <div className={style.header_center}>
                <Search />
                <input
                    type="text"
                    placeholder="Search in chats"
                />
            </div>

            <div className={style.header_right}>
                <HelpOutline />
            </div>
        </div>
    )
}

export default Header