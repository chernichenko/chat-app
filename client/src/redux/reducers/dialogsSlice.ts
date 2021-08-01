import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    dialogs: '',
}

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    changeDialogs(state, { payload }) {
      state.dialogs = payload
    },
  },
})

export const {
  changeDialogs,
} = dialogsSlice.actions

export default dialogsSlice.reducer
