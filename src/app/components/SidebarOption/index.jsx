import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import cn from 'classnames'

import CreateModal from "components/CreateModal"

import style from './style.module.scss'
import {enterRoom} from "state/actions/app"

const SidebarOption = ({Icon, title, id, active, addAction, haveDivider}) => {
    const [isOpen, setOpen] = useState(false)

    const dispatch  = useDispatch()

    const selectChannel =  () => {
        if(id){
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    }

    return (
        <>
            {haveDivider && <hr/>}
            {isOpen && <CreateModal setOpen={setOpen}/>}
            <div
                className={cn(style.option_container, {[style.option_container__active]: active && id === active})}
                onClick={
                    addAction
                    ? () => setOpen(true)
                    : selectChannel
                }
            >
                {Icon && <Icon fontSize="small" style={{padding: 10}}/>}
                {Icon ? (
                    <h3>{title}</h3>
                ) : (
                    <h3>
                        <span>#</span> {title}
                    </h3>
                )}
            </div>
        </>
    )
}

export default SidebarOption