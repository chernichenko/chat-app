import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    dialogId: '',
    userTo: '',
    messages: [],
}

const dialogsSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    changeDialogId(state, { payload }) {
      state.dialogId = payload
    },
    changeMessages(state, { payload }) {
      state.messages = payload
    },
    changeUserTo(state, { payload }) {
      state.userTo = payload
    },
  },
})

export const {
  changeDialogId,
  changeMessages,
  changeUserTo,
} = dialogsSlice.actions

export default dialogsSlice.reducer
