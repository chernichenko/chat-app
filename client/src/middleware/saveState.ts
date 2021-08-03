import { SAVE_STATE } from 'redux/actions'

export const saveState = ({ getState }: any) => (next: any) => (action: any) => {
    next(action)

    if (action.type !== SAVE_STATE) {
        return
    }

    const serializedState = JSON.stringify(getState())
    localStorage.setItem('state', serializedState)
}
