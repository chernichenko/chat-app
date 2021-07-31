import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 'test',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserId(state, { payload }) {
      state.id = payload
    },
  },
})

export const {
  changeUserId,
} = userSlice.actions

export default userSlice.reducer
