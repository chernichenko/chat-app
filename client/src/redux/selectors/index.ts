import { RootState } from 'constants/types'

export const getUser = (s: RootState) => s.user
export const getDialogs = (s: RootState) => s.dialogs
export const getDialog = (s: RootState) => s.dialog
