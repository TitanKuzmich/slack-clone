import React, {useEffect, useRef} from 'react'
import {Button} from "@material-ui/core"

import {auth, provider} from "lib/firebase"

import style from './style.module.scss'

const Login = () => {

    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithPopup(provider).catch((e) => alert(e.message))
    }

    return (
        <div className={style.login_wrapper}>
           <div className={style.login_container}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="logo"/>
               <h1>Sign in to the TiSai Chats</h1>
               <p>tisai.slack.com</p>

               <Button
                   type="submit"
                   onClick={signIn}
               >
                   Sign in with Google
               </Button>
           </div>
        </div>
    )
}

export default Login