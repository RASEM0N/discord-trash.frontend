import { SET_USER, CLEAR_USER } from '../actions/types'

const initialState = {
    currentUser: null,
    isLoading: true,
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_USER: {
            return {
                ...state,
                currentUser: payload,
                isLoading: false,
            }
        }

        case CLEAR_USER: {
            return {
                ...state,
                currentUser: null,
                isLoading: false,
            }
        }

        default: {
            return state
        }
    }
}

export default userReducer
