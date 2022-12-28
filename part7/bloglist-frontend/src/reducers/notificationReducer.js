import { createSlice } from '@reduxjs/toolkit';
const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      return (state = action.payload);
    },
    removeNotification() {
      return '';
    }
  }
});
export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));

    setTimeout(() => dispatch(removeNotification()), 5000);
  };
};
export default notificationSlice.reducer;
