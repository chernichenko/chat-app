import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './rootReducer'

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: true,
})
