import { combineReducers } from 'redux'
import userReducer from './reducers/userSlice'
import dialogsReducer from './reducers/dialogsSlice'
import dialogReducer from './reducers/dialogSlice'

const reducers = {
  user: userReducer,
  dialogs: dialogsReducer,
  dialog: dialogReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
