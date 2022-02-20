import { createReducer } from "redux-act"

import * as actions from "../actions/app"

const defaultState = {
    notifications: [],
    roomId: null
}

const app = createReducer(
    {
        [actions.newNotificationRequest.getType()](state, payload) {
            return {
                ...state,
                notifications: [...state.notifications, payload]
            }
        },
        [actions.removeNotificationRequest.getType()](state, payload) {
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.uuid !== payload.uuid)
            }
        },
        [actions.enterRoom.getType()](state, payload) {
            return {
                ...state,
                roomId: payload.roomId
            }
        }
    },
    defaultState
)

export default app