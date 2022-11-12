import { createSlice } from '@reduxjs/toolkit'
const initialState = ""
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        displayNotification(state, action) {
            const notification = action.payload
            return notification
        },
    }
}
)
export const setMessage = (state, seconds) => {
    const message = state
    return async dispatch => {
        dispatch(displayNotification(message))
        setTimeout(() => { dispatch(displayNotification("")) }, seconds * 1000)
    }
}

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer