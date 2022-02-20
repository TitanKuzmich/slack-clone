import React from 'react'
import {useSelector} from "react-redux"
import {Create, FiberManualRecord} from "@material-ui/icons"
import {useCollection} from "react-firebase-hooks/firestore"

import {db} from "lib/firebase"
import SidebarOption from "components/SidebarOption"
import {sidebarOptions, sidebarSecondaryOptions} from "components/Sidebar/helper"

import style from './style.module.scss'

const Sidebar = () => {
    const [channels, loading, error] = useCollection(db.collection('rooms'))
    const {roomId} = useSelector((state) => state.app)

    return (
        <div className={style.sidebar_container}>
            <div className={style.sidebar_header}>
                <div className={style.sidebar_info}>
                    <h2>TiSai Slack</h2>
                    <h3>
                        <FiberManualRecord/>
                        Krivonos Aleksandr
                    </h3>
                </div>
                <Create/>
            </div>

            {sidebarOptions.map((option, ind) => (
                <SidebarOption
                    key={`${option.title}_${ind}`}
                    Icon={option.icon}
                    title={option.title}
                    haveDivider={option.haveDivider}
                />
            ))}

            {sidebarSecondaryOptions.map((option, ind) => (
                <SidebarOption
                    key={`${option.title}_${ind}`}
                    Icon={option.icon}
                    title={option.title}
                    haveDivider={option.haveDivider}
                    addAction={option.addAction}
                />
            ))}

            {channels?.docs.map((doc) => (
                <SidebarOption
                    key={doc.id}
                    id={doc.id}
                    title={doc.data().name}
                    active={roomId}
                />
            ))}
        </div>
    )
}

export default Sidebar