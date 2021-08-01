import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    id: '',
    name: '',
    avatarUrl: '',
    token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser(state: any, { payload }) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    clearUserInfo() {
      return initialState
    }
  },
})

export const {
  changeUser,
  clearUserInfo,
} = userSlice.actions

export default userSlice.reducer
