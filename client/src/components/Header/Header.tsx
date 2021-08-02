import { useMemo, useCallback } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { clearUserInfo } from 'redux/reducers/userSlice'
import { SAVE_STATE } from 'redux/actions'
import { getUser } from 'redux/selectors'

import styles from './Header.module.scss'

export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { token, name, avatarUrl } = useSelector(getUser)

    const config = useMemo(() => ({ headers: { auth: `Che ${token}` } }), [token])

    const logoutHandler = useCallback(async (e: any) => {
        try {
            e.preventDefault()
            await axios.post(`/api/auth/logout`, null, config)
            dispatch(clearUserInfo())
            dispatch({ type: SAVE_STATE })
            history.push('/')
        } catch (e) { toast.error(e.message) }
    }, [config])

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                {!!avatarUrl && (
                    <div className={styles.imageWrap}>
                        <img src={avatarUrl} />  
                    </div>
                )}
                <p>{name}</p>
            </div>
            <div className={styles.nav}>
                <NavLink to="/">Dialogs</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
            </div>
        </div>
    )
}