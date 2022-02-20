import React from 'react'
import {Route, Routes} from "react-router-dom"

import Chat from "pages/Chat"
import Header from "components/Header"
import Sidebar from "components/Sidebar"

import style from './style.module.scss'

const InitialRouting = () => {
    return (
        <>
            <Header/>
            <div className={style.app_body}>
                <Sidebar/>
                <Routes>
                    <Route
                        path="/"
                        element={<Chat/>}
                    />
                </Routes>
            </div>
        </>
    )
}

export default InitialRouting