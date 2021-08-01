import { useMemo, useCallback } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { clearUserInfo } from 'redux/reducers/userSlice'
import { SAVE_STATE } from 'redux/actions'

import styles from './Header.module.scss'

export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((s: any) => s.user)

    const config = useMemo(() => ({ headers: { auth: `Che ${user.token}` } }), [user.token])

    const logoutHandler = useCallback(async (e: any) => {
        try {
            e.preventDefault()
            await axios.post(`/api/auth/logout`, null, config)
            dispatch(clearUserInfo())
            dispatch({ type: SAVE_STATE })
            history.push('/')
        } catch (e) { toast(e.message) }
    }, [config])

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                {!!user.avatarUrl && (
                    <div className={styles.imageWrap}>
                        <img src={user.avatarUrl} />  
                    </div>
                )}
                <p>{user.name}</p>
            </div>
            <div className={styles.nav}>
                <NavLink to="/">Dialogs</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
            </div>
        </div>
    )
}
