import { combineReducers } from 'redux'
import userReducer from './reducers/userSlice'
import dialogsReducer from './reducers/dialogsSlice'

const reducers = {
  user: userReducer,
  dialogs: dialogsReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
