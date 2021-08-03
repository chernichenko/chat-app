import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import { saveState } from 'middleware'
import { loadState } from 'utils/localStorage'

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, saveState],
  devTools: true,
  preloadedState: loadState(),
})
