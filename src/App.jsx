import React from "react"
import {useAuthState} from "react-firebase-hooks/auth"
import {BallTriangle} from "react-loader-spinner"

import {auth} from "lib/firebase"
import InitialRouting from "components/InitialRouting"
import Login from "pages/Login"

const App = () => {
    const [user, loading] = useAuthState(auth)

    if(loading) {
        return (
            <div className="app_loading">
                <div className="app_loading_contents">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="logo"/>
                    <BallTriangle
                        color="purple" height={80} width={80}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            {!user ? <Login /> : <InitialRouting />}
        </div>
    )
}

export default App
