import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import { webSocket } from 'middleware'

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, webSocket()],
  devTools: true,
})
