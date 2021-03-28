import { combineReducers } from 'redux'
import userReducer from './user-reducer'
import channelReducer from './channel-reducer'

export default combineReducers({
    user: userReducer,
    channel: channelReducer,
})
