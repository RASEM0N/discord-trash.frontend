import { GET_CHANNEL_MESSAGES, SET_CURRENT_CHANNEL } from './types'

export const setCurrentChannel = (channel) => ({
    type: SET_CURRENT_CHANNEL,
    payload: {
        currentChannel: channel,
    },
})

export const ChannelMessages = (messages) => ({
    type: GET_CHANNEL_MESSAGES,
    payload: {
        messages: messages,
    },
})
