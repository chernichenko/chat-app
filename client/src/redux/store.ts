import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import { webSocket, saveState } from 'middleware'
import { loadState } from 'utils/localStorage'

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, saveState, webSocket()],
  devTools: true,
  preloadedState: loadState(),
})
