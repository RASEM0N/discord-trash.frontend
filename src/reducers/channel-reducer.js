import { GET_CHANNEL_MESSAGES, SET_CURRENT_CHANNEL } from '../actions/types'

const initialState = {
    currentChannel: null,
    channels: [],
    message: {
        messages: [],
        messageLoading: false,
    },
}

const channelReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_CURRENT_CHANNEL: {
            return {
                ...state,
                currentChannel: payload.currentChannel,
                message: {
                    messages: [],
                    messageLoading: false,
                },
            }
        }

        case GET_CHANNEL_MESSAGES: {
            return {
                ...state,
                message: {
                    messages: payload.messages,
                    messageLoading: true,
                },
            }
        }

        default: {
            return state
        }
    }
}

export default channelReducer
