import { SET_CURRENT_CHANNEL } from '../actions/types'

const initialState = {
    currentChannel: null,
    channels: [],
}

const channelReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_CURRENT_CHANNEL: {
            return {
                ...state,
                currentChannel: payload.currentChannel,
            }
        }

        default: {
            return state
        }
    }
}

export default channelReducer
