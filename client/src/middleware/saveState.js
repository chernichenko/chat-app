import { SAVE_STATE } from 'redux/actions'

export const saveState = ({ getState }) => next => action => {
    next(action)

    if (action.type !== SAVE_STATE) {
        return
    }

    const serializedState = JSON.stringify(getState())
    localStorage.setItem('state', serializedState)
}
