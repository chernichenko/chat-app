import { combineReducers } from 'redux'
import userReducer from './reducers/userSlice'

const reducers = {
  user: userReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
