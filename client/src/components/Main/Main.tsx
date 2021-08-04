import { useMemo } from 'react'
import { Route, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Sidebar, Dialog } from 'components'

import styles from './Main.module.scss'

export const Main = () => {
    const location = useLocation()
    const isDialogView = useMemo(() => !!location.pathname.includes('dialog'), [location.pathname])
    
    return (
        <div className={styles.wrap} data-testid="main">
            <div className={cn(styles.col, styles.col1)}>
                <Sidebar />
            </div>
            <div className={cn(styles.col, styles.col2, !isDialogView && styles.free)}>
                {isDialogView
                    ? <Route component={Dialog} path="/dialog/:userToId" />
                    : <p>Please click on some user if you want to start conversation</p>
                }
            </div>
        </div>
    )
}
